import {
    ValidationRuleResponseDto,
    ValidationRuleCreateModel,
    ValidationRuleUpdateModel,
    ValidationRuleSearchFilters,
    ValidationRuleSearchResults,
} from '../../domain.types/rules/validation.rule.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { ValidationRule } from '../models/rule/validation.rule.model';
import { ValidationRuleMapper } from '../mappers/validation.rule.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ValidationRuleService extends BaseService {

    _validationRuleRepository: Repository<ValidationRule> = Source.getRepository(ValidationRule);

    // Validation Rule operations
    public create = async (createModel: ValidationRuleCreateModel)
        : Promise<ValidationRuleResponseDto> => {

        const rule = this._validationRuleRepository.create({
            Name: createModel.Name,
            Description: createModel.Description,
            OperationType: createModel.OperationType,
            BaseOperationId: createModel.OperationId,
            ErrorWhenFalse: createModel.ErrorWhenFalse,
            ErrorMessage: createModel.ErrorMessage,
            LogicId: createModel.LogicId,
        });
        const record = await this._validationRuleRepository.save(rule);

        return ValidationRuleMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<ValidationRuleResponseDto> => {
        try {
            const rule = await this._validationRuleRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    Logic: true,
                    // Operation: true,
                }
            });

            return ValidationRuleMapper.toDto(rule);
        } catch (error) {
            logger.error(`❌ Error getting validation rule by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: ValidationRuleSearchFilters)
        : Promise<ValidationRuleSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._validationRuleRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => ValidationRuleMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching validation rules: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: ValidationRuleUpdateModel)
        : Promise<ValidationRuleResponseDto> => {
        try {
            const rule = await this._validationRuleRepository.findOne({
                where: {
                    id: id
                },
                relations:{
                    Logic:true
                }
            });
            if (!rule) {
                ErrorHandler.throwNotFoundError('Validation rule not found!');
            }
            if (model.Name != null) {
                rule.Name = model.Name;
            }
            if (model.Description != null) {
                rule.Description = model.Description;
            }
            if (model.OperationType != null) {
                rule.OperationType = model.OperationType;
            }
            if (model.OperationId != null) {
                rule.BaseOperationId = model.OperationId;
            }
            if (model.ErrorWhenFalse != null) {
                rule.ErrorWhenFalse = model.ErrorWhenFalse;
            }
            if (model.ErrorMessage != null) {
                rule.ErrorMessage = model.ErrorMessage;
            }
            if (model.LogicId != null) {
                rule.LogicId = model.LogicId;
            }
            var record = await this._validationRuleRepository.save(rule);
            return ValidationRuleMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating validation rule: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._validationRuleRepository.findOne({
                where: {
                    id: id
                },
                relations:{
                    Logic:true
                }
            });
            var result = await this._validationRuleRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting validation rule: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: ValidationRuleSearchFilters) => {

        var search: FindManyOptions<ValidationRule> = {
            where: {
            },
            relations: {
                Logic: true,
            },
        };

        if (filters.Name) {
            search.where['Name'] = filters.Name;
        }
        if (filters.Description) {
            search.where['Description'] = filters.Description;
        }
        if (filters.OperationType) {
            search.where['OperationType'] = filters.OperationType;
        }
        if (filters.OperationId) {
            search.where['BaseOperationId'] = filters.OperationId;
        }
        if (filters.LogicId) {
            search.where['LogicId'] = filters.LogicId;
        }
        if (filters.ErrorWhenFalse != null) {
            search.where['ErrorWhenFalse'] = filters.ErrorWhenFalse;
        }
        if (filters.ErrorMessage != null) {
            search.where['ErrorMessage'] = filters.ErrorMessage;
        }

        return search;
    };
}
