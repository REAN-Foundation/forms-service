import {
    MathematicalOperationResponseDto,
    MathematicalOperationCreateModel,
    MathematicalOperationUpdateModel,
    MathematicalOperationSearchFilters,
    MathematicalOperationSearchResults,
} from '../../domain.types/operations/mathematical.operation.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { MathematicalOperation } from '../models/operation/mathematical.operation.model';
import { MathematicalOperationMapper } from '../mappers/mathematical.operation.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { OperationType } from '../../domain.types/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class MathematicalOperationService extends BaseService {

    _mathematicalOperationRepository: Repository<MathematicalOperation> = Source.getRepository(MathematicalOperation);

    // Mathematical Operation operations
    public create = async (createModel: MathematicalOperationCreateModel)
        : Promise<MathematicalOperationResponseDto> => {

        const operation = this._mathematicalOperationRepository.create({
            Type: OperationType.Mathematical,
            Name: createModel.Name,
            Description: createModel.Description,
            Operator: createModel.Operator,
            Operands: createModel.Operands,
            ResultDataType: createModel.ResultDataType,
        });
        const record = await this._mathematicalOperationRepository.save(operation);

        return MathematicalOperationMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<MathematicalOperationResponseDto> => {
        try {
            const operation = await this._mathematicalOperationRepository.findOne({
                where: {
                    id: id
                }
            });

            return MathematicalOperationMapper.toDto(operation);
        } catch (error) {
            logger.error(`❌ Error getting mathematical operation by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: MathematicalOperationSearchFilters)
        : Promise<MathematicalOperationSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._mathematicalOperationRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => MathematicalOperationMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching mathematical operations: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: MathematicalOperationUpdateModel)
        : Promise<MathematicalOperationResponseDto> => {
        try {
            const operation = await this._mathematicalOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!operation) {
                ErrorHandler.throwNotFoundError('Mathematical operation not found!');
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
            if (model.ResultDataType != null) {
                operation.ResultDataType = model.ResultDataType;
            }
            var record = await this._mathematicalOperationRepository.save(operation);
            return MathematicalOperationMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating mathematical operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._mathematicalOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._mathematicalOperationRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting mathematical operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: MathematicalOperationSearchFilters) => {

        var search: FindManyOptions<MathematicalOperation> = {
            where: {
                Type: OperationType.Mathematical
            }
        };

        if (filters.Operator) {
            search.where['Operator'] = filters.Operator;
        }
        if (filters.Operands) {
            search.where['Operands'] = filters.Operands;
        }
        if (filters.ResultDataType) {
            search.where['ResultDataType'] = filters.ResultDataType;
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
