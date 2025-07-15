import { IIterateOperationRepo } from "../../../../repository.interfaces/field.operations/iterate.operation/iterate.operation.repo.interface";
import {
    IterateOperationResponseDto,
    IterateOperationCreateModel,
    IterateOperationUpdateModel,
    OperationSearchFilters
} from "../../../../../domain.types/forms/operation.domain.types";
import { IterateOperationMapper } from "../../mappers/iterate.operation.mapper";
import { IterateOperationEntity } from "../../models/operation/iterate.operation.model";
import { Source } from "../../database.connector.typeorm";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { Logger } from "../../../../../common/logger";
import { BaseRepo } from "../base.repo";
import { FindManyOptions, Repository } from "typeorm";

export class IterateOperationRepo extends BaseRepo implements IIterateOperationRepo {

    _iterateOperationRepo: Repository<IterateOperationEntity> = Source.getRepository(IterateOperationEntity);
    
    // Iterate Operation operations
    createIterateOperation = async (model: IterateOperationCreateModel): Promise<IterateOperationResponseDto> => {
        try {
            const data = this._iterateOperationRepo.create({
                Name: model.Name,
                Description: model.Description,
                Type: model.Type,
                CollectionField: model.CollectionField,
                ResultField: model.ResultField,
                OperationId: model.OperationId,
                FilterExpression: model.FilterExpression
            });
            const record = await this._iterateOperationRepo.save(data);
            return IterateOperationMapper.toIterateOperationDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    updateIterateOperation = async (id: string, model: IterateOperationUpdateModel): Promise<IterateOperationResponseDto> => {
        try {
            const updateData = await this._iterateOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError("Iterate Operation Data not found!");
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
            if (model.CollectionField) {
                updateData.CollectionField = model.CollectionField;
            }
            if (model.ResultField) {
                updateData.ResultField = model.ResultField;
            }
            if (model.OperationId) {
                updateData.OperationId = model.OperationId;
            }
            if (model.FilterExpression) {
                updateData.FilterExpression = model.FilterExpression;
            }

            updateData.UpdatedAt = new Date();

            const record = await this._iterateOperationRepo.save(updateData);
            return IterateOperationMapper.toIterateOperationDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getIterateOperationById = async (id: string): Promise<IterateOperationResponseDto> => {
        try {
            const record = await this._iterateOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return IterateOperationMapper.toIterateOperationDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    deleteIterateOperation = async (id: string): Promise<boolean> => {
        try {
            const record = await this._iterateOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._iterateOperationRepo.save(record);

            return true; // Soft delete successful
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    searchIterateOperation = async (filters: OperationSearchFilters): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] = await this._iterateOperationRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === "DESC" ? "descending" : "ascending",
                OrderedBy: orderByColumn,
                Items: list.map((x) => IterateOperationMapper.toIterateOperationDto(x)),
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
        var search: FindManyOptions<IterateOperationEntity> = {
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

        return search;
    };

} 