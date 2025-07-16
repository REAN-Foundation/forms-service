import {
    InputUnitListCreateModel,
    InputUnitListResponseDto,
    InputUnitListSearchFilters,
    InputUnitListUpdateModel,
} from '../../../../../domain.types/forms/input.unit.list.domain.types';
import { IInputUnitListRepo } from '../../../../repository.interfaces/input.unit.list/input.unit.list.repo.interface';
import { InputUnitList } from '../../models/input.unit.list/input.unit.list.model';
import { Source } from '../../database.connector.typeorm';
import { InputUnitListMapper } from '../../mappers/input.unit.list.mapper';
import { ErrorHandler } from '../../../../../common/handlers/error.handler';
import { Logger } from '../../../../../common/logger';
import { BaseRepo } from '../base.repo';
import { FindManyOptions, Repository } from 'typeorm';

export class InputUnitListRepo extends BaseRepo implements IInputUnitListRepo {
    _inputUnitListRepo: Repository<InputUnitList> =
        Source.getRepository(InputUnitList);

    create = async (
        model: InputUnitListCreateModel
    ): Promise<InputUnitListResponseDto> => {
        try {
            const data = this._inputUnitListRepo.create({
                Name: model.Name,
                Description: model.Description,
                Units: JSON.stringify(model.Units),
            });
            const record = await this._inputUnitListRepo.save(data);
            return InputUnitListMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    update = async (
        id: string,
        model: InputUnitListUpdateModel
    ): Promise<InputUnitListResponseDto> => {
        try {
            const record = await this._inputUnitListRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!record) {
                ErrorHandler.throwNotFoundError('Input unit list not found!');
            }
            if (model.Name !== undefined) {
                record.Name = model.Name;
            }
            if (model.Description !== undefined) {
                record.Description = model.Description;
            }
            if (model.Units !== undefined) {
                record.Units = JSON.stringify(model.Units);
            }
            const updatedRecord = await this._inputUnitListRepo.save(record);
            return InputUnitListMapper.toDto(updatedRecord);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<InputUnitListResponseDto> => {
        try {
            const record = await this._inputUnitListRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return InputUnitListMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            const record = await this._inputUnitListRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!record) {
                return false;
            }
            record.DeletedAt = new Date();
            await this._inputUnitListRepo.save(record);
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    search = async (filters: InputUnitListSearchFilters): Promise<any> => {
        try {
            const search = this.getSearchModel(filters);
            const {
                search: searchWithPagination,
                pageIndex,
                limit,
                order,
                orderByColumn,
            } = this.addSortingAndPagination(search, filters);
            const [list, count] =
                await this._inputUnitListRepo.findAndCount(
                    searchWithPagination
                );
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: InputUnitListMapper.toArrayDto(list),
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

    private getSearchModel = (filters: InputUnitListSearchFilters) => {
        const search: FindManyOptions<InputUnitList> = {
            relations: {},
            where: {},
        };
        if (filters.id) {
            search.where['id'] = filters.id;
        }
        if (filters.Name) {
            search.where['Name'] = filters.Name;
        }
        return search;
    };
}
