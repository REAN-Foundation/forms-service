import { IValidationLogicRepo } from '../../../../repository.interfaces/field.logic/validation.logic/validation.logic.repo.interface';
import {
    ValidationLogicResponseDto,
    ValidationLogicCreateModel,
    ValidationLogicUpdateModel,
    LogicSearchFilters,
} from '../../../../../domain.types/forms/logic.domain.types';
import { ValidationLogicMapper } from '../../mappers/validation.logic.mapper';
import { ValidationLogicEntity } from '../../models/logic/validation.logic.model';
import { LogicType } from '../../../../../domain.types/forms/logic.enums';
import { Source } from '../../database.connector.typeorm';
import { ErrorHandler } from '../../../../../common/handlers/error.handler';
import { Logger } from '../../../../../common/logger';
import { BaseRepo } from '../base.repo';
import { FindManyOptions, Repository } from 'typeorm';

export class ValidationLogicRepo
    extends BaseRepo
    implements IValidationLogicRepo
{
    _validationLogicRepo: Repository<ValidationLogicEntity> =
        Source.getRepository(ValidationLogicEntity);

    // Validation Logic operations
    createValidationLogic = async (
        model: ValidationLogicCreateModel
    ): Promise<ValidationLogicResponseDto> => {
        try {
            const data = this._validationLogicRepo.create({
                FieldId: model.FieldId,
                Type: model.Type,
                Enabled: model.Enabled,
                // DefaultSkip: model.DefaultSkip
            });
            const record = await this._validationLogicRepo.save(data);
            return ValidationLogicMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    updateValidationLogic = async (
        id: string,
        model: ValidationLogicUpdateModel
    ): Promise<ValidationLogicResponseDto> => {
        try {
            const updateData = await this._validationLogicRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError(
                    'Validation Logic Data not found!'
                );
            }

            if (model.Type) {
                updateData.Type = model.Type as LogicType.Validation;
            }
            if (model.FieldId) {
                updateData.FieldId = model.FieldId;
            }
            if (model.Enabled !== undefined) {
                updateData.Enabled = model.Enabled;
            }

            updateData.UpdatedAt = new Date();

            const record = await this._validationLogicRepo.save(updateData);
            return ValidationLogicMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getValidationLogicById = async (
        id: string
    ): Promise<ValidationLogicResponseDto> => {
        try {
            const record = await this._validationLogicRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return ValidationLogicMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    deleteValidationLogic = async (id: string): Promise<boolean> => {
        try {
            const record = await this._validationLogicRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._validationLogicRepo.save(record);

            return true; // Soft delete successful
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    searchValidationLogic = async (
        filters: LogicSearchFilters
    ): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] =
                await this._validationLogicRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: ValidationLogicMapper.toArrayDto(list),
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

    private getSearchModel = (filters: LogicSearchFilters) => {
        var search: FindManyOptions<ValidationLogicEntity> = {
            relations: {},
            where: {},
        };

        if (filters.id) {
            search.where['id'] = filters.id;
        }

        if (filters.type) {
            search.where['Type'] = filters.type;
        }

        if (filters.fieldId) {
            search.where['FieldId'] = filters.fieldId;
        }

        if (filters.enabled !== undefined) {
            search.where['Enabled'] = filters.enabled;
        }

        return search;
    };
}
