import { ValidationRuleCreateModel, ValidationRuleResponseDto, ValidationRuleSearchFilters, ValidationRuleUpdateModel } from "../../../../../domain.types/forms/validation.rule.domain.types";
import { IValidationRuleRepo } from "../../../../repository.interfaces/field.rules/validation.rule/validation.rule.repo.interface";
import { ValidationRuleEntity } from "../../models/rule/validation.rule.model";
import { ValidationRuleMapper } from "../../mappers/validation.rule.mapper";
import { Source } from "../../database.connector.typeorm";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { Logger } from "../../../../../common/logger";
import { FindManyOptions, Repository } from "typeorm";
import { BaseRepo } from "../base.repo";

export class ValidationRuleRepo extends BaseRepo implements IValidationRuleRepo {

    _validationRuleRepo: Repository<ValidationRuleEntity> = Source.getRepository(ValidationRuleEntity);

    create = async (model: ValidationRuleCreateModel): Promise<ValidationRuleResponseDto> => {
        try {
            const data = await this._validationRuleRepo.create({
                Name: model.Name,
                Description: model.Description,
                Priority: model.Priority,
                IsActive: model.IsActive,
                OperationId: model.OperationId,
                ErrorWhenFalse: model.ErrorWhenFalse,
                ErrorMessage: model.ErrorMessage,
                LogicId: model.LogicId
            });
            const record = await this._validationRuleRepo.save(data);
            return ValidationRuleMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<ValidationRuleResponseDto> => {
        try {
            var record = await this._validationRuleRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null
                },
            });
            return ValidationRuleMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    update = async (id: string, model: ValidationRuleUpdateModel): Promise<ValidationRuleResponseDto> => {
        try {
            const updateData = await this._validationRuleRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError('Validation Rule Data not found!');
            }
            if (model.Name) {
                updateData.Name = model.Name;
            }
            if (model.Description) {
                updateData.Description = model.Description;
            }
            if (model.Priority !== undefined) {
                updateData.Priority = model.Priority;
            }
            if (model.IsActive !== undefined) {
                updateData.IsActive = model.IsActive;
            }
            if (model.OperationId) {
                updateData.OperationId = model.OperationId;
            }
            if (model.ErrorWhenFalse !== undefined) {
                updateData.ErrorWhenFalse = model.ErrorWhenFalse;
            }
            if (model.ErrorMessage) {
                updateData.ErrorMessage = model.ErrorMessage;
            }
            if (model.LogicId) {
                updateData.LogicId = model.LogicId;
            }
            var record = await this._validationRuleRepo.save(updateData);
            return ValidationRuleMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._validationRuleRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._validationRuleRepo.save(record);
            return true; // Soft delete successful
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    search = async (filters: ValidationRuleSearchFilters): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._validationRuleRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: ValidationRuleMapper.toArrayDto(list),
            };
            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    private getSearchModel = (filters: ValidationRuleSearchFilters) => {

        var search: FindManyOptions<ValidationRuleEntity> = {
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