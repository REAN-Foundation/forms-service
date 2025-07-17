import {
    CalculationRuleCreateModel,
    CalculationRuleResponseDto,
    CalculationRuleSearchFilters,
    CalculationRuleUpdateModel,
} from '../../../../../domain.types/forms/calculation.rule.domain.types';
import { ICalculationRuleRepo } from '../../../../repository.interfaces/field.rules/calculation.rule/calculation.rule.repo.interface';
import { CalculationRuleEntity } from '../../models/rule/calculation.rule.model';
import { CalculationRuleMapper } from '../../mappers/calculation.rule.mapper';
import { Source } from '../../database.connector.typeorm';
import { ErrorHandler } from '../../../../../common/res.handlers/error.handler';
import { Logger } from '../../../../../common/logger';
import { FindManyOptions, Repository } from 'typeorm';
import { BaseRepo } from '../base.repo';

export class CalculationRuleRepo
    extends BaseRepo
    implements ICalculationRuleRepo
{
    _calculationRuleRepo: Repository<CalculationRuleEntity> =
        Source.getRepository(CalculationRuleEntity);

    create = async (
        model: CalculationRuleCreateModel
    ): Promise<CalculationRuleResponseDto> => {
        try {
            const data = await this._calculationRuleRepo.create({
                Name: model.Name,
                Description: model.Description,
                Priority: model.Priority,
                IsActive: model.IsActive,
                ConditionForOperationId: model.ConditionForOperationId,
                OperationId: model.OperationId,
                LogicId: model.LogicId,
            });
            const record = await this._calculationRuleRepo.save(data);
            return CalculationRuleMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<CalculationRuleResponseDto> => {
        try {
            var record = await this._calculationRuleRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return CalculationRuleMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    update = async (
        id: string,
        model: CalculationRuleUpdateModel
    ): Promise<CalculationRuleResponseDto> => {
        try {
            const updateData = await this._calculationRuleRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError(
                    'Calculation Rule Data not found!'
                );
            }
            if (model.Name) {
                updateData.Name = model.Name;
            }
            if (model.Description) {
                updateData.Description = model.Description;
            }
            if (model.ConditionForOperationId) {
                updateData.ConditionForOperationId =
                    model.ConditionForOperationId;
            }
            if (model.OperationId) {
                updateData.OperationId = model.OperationId;
            }
            if (model.LogicId) {
                updateData.LogicId = model.LogicId;
            }
            var record = await this._calculationRuleRepo.save(updateData);
            return CalculationRuleMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._calculationRuleRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._calculationRuleRepo.save(record);
            return true; // Soft delete successful
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    search = async (filters: CalculationRuleSearchFilters): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] =
                await this._calculationRuleRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: CalculationRuleMapper.toArrayDto(list),
            };
            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwDbAccessError(
                'DB Error: Unable to search records!',
                error
            );
        }
    };

    private getSearchModel = (filters: CalculationRuleSearchFilters) => {
        var search: FindManyOptions<CalculationRuleEntity> = {
            relations: {},
            where: {},
        };

        if (filters.id) {
            search.where['id'] = filters.id;
        }

        if (filters.name) {
            search.where['Name'] = filters.name;
        }

        if (filters.description) {
            search.where['Description'] = filters.description;
        }

        if (filters.priority) {
            search.where['Priority'] = filters.priority;
        }

        if (filters.isActive !== undefined) {
            search.where['IsActive'] = filters.isActive;
        }

        if (filters.operationId) {
            search.where['OperationId'] = filters.operationId;
        }

        if (filters.logicId) {
            search.where['LogicId'] = filters.logicId;
        }

        return search;
    };
}
