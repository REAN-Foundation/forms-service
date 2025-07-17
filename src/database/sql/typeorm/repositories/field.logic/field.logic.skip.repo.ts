import { ISkipLogicRepo } from '../../../../repository.interfaces/field.logic/skip.logic/skip.logic.repo.interface';
import {
    SkipLogicResponseDto,
    SkipLogicCreateModel,
    SkipLogicUpdateModel,
    LogicSearchFilters,
} from '../../../../../domain.types/forms/logic.domain.types';
import { SkipLogicMapper } from '../../mappers/skip.logic.mapper';
import { SkipLogicEntity } from '../../models/logic/skip.logic.model';
import { LogicType } from '../../../../../domain.types/forms/logic.enums';
import { Source } from '../../database.connector.typeorm';
import { ErrorHandler } from '../../../../../common/res.handlers/error.handler';
import { Logger } from '../../../../../common/logger';
import { BaseRepo } from '../base.repo';
import { FindManyOptions, Repository } from 'typeorm';

export class SkipLogicRepo extends BaseRepo implements ISkipLogicRepo {
    _skipLogicRepo: Repository<SkipLogicEntity> =
        Source.getRepository(SkipLogicEntity);

    createSkipLogic = async (
        model: SkipLogicCreateModel
    ): Promise<SkipLogicResponseDto> => {
        try {
            const data = this._skipLogicRepo.create({
                FieldId: model.FieldId,
                Type: model.Type,
                Enabled: model.Enabled,
                DefaultSkip: model.DefaultSkip,
            });
            const record = await this._skipLogicRepo.save(data);
            return SkipLogicMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    updateSkipLogic = async (
        id: string,
        model: SkipLogicUpdateModel
    ): Promise<SkipLogicResponseDto> => {
        try {
            const updateData = await this._skipLogicRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError('Skip Logic Data not found!');
            }

            if (model.Type) {
                updateData.Type = model.Type as LogicType.Skip;
            }
            if (model.FieldId) {
                updateData.FieldId = model.FieldId;
            }
            if (model.Enabled !== undefined) {
                updateData.Enabled = model.Enabled;
            }
            if (model.DefaultSkip !== undefined) {
                updateData.DefaultSkip = model.DefaultSkip;
            }

            updateData.UpdatedAt = new Date();

            const record = await this._skipLogicRepo.save(updateData);
            return SkipLogicMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getSkipLogicById = async (id: string): Promise<SkipLogicResponseDto> => {
        try {
            const record = await this._skipLogicRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return SkipLogicMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    deleteSkipLogic = async (id: string): Promise<boolean> => {
        try {
            const record = await this._skipLogicRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._skipLogicRepo.save(record);

            return true; // Soft delete successful
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    searchSkipLogic = async (filters: LogicSearchFilters): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] =
                await this._skipLogicRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: SkipLogicMapper.toArrayDto(list),
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

    private getSearchModel = (filters: LogicSearchFilters) => {
        var search: FindManyOptions<SkipLogicEntity> = {
            relations: {},
            where: {},
        };

        if (filters.id) {
            search.where['id'] = filters.id;
        }

        if (filters.type) {
            search.where['Type'] = filters.type;
        }

        if (filters.fieldId) {
            search.where['FieldId'] = filters.fieldId;
        }

        if (filters.enabled !== undefined) {
            search.where['Enabled'] = filters.enabled;
        }

        if (filters.defaultSkip !== undefined) {
            search.where['DefaultSkip'] = filters.defaultSkip;
        }

        return search;
    };
}
