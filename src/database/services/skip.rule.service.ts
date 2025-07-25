import {
    SkipRuleResponseDto,
    SkipRuleCreateModel,
    SkipRuleUpdateModel,
    SkipRuleSearchFilters,
    SkipRuleSearchResults,
} from '../../domain.types/rules/skip.rule.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { SkipRule } from '../models/rule/skip.rule.model';
import { SkipRuleMapper } from '../mappers/skip.rule.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class SkipRuleService extends BaseService {

    _skipRuleRepository: Repository<SkipRule> = Source.getRepository(SkipRule);

    // Skip Rule operations
    public create = async (createModel: SkipRuleCreateModel)
        : Promise<SkipRuleResponseDto> => {

        const rule = this._skipRuleRepository.create({
            Name: createModel.Name,
            Description: createModel.Description,
            OperationType: createModel.OperationType,
            BaseOperationId: createModel.OperationId,
            SkipWhenTrue: createModel.SkipWhenTrue,
            LogicId: createModel.LogicId,
        });
        const record = await this._skipRuleRepository.save(rule);

        return SkipRuleMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<SkipRuleResponseDto> => {
        try {
            const rule = await this._skipRuleRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    // Logic: true,
                }
            });

            return SkipRuleMapper.toDto(rule);
        } catch (error) {
            logger.error(`❌ Error getting skip rule by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: SkipRuleSearchFilters)
        : Promise<SkipRuleSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._skipRuleRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => SkipRuleMapper.toDto(x)) as any    ,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching skip rules: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: SkipRuleUpdateModel)
        : Promise<SkipRuleResponseDto> => {
        try {
            const rule = await this._skipRuleRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!rule) {
                ErrorHandler.throwNotFoundError('Skip rule not found!');
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
            if (model.SkipWhenTrue != null) {
                rule.SkipWhenTrue = model.SkipWhenTrue;
            }
            if (model.LogicId != null) {
                rule.LogicId = model.LogicId;
            }
            var record = await this._skipRuleRepository.save(rule);
            return SkipRuleMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating skip rule: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._skipRuleRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._skipRuleRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting skip rule: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: SkipRuleSearchFilters) => {

        var search: FindManyOptions<SkipRule> = {
            relations: {
                // Logic: true,
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
        if (filters.OperationId) {
            search.where['BaseOperationId'] = filters.OperationId;
        }
        if (filters.LogicId) {
            search.where['LogicId'] = filters.LogicId;
        }
        if (filters.SkipWhenTrue != null) {
            search.where['SkipWhenTrue'] = filters.SkipWhenTrue;
        }

        return search;
    };
}
