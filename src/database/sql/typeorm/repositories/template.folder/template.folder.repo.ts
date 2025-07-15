import { TemplateFolderCreateModel, TemplateFolderResponseDto, TemplateFolderSearchFilters, TemplateFolderUpdateModel } from "../../../../../domain.types/forms/template.folder.domain.types";
import { ITemplateFolderRepo } from "../../../../repository.interfaces/template.folder/template.folder.repo.interface";
import { TemplateFolder } from "../../models/template.folder/template.folder.model";
import { Source } from "../../database.connector.typeorm";
import { TemplateFolderMapper } from "../../mappers/template.folder.mapper";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { Logger } from "../../../../../common/logger";
import { BaseRepo } from "../base.repo";
import { FindManyOptions, Repository } from "typeorm";

export class TemplateFolderRepo extends BaseRepo implements ITemplateFolderRepo {
    
    _templateFolderRepo: Repository<TemplateFolder> = Source.getRepository(TemplateFolder);

    create = async (model: TemplateFolderCreateModel): Promise<TemplateFolderResponseDto> => {
        try {
            const data = this._templateFolderRepo.create({
                Name: model.Name,
                Description: model.Description,
                ParentFolderId: model.ParentFolderId,
            });
            const record = await this._templateFolderRepo.save(data);
            return TemplateFolderMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    update = async (id: string, model: TemplateFolderUpdateModel): Promise<TemplateFolderResponseDto> => {
        try {
            const record = await this._templateFolderRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!record) {
                ErrorHandler.throwNotFoundError('Template folder not found!');
            }
            if (model.Name !== undefined) {
                record.Name = model.Name;
            }
            if (model.Description !== undefined) {
                record.Description = model.Description;
            }
            if (model.ParentFolderId !== undefined) {
                record.ParentFolderId = model.ParentFolderId;
            }
            const updatedRecord = await this._templateFolderRepo.save(record);
            return TemplateFolderMapper.toDto(updatedRecord);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<TemplateFolderResponseDto> => {
        try {
            const record = await this._templateFolderRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return TemplateFolderMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            const record = await this._templateFolderRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!record) {
                return false;
            }
            record.DeletedAt = new Date();
            await this._templateFolderRepo.save(record);
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    search = async (filters: TemplateFolderSearchFilters): Promise<any> => {
        try {
            const search = this.getSearchModel(filters);
            const { search: searchWithPagination, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] = await this._templateFolderRepo.findAndCount(searchWithPagination);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === "DESC" ? "descending" : "ascending",
                OrderedBy: orderByColumn,
                Items: list.map((x) => TemplateFolderMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwDbAccessError(
                "DB Error: Unable to search records!",
                error
            );
        }
    };

    private getSearchModel = (filters: TemplateFolderSearchFilters) => {
        const search: FindManyOptions<TemplateFolder> = {
            relations: {},
            where: {},
        };
        if (filters.id) {
            search.where["id"] = filters.id;
        }
        if (filters.Name) {
            search.where["Name"] = filters.Name;
        }
        if (filters.ParentFolderId) {
            search.where["ParentFolderId"] = filters.ParentFolderId;
        }
        return search;
    };
} 