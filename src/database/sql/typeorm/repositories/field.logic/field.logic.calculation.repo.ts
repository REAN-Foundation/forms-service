import { ICalculationLogicRepo } from "../../../../repository.interfaces/field.logic/calculation.logic/calculation.logic.repo.interface";
import {
    CalculationLogicResponseDto,
    CalculationLogicCreateModel,
    CalculationLogicUpdateModel,
    LogicSearchFilters
} from "../../../../../domain.types/forms/logic.domain.types";
import { CalculationLogicMapper } from "../../mappers/calculation.logic.mapper";
import { CalculationLogicEntity } from "../../models/logic/calculation.logic.model";
import { LogicType } from "../../../../../domain.types/forms/logic.enums";
import { Source } from "../../database.connector.typeorm";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { Logger } from "../../../../../common/logger";
import { BaseRepo } from "../base.repo";
import { FindManyOptions, Repository } from "typeorm";

export class CalculationLogicRepo extends BaseRepo implements ICalculationLogicRepo {

    _calculationLogicRepo: Repository<CalculationLogicEntity> = Source.getRepository(CalculationLogicEntity);
    
    // Calculation Logic operations
    createCalculationLogic = async (model: CalculationLogicCreateModel): Promise<CalculationLogicResponseDto> => {
        try {
            const data = this._calculationLogicRepo.create({
                FieldId: model.FieldId,
                Type: model.Type,
                Enabled: model.Enabled,
                FallbackValue: model.FallbackValue
            });
            const record = await this._calculationLogicRepo.save(data);
            return CalculationLogicMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    updateCalculationLogic = async (id: string, model: CalculationLogicUpdateModel): Promise<CalculationLogicResponseDto> => {
        try {
            const updateData = await this._calculationLogicRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError("Calculation Logic Data not found!");
            }

            if (model.Type) {
                updateData.Type = model.Type as LogicType.Calculation;
            }
            if (model.FieldId) {
                updateData.FieldId = model.FieldId;
            }
            if (model.Enabled !== undefined) {
                updateData.Enabled = model.Enabled;
            }
            if (model.FallbackValue !== undefined) {
                updateData.FallbackValue = model.FallbackValue;
            }

            updateData.UpdatedAt = new Date();

            const record = await this._calculationLogicRepo.save(updateData);
            return CalculationLogicMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getCalculationLogicById = async (id: string): Promise<CalculationLogicResponseDto> => {
        try {
            const record = await this._calculationLogicRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return CalculationLogicMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    deleteCalculationLogic = async (id: string): Promise<boolean> => {
        try {
            const record = await this._calculationLogicRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._calculationLogicRepo.save(record);

            return true; // Soft delete successful
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    searchCalculationLogic = async (filters: LogicSearchFilters): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] = await this._calculationLogicRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === "DESC" ? "descending" : "ascending",
                OrderedBy: orderByColumn,
                Items: CalculationLogicMapper.toArrayDto(list),
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

    private getSearchModel = (filters: LogicSearchFilters) => {
        var search: FindManyOptions<CalculationLogicEntity> = {
            relations: {},
            where: {},
        };

        if (filters.id) {
            search.where["id"] = filters.id;
        }

        if (filters.type) {
            search.where["Type"] = filters.type;
        }

        if (filters.fieldId) {
            search.where["FieldId"] = filters.fieldId;
        }

        if (filters.enabled !== undefined) {
            search.where["Enabled"] = filters.enabled;
        }

        return search;
    };

} 