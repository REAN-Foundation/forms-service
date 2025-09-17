import {
    FallbackRuleResponseDto,
    FallbackRuleCreateModel,
    FallbackRuleUpdateModel,
    FallbackRuleSearchFilters,
    FallbackRuleSearchResults,
} from '../../domain.types/rules/fallback.rule.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { FallbackRule } from '../models/rule/fallback.rule.model';
import { FallbackRuleMapper } from '../mappers/fallback.rule.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FallbackRuleService extends BaseService {

    _fallbackRuleRepository: Repository<FallbackRule> = Source.getRepository(FallbackRule);

    // Fallback Rule operations
    public create = async (createModel: FallbackRuleCreateModel)
        : Promise<FallbackRuleResponseDto> => {

        const rule = this._fallbackRuleRepository.create({
            Name: createModel.Name,
            Description: createModel.Description,
            OperationType: createModel.OperationType,
            Priority: createModel.Priority,
            IsActive: createModel.IsActive,
            // OperationId: createModel.OperationId,
            Action: createModel.Action,
            ActionMessage: createModel.ActionMessage,
            ActionParameters: createModel.ActionParameters ? JSON.stringify(createModel.ActionParameters) : null,
        });
        const record = await this._fallbackRuleRepository.save(rule);

        return FallbackRuleMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<FallbackRuleResponseDto> => {
        try {
            const rule = await this._fallbackRuleRepository.findOne({
                where: {
                    id: id
                },
            });

            return FallbackRuleMapper.toDto(rule);
        } catch (error) {
            logger.error(`❌ Error getting fallback rule by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: FallbackRuleSearchFilters)
        : Promise<FallbackRuleSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._fallbackRuleRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => FallbackRuleMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching fallback rules: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: FallbackRuleUpdateModel)
        : Promise<FallbackRuleResponseDto> => {
        try {
            const rule = await this._fallbackRuleRepository.findOne({
                where: {
                    id: id
                },
            });
            if (!rule) {
                ErrorHandler.throwNotFoundError('Fallback rule not found!');
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
            if (model.Priority != null) {
                rule.Priority = model.Priority;
            }
            if (model.IsActive != null) {
                rule.IsActive = model.IsActive;
            }
            // if (model.OperationId != null) {
            //     rule.OperationId = model.OperationId;
            // }
            if (model.Action != null) {
                rule.Action = model.Action;
            }
            if (model.ActionMessage != null) {
                rule.ActionMessage = model.ActionMessage;
            }
            if (model.ActionParameters != null) {
                rule.ActionParameters = model.ActionParameters ? JSON.stringify(model.ActionParameters) : null;
            }
            var record = await this._fallbackRuleRepository.save(rule);
            return FallbackRuleMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating fallback rule: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._fallbackRuleRepository.findOne({
                where: {
                    id: id
                },
            });
            var result = await this._fallbackRuleRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting fallback rule: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: FallbackRuleSearchFilters) => {

        var search: FindManyOptions<FallbackRule> = {
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
        if (filters.Priority) {
            search.where['Priority'] = filters.Priority;
        }
        if (filters.IsActive) {
            search.where['IsActive'] = filters.IsActive;
        }
        // if (filters.OperationId) {
        //     search.where['OperationId'] = filters.OperationId;
        // }
        if (filters.Action) {
            search.where['Action'] = filters.Action;
        }

        return search;
    };
}
