import { ILogicalOperationRepo } from "../../../../repository.interfaces/field.operations/logical.operation/logical.operation.repo.interface";
import {
    LogicalOperationResponseDto,
    LogicalOperationCreateModel,
    LogicalOperationUpdateModel,
    OperationSearchFilters
} from "../../../../../domain.types/forms/operation.domain.types";
import { LogicalOperationMapper } from "../../mappers/logical.operation.mapper";
import { LogicalOperationEntity } from "../../models/operation/logical.operation.model";
import { LogicalOperatorType } from "../../../../../domain.types/forms/operation.enums";
import { Source } from "../../database.connector.typeorm";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { Logger } from "../../../../../common/logger";
import { BaseRepo } from "../base.repo";
import { FindManyOptions, Repository } from "typeorm";

export class LogicalOperationRepo extends BaseRepo implements ILogicalOperationRepo {

    _logicalOperationRepo: Repository<LogicalOperationEntity> = Source.getRepository(LogicalOperationEntity);
    
    // Logical Operation operations
    createLogicalOperation = async (model: LogicalOperationCreateModel): Promise<LogicalOperationResponseDto> => {
        try {
            const data = this._logicalOperationRepo.create({
                Name: model.Name,
                Description: model.Description,
                Type: model.Type,
                Operator: model.Operator,
                Operands: model.Operands
            });
            const record = await this._logicalOperationRepo.save(data);
            return LogicalOperationMapper.toLogicalOperationDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    updateLogicalOperation = async (id: string, model: LogicalOperationUpdateModel): Promise<LogicalOperationResponseDto> => {
        try {
            const updateData = await this._logicalOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError("Logical Operation Data not found!");
            }

            if (model.Name) {
                updateData.Name = model.Name;
            }
            if (model.Description) {
                updateData.Description = model.Description;
            }
            if (model.Type) {
                updateData.Type = model.Type as any;
            }
            if (model.Operator) {
                updateData.Operator = model.Operator as LogicalOperatorType;
            }
            if (model.Operands) {
                updateData.Operands = model.Operands;
            }

            updateData.UpdatedAt = new Date();

            const record = await this._logicalOperationRepo.save(updateData);
            return LogicalOperationMapper.toLogicalOperationDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getLogicalOperationById = async (id: string): Promise<LogicalOperationResponseDto> => {
        try {
            const record = await this._logicalOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return LogicalOperationMapper.toLogicalOperationDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    deleteLogicalOperation = async (id: string): Promise<boolean> => {
        try {
            const record = await this._logicalOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._logicalOperationRepo.save(record);

            return true; // Soft delete successful
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    searchLogicalOperation = async (filters: OperationSearchFilters): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] = await this._logicalOperationRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === "DESC" ? "descending" : "ascending",
                OrderedBy: orderByColumn,
                Items: list.map((x) => LogicalOperationMapper.toLogicalOperationDto(x)),
            };
            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwDbAccessError(
                "DB Error: Unable to search records!",
                error
            );
        }
    };

    private getSearchModel = (filters: OperationSearchFilters) => {
        var search: FindManyOptions<LogicalOperationEntity> = {
            relations: {},
            where: {},
        };

        if (filters.id) {
            search.where["id"] = filters.id;
        }

        if (filters.name) {
            search.where["Name"] = filters.name;
        }

        if (filters.description) {
            search.where["Description"] = filters.description;
        }

        if (filters.operator) {
            search.where["Operator"] = filters.operator;
        }

        return search;
    };

} 