import { IFunctionExpressionOperationRepo } from '../../../../repository.interfaces/field.operations/function.expression.operation/function.expression.operation.repo.interface';
import {
    FunctionExpressionOperationResponseDto,
    FunctionExpressionOperationCreateModel,
    FunctionExpressionOperationUpdateModel,
    OperationSearchFilters,
} from '../../../../../domain.types/forms/operation.domain.types';
import { FunctionExpressionOperationMapper } from '../../mappers/function.expression.operation.mapper';
import { FunctionExpressionOperationEntity } from '../../models/operation/function.expression.operation.model';
import { Source } from '../../database.connector.typeorm';
import { ErrorHandler } from '../../../../../common/res.handlers/error.handler';
import { Logger } from '../../../../../common/logger';
import { BaseRepo } from '../base.repo';
import { FindManyOptions, Repository } from 'typeorm';

export class FunctionExpressionOperationRepo
    extends BaseRepo
    implements IFunctionExpressionOperationRepo
{
    _functionExpressionOperationRepo: Repository<FunctionExpressionOperationEntity> =
        Source.getRepository(FunctionExpressionOperationEntity);

    // Function Expression Operation operations
    createFunctionExpressionOperation = async (
        model: FunctionExpressionOperationCreateModel
    ): Promise<FunctionExpressionOperationResponseDto> => {
        try {
            const data = this._functionExpressionOperationRepo.create({
                Name: model.Name,
                Description: model.Description,
                Type: model.Type,
                Expression: model.Expression,
                Variables: model.Variables,
                ResultDataType: model.ResultDataType,
            });
            const record =
                await this._functionExpressionOperationRepo.save(data);
            return FunctionExpressionOperationMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    updateFunctionExpressionOperation = async (
        id: string,
        model: FunctionExpressionOperationUpdateModel
    ): Promise<FunctionExpressionOperationResponseDto> => {
        try {
            const updateData =
                await this._functionExpressionOperationRepo.findOne({
                    where: {
                        id: id,
                        DeletedAt: null,
                    },
                });
            if (!updateData) {
                ErrorHandler.throwNotFoundError(
                    'Function Expression Operation Data not found!'
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
            if (model.Expression) {
                updateData.Expression = model.Expression;
            }
            if (model.Variables) {
                updateData.Variables = model.Variables;
            }
            if (model.ResultDataType) {
                updateData.ResultDataType = model.ResultDataType;
            }

            updateData.UpdatedAt = new Date();

            const record =
                await this._functionExpressionOperationRepo.save(updateData);
            return FunctionExpressionOperationMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getFunctionExpressionOperationById = async (
        id: string
    ): Promise<FunctionExpressionOperationResponseDto> => {
        try {
            const record = await this._functionExpressionOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return FunctionExpressionOperationMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    deleteFunctionExpressionOperation = async (
        id: string
    ): Promise<boolean> => {
        try {
            const record = await this._functionExpressionOperationRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._functionExpressionOperationRepo.save(record);

            return true; // Soft delete successful
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    searchFunctionExpressionOperation = async (
        filters: OperationSearchFilters
    ): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] =
                await this._functionExpressionOperationRepo.findAndCount(
                    search
                );

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: FunctionExpressionOperationMapper.toArrayDto(list),
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
        var search: FindManyOptions<FunctionExpressionOperationEntity> = {
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

        return search;
    };
}
