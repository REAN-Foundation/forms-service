import {
    IterateOperationResponseDto,
    IterateOperationCreateModel,
    IterateOperationUpdateModel,
    IterateOperationSearchFilters,
    IterateOperationSearchResults,
} from '../../domain.types/operations/iterate.operation.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { IterateOperation } from '../models/operation/iterate.operation.model';
import { IterateOperationMapper } from '../mappers/iterate.operation.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { OperationType } from '../../domain.types/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class IterateOperationService extends BaseService {

    _iterateOperationRepository: Repository<IterateOperation> = Source.getRepository(IterateOperation);

    // Iterate Operation operations
    public create = async (createModel: IterateOperationCreateModel)
        : Promise<IterateOperationResponseDto> => {

        const operation = this._iterateOperationRepository.create({
            Type: OperationType.Iterate,
            Name: createModel.Name,
            Description: createModel.Description,
            CollectionField: createModel.CollectionField,
            ResultField: createModel.ResultField,
            OperationId: createModel.OperationId,
            FilterExpression: createModel.FilterExpression,
        });
        const record = await this._iterateOperationRepository.save(operation);

        return IterateOperationMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<IterateOperationResponseDto> => {
        try {
            const operation = await this._iterateOperationRepository.findOne({
                where: {
                    id: id
                }
            });

            return IterateOperationMapper.toDto(operation);
        } catch (error) {
            logger.error(`❌ Error getting iterate operation by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: IterateOperationSearchFilters)
        : Promise<IterateOperationSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._iterateOperationRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => IterateOperationMapper.toDto(x)) as any,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching iterate operations: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: IterateOperationUpdateModel)
        : Promise<IterateOperationResponseDto> => {
        try {
            const operation = await this._iterateOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!operation) {
                ErrorHandler.throwNotFoundError('Iterate operation not found!');
            }
            if (model.Name != null) {
                operation.Name = model.Name;
            }
            if (model.Description != null) {
                operation.Description = model.Description;
            }
            if (model.CollectionField != null) {
                operation.CollectionField = model.CollectionField;
            }
            if (model.ResultField != null) {
                operation.ResultField = model.ResultField;
            }
            if (model.OperationId != null) {
                operation.OperationId = model.OperationId;
            }
            if (model.FilterExpression != null) {
                operation.FilterExpression = model.FilterExpression;
            }
            var record = await this._iterateOperationRepository.save(operation);
            return IterateOperationMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating iterate operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._iterateOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._iterateOperationRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting iterate operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: IterateOperationSearchFilters) => {

        var search: FindManyOptions<IterateOperation> = {
            where: {
                Type: OperationType.Iterate
            }
        };

        if (filters.CollectionField) {
            search.where['CollectionField'] = filters.CollectionField;
        }
        if (filters.ResultField) {
            search.where['ResultField'] = filters.ResultField;
        }
        if (filters.OperationId) {
            search.where['OperationId'] = filters.OperationId;
        }
        if (filters.FilterExpression) {
            search.where['FilterExpression'] = filters.FilterExpression;
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
