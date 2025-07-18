import {
    SkipLogicResponseDto,
    SkipLogicCreateModel,
    SkipLogicUpdateModel,
    SkipLogicSearchFilters,
    SkipLogicSearchResults,
} from '../../domain.types/logic/skip.logic.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { SkipLogic } from '../models/logic/skip.logic.model';
import { SkipLogicMapper } from '../mappers/skip.logic.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { LogicType } from '../../domain.types/logic.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class SkipLogicService extends BaseService {

    _skipLogicRepository: Repository<SkipLogic> = Source.getRepository(SkipLogic);

    // Skip Logic operations
    public create = async (createModel: SkipLogicCreateModel)
        : Promise<SkipLogicResponseDto> => {

        const logic = this._skipLogicRepository.create({
            Type: LogicType.Skip,
            FieldId: createModel.FieldId,
            Enabled: createModel.Enabled,
            DefaultSkip: createModel.DefaultSkip,
        });
        const record = await this._skipLogicRepository.save(logic);

        return SkipLogicMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<SkipLogicResponseDto> => {
        try {
            const logic = await this._skipLogicRepository.findOne({
                where: {
                    id: id
                }
            });

            return SkipLogicMapper.toDto(logic);
        } catch (error) {
            logger.error(`❌ Error getting skip logic by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: SkipLogicSearchFilters)
        : Promise<SkipLogicSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._skipLogicRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => SkipLogicMapper.toDto(x)) as any,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching skip logics: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: SkipLogicUpdateModel)
        : Promise<SkipLogicResponseDto> => {
        try {
            const logic = await this._skipLogicRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!logic) {
                ErrorHandler.throwNotFoundError('Skip logic not found!');
            }
            if (model.Enabled != null) {
                logic.Enabled = model.Enabled;
            }
            if (model.DefaultSkip != null) {
                logic.DefaultSkip = model.DefaultSkip;
            }
            if (model.FieldId != null) {
                logic.FieldId = model.FieldId;
            }
            var record = await this._skipLogicRepository.save(logic);
            return SkipLogicMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating skip logic: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._skipLogicRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._skipLogicRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting skip logic: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: SkipLogicSearchFilters) => {

        var search: FindManyOptions<SkipLogic> = {
            relations: {
                Rules: true,
            },
            where: {
            }
        };

        if (filters.FieldId) {
            search.where['FieldId'] = filters.FieldId;
        }
        if (filters.Enabled) {
            search.where['Enabled'] = filters.Enabled;
        }
        if (filters.DefaultSkip) {
            search.where['DefaultSkip'] = filters.DefaultSkip;
        }

        return search;
    };
}
