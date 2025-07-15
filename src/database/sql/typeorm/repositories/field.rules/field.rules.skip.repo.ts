import { SkipRuleCreateModel, SkipRuleResponseDto, SkipRuleSearchFilters, SkipRuleUpdateModel } from "../../../../../domain.types/forms/skip.rule.domain.types";
import { ISkipRuleRepo } from "../../../../repository.interfaces/field.rules/skip.rule/skip.rule.repo.interface";
import { SkipRuleEntity } from "../../models/rule/skip.rule.model";
import { SkipRuleMapper } from "../../mappers/skip.rule.mapper";
import { Source } from "../../database.connector.typeorm";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { Logger } from "../../../../../common/logger";
import { FindManyOptions, Repository } from "typeorm";
import { BaseRepo } from "../base.repo";

export class SkipRuleRepo extends BaseRepo implements ISkipRuleRepo {

    _skipRuleRepo: Repository<SkipRuleEntity> = Source.getRepository(SkipRuleEntity);

    create = async (model: SkipRuleCreateModel): Promise<SkipRuleResponseDto> => {
        try {
            const data = await this._skipRuleRepo.create({
                Name: model.Name,
                Description: model.Description,
                Priority: model.Priority,
                IsActive: model.IsActive,
                OperationId: model.OperationId,
                SkipWhenTrue: model.SkipWhenTrue,
                LogicId: model.LogicId
            });
            const record = await this._skipRuleRepo.save(data);
            return SkipRuleMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<SkipRuleResponseDto> => {
        try {
            var record = await this._skipRuleRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null
                },
                // relations: ['Operation', 'Logic']
            });
            return SkipRuleMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    update = async (id: string, model: SkipRuleUpdateModel): Promise<SkipRuleResponseDto> => {
        try {
            const updateData = await this._skipRuleRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError('Skip Rule Data not found!');
            }
            if (model.Name) {
                updateData.Name = model.Name;
            }
            if (model.Description) {
                updateData.Description = model.Description;
            }
            if (model.OperationId) {
                updateData.OperationId = model.OperationId;
            }
            if (model.SkipWhenTrue !== undefined) {
                updateData.SkipWhenTrue = model.SkipWhenTrue;
            }
            if (model.LogicId) {
                updateData.LogicId = model.LogicId;
            }
            var record = await this._skipRuleRepo.save(updateData);
            return SkipRuleMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._skipRuleRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._skipRuleRepo.save(record);
            return true; // Soft delete successful
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    search = async (filters: SkipRuleSearchFilters): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._skipRuleRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => SkipRuleMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    private getSearchModel = (filters: SkipRuleSearchFilters) => {

        var search: FindManyOptions<SkipRuleEntity> = {
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