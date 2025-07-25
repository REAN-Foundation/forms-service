import {
    FunctionExpressionOperationResponseDto,
    FunctionExpressionOperationCreateModel,
    FunctionExpressionOperationUpdateModel,
    FunctionExpressionOperationSearchFilters,
    FunctionExpressionOperationSearchResults,
} from '../../domain.types/operations/function.expression.operation.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { FunctionExpressionOperation } from '../models/operation/function.expression.operation.model';
import { FunctionExpressionOperationMapper } from '../mappers/function.expression.operation.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { OperationType } from '../../domain.types/enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FunctionExpressionOperationService extends BaseService {

    _functionExpressionOperationRepository: Repository<FunctionExpressionOperation> = Source.getRepository(FunctionExpressionOperation);

    // Function Expression Operation operations
    public create = async (createModel: FunctionExpressionOperationCreateModel)
        : Promise<FunctionExpressionOperationResponseDto> => {

        const operation = this._functionExpressionOperationRepository.create({
            Type: OperationType.FunctionExpression,
            Name: createModel.Name,
            Description: createModel.Description,
            Expression: createModel.Expression,
            Variables: createModel.Variables,
        });
        const record = await this._functionExpressionOperationRepository.save(operation);

        return FunctionExpressionOperationMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<FunctionExpressionOperationResponseDto> => {
        try {
            const operation = await this._functionExpressionOperationRepository.findOne({
                where: {
                    id: id
                }
            });

            return FunctionExpressionOperationMapper.toDto(operation);
        } catch (error) {
            logger.error(`❌ Error getting function expression operation by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: FunctionExpressionOperationSearchFilters)
        : Promise<FunctionExpressionOperationSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._functionExpressionOperationRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => FunctionExpressionOperationMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching function expression operations: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: FunctionExpressionOperationUpdateModel)
        : Promise<FunctionExpressionOperationResponseDto> => {
        try {
            const operation = await this._functionExpressionOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!operation) {
                ErrorHandler.throwNotFoundError('Function expression operation not found!');
            }
            if (model.Name != null) {
                operation.Name = model.Name;
            }
            if (model.Description != null) {
                operation.Description = model.Description;
            }
            if (model.Expression != null) {
                operation.Expression = model.Expression;
            }
            if (model.Variables != null) {
                operation.Variables = model.Variables;
            }
            var record = await this._functionExpressionOperationRepository.save(operation);
            return FunctionExpressionOperationMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating function expression operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._functionExpressionOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._functionExpressionOperationRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting function expression operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: FunctionExpressionOperationSearchFilters) => {

        var search: FindManyOptions<FunctionExpressionOperation> = {
            where: {
                Type: OperationType.FunctionExpression
            }
        };

        if (filters.Expression) {
            search.where['Expression'] = filters.Expression;
        }
        if (filters.Variables) {
            search.where['Variables'] = filters.Variables;
        }

        return search;
    };
}
