import { IMathematicalOperationRepo } from '../../../../repository.interfaces/field.operations/mathematical.operation/mathematical.operation.repo.interface';
import {
    MathematicalOperationResponseDto,
    MathematicalOperationCreateModel,
    MathematicalOperationUpdateModel,
    OperationSearchFilters,
} from '../../../../../domain.types/forms/operation.domain.types';
import { MathematicalOperationMapper } from '../../mappers/mathematical.operation.mapper';
import { MathematicalOperationEntity } from '../../models/operation/mathematical.operation.model';
import { MathematicalOperatorType } from '../../../../../domain.types/forms/operation.enums';
import { Source } from '../../database.connector.typeorm';
import { ErrorHandler } from '../../../../../common/res.handlers/error.handler';
import { Logger } from '../../../../../common/logger';
import { BaseRepo } from '../base.repo';
import { FindManyOptions, Repository } from 'typeorm';

export class MathematicalOperationRepo
    extends BaseRepo
    implements IMathematicalOperationRepo
{
    _mathematicalOperationRepo: Repository<MathematicalOperationEntity> =
        Source.getRepository(MathematicalOperationEntity);

    // Mathematical Operation operations
    createMathematicalOperation = async (
        model: MathematicalOperationCreateModel
    ): Promise<MathematicalOperationResponseDto> => {
        try {
            const data = this._mathematicalOperationRepo.create({
                Name: model.Name,
                Description: model.Description,
                Type: model.Type,
                Operator: model.Operator,
                Operands: model.Operands,
                ResultDataType: model.ResultDataType,
            });
            const record = await this._mathematicalOperationRepo.save(data);
            return MathematicalOperationMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    updateMathematicalOperation = async (
        id: string,
        model: MathematicalOperationUpdateModel
    ): Promise<MathematicalOperationResponseDto> => {
        try {
            const updateData = await this._mathematicalOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError(
                    'Mathematical Operation Data not found!'
                );
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
                updateData.Operator =
                    model.Operator as MathematicalOperatorType;
            }
            if (model.Operands) {
                updateData.Operands = model.Operands;
            }
            if (model.ResultDataType) {
                updateData.ResultDataType = model.ResultDataType;
            }

            updateData.UpdatedAt = new Date();

            const record =
                await this._mathematicalOperationRepo.save(updateData);
            return MathematicalOperationMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getMathematicalOperationById = async (
        id: string
    ): Promise<MathematicalOperationResponseDto> => {
        try {
            const record = await this._mathematicalOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return MathematicalOperationMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    deleteMathematicalOperation = async (id: string): Promise<boolean> => {
        try {
            const record = await this._mathematicalOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._mathematicalOperationRepo.save(record);

            return true; // Soft delete successful
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    searchMathematicalOperation = async (
        filters: OperationSearchFilters
    ): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] =
                await this._mathematicalOperationRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: MathematicalOperationMapper.toArrayDto(list),
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

    private getSearchModel = (filters: OperationSearchFilters) => {
        var search: FindManyOptions<MathematicalOperationEntity> = {
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

        if (filters.operator) {
            search.where['Operator'] = filters.operator;
        }

        return search;
    };
}
