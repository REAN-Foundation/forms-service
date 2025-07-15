import { ICompositionOperationRepo } from "../../../../repository.interfaces/field.operations/composition.operation/composition.operation.repo.interface";
import {
    CompositionOperationResponseDto,
    CompositionOperationCreateModel,
    CompositionOperationUpdateModel,
    OperationSearchFilters
} from "../../../../../domain.types/forms/operation.domain.types";
import { CompositionOperationMapper } from "../../mappers/composition.operation.mapper";
import { CompositionOperationEntity } from "../../models/operation/composition.operation.model";
import { CompositionOperatorType } from "../../../../../domain.types/forms/operation.enums";
import { Source } from "../../database.connector.typeorm";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { Logger } from "../../../../../common/logger";
import { BaseRepo } from "../base.repo";
import { FindManyOptions, Repository } from "typeorm";

export class CompositionOperationRepo extends BaseRepo implements ICompositionOperationRepo {

    _compositionOperationRepo: Repository<CompositionOperationEntity> = Source.getRepository(CompositionOperationEntity);
    
    // Composition Operation operations
    createCompositionOperation = async (model: CompositionOperationCreateModel): Promise<CompositionOperationResponseDto> => {
        try {
            const data = this._compositionOperationRepo.create({
                Name: model.Name,
                Description: model.Description,
                Type: model.Type,
                Operator: model.Operator,
                Operands: model.Operands
            });
            const record = await this._compositionOperationRepo.save(data);
            return CompositionOperationMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    updateCompositionOperation = async (id: string, model: CompositionOperationUpdateModel): Promise<CompositionOperationResponseDto> => {
        try {
            const updateData = await this._compositionOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError("Composition Operation Data not found!");
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
                updateData.Operator = model.Operator as CompositionOperatorType;
            }
            if (model.Operands) {
                updateData.Operands = model.Operands;
            }

            updateData.UpdatedAt = new Date();

            const record = await this._compositionOperationRepo.save(updateData);
            return CompositionOperationMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getCompositionOperationById = async (id: string): Promise<CompositionOperationResponseDto> => {
        try {
            const record = await this._compositionOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return CompositionOperationMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    deleteCompositionOperation = async (id: string): Promise<boolean> => {
        try {
            const record = await this._compositionOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._compositionOperationRepo.save(record);

            return true; // Soft delete successful
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    searchCompositionOperation = async (filters: OperationSearchFilters): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] = await this._compositionOperationRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === "DESC" ? "descending" : "ascending",
                OrderedBy: orderByColumn,
                Items: CompositionOperationMapper.toArrayDto(list),
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
        var search: FindManyOptions<CompositionOperationEntity> = {
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