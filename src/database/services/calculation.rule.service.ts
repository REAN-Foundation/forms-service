import {
    CalculationRuleResponseDto,
    CalculationRuleCreateModel,
    CalculationRuleUpdateModel,
    CalculationRuleSearchFilters,
    CalculationRuleSearchResults,
} from '../../domain.types/rules/calculation.rule.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { CalculationRule } from '../models/rule/calculation.rule.model';
import { CalculationRuleMapper } from '../mappers/calculation.rule.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CalculationRuleService extends BaseService {

    _calculationRuleRepository: Repository<CalculationRule> = Source.getRepository(CalculationRule);

    // Calculation Rule operations
    public create = async (createModel: CalculationRuleCreateModel)
        : Promise<CalculationRuleResponseDto> => {

        const rule = this._calculationRuleRepository.create({
            Name: createModel.Name,
            Description: createModel.Description,
            OperationType: createModel.OperationType,
            OperationId: createModel.OperationId,
            BaseOperationId: createModel.BaseOperationId,
            LogicId: createModel.LogicId,
            Settings: createModel.Settings ? JSON.stringify(createModel.Settings) : null,
            RuleOutcome: createModel.RuleOutcome ? JSON.stringify(createModel.RuleOutcome) : null,
        });
        const record = await this._calculationRuleRepository.save(rule);

        return CalculationRuleMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<CalculationRuleResponseDto> => {
        try {
            const rule = await this._calculationRuleRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    Logic: true,
                }
            });

            return CalculationRuleMapper.toDto(rule);
        } catch (error) {
            logger.error(`❌ Error getting calculation rule by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: CalculationRuleSearchFilters)
        : Promise<CalculationRuleSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._calculationRuleRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => CalculationRuleMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching calculation rules: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: CalculationRuleUpdateModel)
        : Promise<CalculationRuleResponseDto> => {
        try {
            const rule = await this._calculationRuleRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    Logic: true,
                }
            });
            if (!rule) {
                ErrorHandler.throwNotFoundError('Calculation rule not found!');
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
            if (model.BaseOperationId != null) {
                rule.BaseOperationId = model.BaseOperationId;
            }
            if (model.OperationId != null) {
                rule.OperationId = model.OperationId;
            }
            if (model.LogicId != null) {
                rule.LogicId = model.LogicId;
            }
            if (model.Settings != null) {
                rule.Settings = model.Settings ? JSON.stringify(model.Settings) : null;
            }
            if (model.RuleOutcome != null) {
                rule.RuleOutcome = model.RuleOutcome ? JSON.stringify(model.RuleOutcome) : null;
            }
            var record = await this._calculationRuleRepository.save(rule);
            return CalculationRuleMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating calculation rule: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._calculationRuleRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    Logic: true,
                }
            });
            var result = await this._calculationRuleRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting calculation rule: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: CalculationRuleSearchFilters) => {

        var search: FindManyOptions<CalculationRule> = {
            relations: {
                Logic: true,
            },
            where: {
            }
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
        if (filters.BaseOperationId) {
            search.where['BaseOperationId'] = filters.BaseOperationId;
        }
        if (filters.OperationId) {
            search.where['OperationId'] = filters.OperationId;
        }
        if (filters.LogicId) {
            search.where['LogicId'] = filters.LogicId;
        }
        if (filters.Settings) {
            search.where['Settings'] = JSON.stringify(filters.Settings);
        }
        if (filters.RuleOutcome) {
            search.where['RuleOutcome'] = JSON.stringify(filters.RuleOutcome);
        }

        return search;
    };
}
