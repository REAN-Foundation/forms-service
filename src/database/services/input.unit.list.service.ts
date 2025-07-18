import {
    InputUnitListCreateModel,
    InputUnitListResponseDto,
    InputUnitListSearchFilters,
    InputUnitListUpdateModel,
    InputUnitListSearchResults,
} from '../../domain.types/input.unit.list.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { InputUnitList } from '../models/input.unit.list/input.unit.list.model';
import { InputUnitListMapper } from '../mappers/input.unit.list.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class InputUnitListService extends BaseService {

    _inputUnitListRepository: Repository<InputUnitList> = Source.getRepository(InputUnitList);

    // Input Unit List operations
    public create = async (createModel: InputUnitListCreateModel)
        : Promise<InputUnitListResponseDto> => {

        const unitList = this._inputUnitListRepository.create({
            Name: createModel.Name,
            Description: createModel.Description,
            Units: JSON.stringify(createModel.Units),
        });
        const record = await this._inputUnitListRepository.save(unitList);

        return InputUnitListMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<InputUnitListResponseDto> => {
        try {
            const unitList = await this._inputUnitListRepository.findOne({
                where: {
                    id: id
                }
            });

            return InputUnitListMapper.toDto(unitList);
        } catch (error) {
            logger.error(`❌ Error getting input unit list by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: InputUnitListSearchFilters)
        : Promise<InputUnitListSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._inputUnitListRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => InputUnitListMapper.toDto(x)) as any,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching input unit lists: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: InputUnitListUpdateModel)
        : Promise<InputUnitListResponseDto> => {
        try {
            const unitList = await this._inputUnitListRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!unitList) {
                ErrorHandler.throwNotFoundError('Input unit list not found!');
            }
            if (model.Name != null) {
                unitList.Name = model.Name;
            }
            if (model.Description != null) {
                unitList.Description = model.Description;
            }
            if (model.Units != null) {
                unitList.Units = JSON.stringify(model.Units);
            }
            var record = await this._inputUnitListRepository.save(unitList);
            return InputUnitListMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating input unit list: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._inputUnitListRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._inputUnitListRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting input unit list: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: InputUnitListSearchFilters) => {

        var search: FindManyOptions<InputUnitList> = {
            where: {
            }
        };

        if (filters.Name) {
            search.where['Name'] = filters.Name;
        }
        if (filters.Description) {
            search.where['Description'] = filters.Description;
        }
        if (filters.Units) {
            search.where['Units'] = filters.Units;
        }

        return search;
    };
}
