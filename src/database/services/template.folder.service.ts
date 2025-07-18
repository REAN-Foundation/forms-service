import {
    TemplateFolderCreateModel,
    TemplateFolderResponseDto,
    TemplateFolderSearchFilters,
    TemplateFolderUpdateModel,
    TemplateFolderSearchResults,
} from '../../domain.types/template.folder.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { TemplateFolder } from '../models/template.folder/template.folder.model';
import { TemplateFolderMapper } from '../mappers/template.folder.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class TemplateFolderService extends BaseService {

    _templateFolderRepository: Repository<TemplateFolder> = Source.getRepository(TemplateFolder);

    // Template Folder operations
    public create = async (createModel: TemplateFolderCreateModel)
        : Promise<TemplateFolderResponseDto> => {

        const folder = this._templateFolderRepository.create({
            Name: createModel.Name,
            Description: createModel.Description,
            ParentFolderId: createModel.ParentFolderId,
        });
        const record = await this._templateFolderRepository.save(folder);

        return TemplateFolderMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<TemplateFolderResponseDto> => {
        try {
            const folder = await this._templateFolderRepository.findOne({
                where: {
                    id: id
                }
            });

            return TemplateFolderMapper.toDto(folder);
        } catch (error) {
            logger.error(`❌ Error getting template folder by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: TemplateFolderSearchFilters)
        : Promise<TemplateFolderSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._templateFolderRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => TemplateFolderMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching template folders: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: TemplateFolderUpdateModel)
        : Promise<TemplateFolderResponseDto> => {
        try {
            const folder = await this._templateFolderRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!folder) {
                ErrorHandler.throwNotFoundError('Template folder not found!');
            }
            if (model.Name != null) {
                folder.Name = model.Name;
            }
            if (model.Description != null) {
                folder.Description = model.Description;
            }
            if (model.ParentFolderId != null) {
                folder.ParentFolderId = model.ParentFolderId;
            }
            var record = await this._templateFolderRepository.save(folder);
            return TemplateFolderMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating template folder: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._templateFolderRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._templateFolderRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting template folder: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: TemplateFolderSearchFilters) => {

        var search: FindManyOptions<TemplateFolder> = {
            where: {
            }
        };

        if (filters.Name) {
            search.where['Name'] = filters.Name;
        }
        if (filters.ParentFolderId) {
            search.where['ParentFolderId'] = filters.ParentFolderId;
        }

        return search;
    };
}
