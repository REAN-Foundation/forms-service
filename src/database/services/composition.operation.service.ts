import {
    CompositionOperationResponseDto,
    CompositionOperationCreateModel,
    CompositionOperationUpdateModel,
    CompositionOperationSearchFilters,
    CompositionOperationSearchResults,
} from '../../domain.types/operations/composition.operation.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { CompositionOperation } from '../models/operation/composition.operation.model';
import { CompositionOperationMapper } from '../mappers/composition.operation.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { OperationType } from '../../domain.types/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CompositionOperationService extends BaseService {

    _compositionOperationRepository: Repository<CompositionOperation> = Source.getRepository(CompositionOperation);

    // Composition Operation operations
    public create = async (createModel: CompositionOperationCreateModel)
        : Promise<CompositionOperationResponseDto> => {

        const operation = this._compositionOperationRepository.create({
            Type: OperationType.Composition,
            Name: createModel.Name,
            Description: createModel.Description,
            Operator: createModel.Operator,
            Operands: createModel.Operands,
        });
        const record = await this._compositionOperationRepository.save(operation);

        return CompositionOperationMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<CompositionOperationResponseDto> => {
        try {
            const operation = await this._compositionOperationRepository.findOne({
                where: {
                    id: id
                }
            });

            return CompositionOperationMapper.toDto(operation);
        } catch (error) {
            logger.error(`❌ Error getting composition operation by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: CompositionOperationSearchFilters)
        : Promise<CompositionOperationSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._compositionOperationRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => CompositionOperationMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching composition operations: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: CompositionOperationUpdateModel)
        : Promise<CompositionOperationResponseDto> => {
        try {
            const operation = await this._compositionOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!operation) {
                ErrorHandler.throwNotFoundError('Composition operation not found!');
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
            var record = await this._compositionOperationRepository.save(operation);
            return CompositionOperationMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating composition operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._compositionOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._compositionOperationRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting composition operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: CompositionOperationSearchFilters) => {

        var search: FindManyOptions<CompositionOperation> = {
            where: {
                Type: OperationType.Composition
            }
        };

        if (filters.Operator) {
            search.where['Operator'] = filters.Operator;
        }
        if (filters.Operands) {
            search.where['Operands'] = filters.Operands;
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
