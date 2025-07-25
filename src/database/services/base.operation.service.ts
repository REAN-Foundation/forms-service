import {
    BaseOperationResponseDto,
    BaseOperationCreateModel,
    BaseOperationUpdateModel,
    BaseOperationSearchFilters,
    BaseOperationSearchResults,
} from '../../domain.types/operations/base.operation.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { BaseOperation } from '../models/operation/base.operation.model';
import { BaseOperationMapper } from '../mappers/base.operation.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class BaseOperationService extends BaseService {

    _baseOperationRepository: Repository<BaseOperation> = Source.getRepository(BaseOperation);

    // Base Operation operations
    public create = async (createModel: BaseOperationCreateModel)
        : Promise<BaseOperationResponseDto> => {

        const operation = this._baseOperationRepository.create({
            Name: createModel.Name,
            Description: createModel.Description,
            Type: createModel.Type,
        });
        const record = await this._baseOperationRepository.save(operation);

        return BaseOperationMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<BaseOperationResponseDto> => {
        try {
            const operation = await this._baseOperationRepository.findOne({
                where: {
                    id: id
                }
            });

            return BaseOperationMapper.toDto(operation);
        } catch (error) {
            logger.error(`❌ Error getting base operation by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: BaseOperationSearchFilters)
        : Promise<BaseOperationSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._baseOperationRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => BaseOperationMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching base operations: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: BaseOperationUpdateModel)
        : Promise<BaseOperationResponseDto> => {
        try {
            const operation = await this._baseOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!operation) {
                ErrorHandler.throwNotFoundError('Base operation not found!');
            }
            if (model.Name != null) {
                operation.Name = model.Name;
            }
            if (model.Description != null) {
                operation.Description = model.Description;
            }
            if (model.Type != null) {
                operation.Type = model.Type;
            }
            var record = await this._baseOperationRepository.save(operation);
            return BaseOperationMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating base operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._baseOperationRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._baseOperationRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting base operation: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: BaseOperationSearchFilters) => {

        var search: FindManyOptions<BaseOperation> = {
            where: {}
        };

        if (filters.Name) {
            search.where['Name'] = filters.Name;
        }
        if (filters.Description) {
            search.where['Description'] = filters.Description;
        }
        if (filters.Type) {
            search.where['Type'] = filters.Type;
        }

        return search;
    };

    //#endregion
} 