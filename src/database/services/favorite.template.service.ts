import {
    FavoriteTemplateCreateModel,
    FavoriteTemplateResponseDto,
    FavoriteTemplateSearchFilters,
    FavoriteTemplateUpdateModel,
    FavoriteTemplateSearchResults,
} from '../../domain.types/favorite.template.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { FavoriteTemplate } from '../models/favorite.template/favorite.template.model';
import { FavoriteTemplateMapper } from '../mappers/favorite.template.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FavoriteTemplateService extends BaseService {

    _favoriteTemplateRepository: Repository<FavoriteTemplate> = Source.getRepository(FavoriteTemplate);

    // Favorite Template operations
    public create = async (createModel: FavoriteTemplateCreateModel)
        : Promise<FavoriteTemplateResponseDto> => {

        const favorite = this._favoriteTemplateRepository.create({
            UserId: createModel.UserId,
            TemplateId: createModel.TemplateId,
        });
        const record = await this._favoriteTemplateRepository.save(favorite);

        return FavoriteTemplateMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<FavoriteTemplateResponseDto> => {
        try {
            const favorite = await this._favoriteTemplateRepository.findOne({
                where: {
                    id: id
                }
            });

            return FavoriteTemplateMapper.toDto(favorite);
        } catch (error) {
            logger.error(`❌ Error getting favorite template by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: FavoriteTemplateSearchFilters)
        : Promise<FavoriteTemplateSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._favoriteTemplateRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => FavoriteTemplateMapper.toDto(x)) as any,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching favorite templates: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: FavoriteTemplateUpdateModel)
        : Promise<FavoriteTemplateResponseDto> => {
        try {
            const favorite = await this._favoriteTemplateRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!favorite) {
                ErrorHandler.throwNotFoundError('Favorite template not found!');
            }
            if (model.UserId != null) {
                favorite.UserId = model.UserId;
            }
            if (model.TemplateId != null) {
                favorite.TemplateId = model.TemplateId;
            }
            var record = await this._favoriteTemplateRepository.save(favorite);
            return FavoriteTemplateMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating favorite template: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._favoriteTemplateRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._favoriteTemplateRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting favorite template: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: FavoriteTemplateSearchFilters) => {

        var search: FindManyOptions<FavoriteTemplate> = {
            where: {
            }
        };

        if (filters.UserId) {
            search.where['UserId'] = filters.UserId;
        }
        if (filters.TemplateId) {
            search.where['TemplateId'] = filters.TemplateId;
        }

        return search;
    };
}
