import {
    LogicalOperationResponseDto,
    LogicalOperationCreateModel,
    LogicalOperationUpdateModel,
    LogicalOperationSearchFilters,
    LogicalOperationSearchResults,
} from '../../domain.types/operations/logical.operation.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { LogicalOperation } from '../models/operation/logical.operation.model';
import { LogicalOperationMapper } from '../mappers/logical.operation.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { OperationType } from '../../domain.types/enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class LogicalOperationService extends BaseService {

    _logicalOperationRepository: Repository<LogicalOperation> = Source.getRepository(LogicalOperation);

    // Logical Operation operations
    public create = async (createModel: LogicalOperationCreateModel)
        : Promise<LogicalOperationResponseDto> => {

        const operation = this._logicalOperationRepository.create({
            Type: OperationType.Logical,
            Name: createModel.Name,
            Description: createModel.Description,
            Operator: createModel.Operator,
            Operands: createModel.Operands,
            ValueDefinition: createModel.ValueDefinition,
        });
        const record = await this._logicalOperationRepository.save(operation);

        return LogicalOperationMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<LogicalOperationResponseDto> => {
        try {
            const operation = await this._logicalOperationRepository.findOne({
                where: {
                    id: id
                }
            });

            return LogicalOperationMapper.toDto(operation);
        } catch (error) {
            logger.error(`❌ Error getting logical operation by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: LogicalOperationSearchFilters)
        : Promise<LogicalOperationSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._logicalOperationRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => LogicalOperationMapper.toDto(x)) as any,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching logical operations: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: LogicalOperationUpdateModel)
        : Promise<LogicalOperationResponseDto> => {
        try {
            const operation = await this._logicalOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!operation) {
                ErrorHandler.throwNotFoundError('Logical operation not found!');
            }
            if (model.Name != null) {
                operation.Name = model.Name;
            }
            if (model.Description != null) {
                operation.Description = model.Description;
            }
            if (model.Operator != null) {
                operation.Operator = model.Operator;
            }
            if (model.Operands != null) {
                operation.Operands = model.Operands;
            }
            if (model.ValueDefinition != null) {
                operation.ValueDefinition = model.ValueDefinition;
            }
            var record = await this._logicalOperationRepository.save(operation);
            return LogicalOperationMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating logical operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._logicalOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._logicalOperationRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting logical operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: LogicalOperationSearchFilters) => {

        var search: FindManyOptions<LogicalOperation> = {
            where: {
                Type: OperationType.Logical
            }
        };

        if (filters.Operator) {
            search.where['Operator'] = filters.Operator;
        }
        if (filters.Operands) {
            search.where['Operands'] = filters.Operands;
        }
        if (filters.ValueDefinition) {
            search.where['ValueDefinition'] = filters.ValueDefinition;
        }
        if (filters.Name) {
            search.where['Name'] = filters.Name;
        }
        if (filters.Description) {
            search.where['Description'] = filters.Description;
        }

        return search;
    };
}
