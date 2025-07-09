import { FavoriteTemplateCreateModel, FavoriteTemplateResponseDto, FavoriteTemplateSearchFilters, FavoriteTemplateUpdateModel } from "../../../../../domain.types/forms/favorite.template.domain.types";
import { IFavoriteTemplateRepo } from "../../../../repository.interfaces/favorite.template/favorite.template.repo.interface";
import { FavoriteTemplate } from "../../models/favorite.template/favorite.template.model";
import { Source } from "../../database.connector.typeorm";
import { FavoriteTemplateMapper } from "../../mappers/favorite.template.mapper";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { Logger } from "../../../../../common/logger";
import { BaseRepo } from "../base.repo";
import { FindManyOptions, Repository } from "typeorm";

export class FavoriteTemplateRepo extends BaseRepo implements IFavoriteTemplateRepo {

    _favoriteTemplateRepo: Repository<FavoriteTemplate> = Source.getRepository(FavoriteTemplate);

    create = async (model: FavoriteTemplateCreateModel): Promise<FavoriteTemplateResponseDto> => {
        try {
            const data = this._favoriteTemplateRepo.create({
                UserId: model.UserId,
                TemplateId: model.TemplateId,
            });

            const record = await this._favoriteTemplateRepo.save(data);
            return FavoriteTemplateMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    update = async (id: string, model: FavoriteTemplateUpdateModel): Promise<FavoriteTemplateResponseDto> => {
        try {
            const record = await this._favoriteTemplateRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                ErrorHandler.throwNotFoundError('Favorite template not found!');
            }

            if (model.UserId !== undefined) {
                record.UserId = model.UserId;
            }
            if (model.TemplateId !== undefined) {
                record.TemplateId = model.TemplateId;
            }

            const updatedRecord = await this._favoriteTemplateRepo.save(record);
            return FavoriteTemplateMapper.toDto(updatedRecord);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<FavoriteTemplateResponseDto> => {
        try {
            const record = await this._favoriteTemplateRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return FavoriteTemplateMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            const record = await this._favoriteTemplateRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._favoriteTemplateRepo.save(record);

            return true; // Soft delete successful
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    search = async (filters: FavoriteTemplateSearchFilters): Promise<any> => {
        try {
            const search = this.getSearchModel(filters);
            const { search: searchWithPagination, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] = await this._favoriteTemplateRepo.findAndCount(searchWithPagination);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === "DESC" ? "descending" : "ascending",
                OrderedBy: orderByColumn,
                Items: list.map((x) => FavoriteTemplateMapper.toDto(x)),
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

    private getSearchModel = (filters: FavoriteTemplateSearchFilters) => {
        const search: FindManyOptions<FavoriteTemplate> = {
            relations: {},
            where: {},
        };

        if (filters.id) {
            search.where["id"] = filters.id;
        }

        if (filters.UserId) {
            search.where["UserId"] = filters.UserId;
        }

        if (filters.TemplateId) {
            search.where["TemplateId"] = filters.TemplateId;
        }

        return search;
    };
} 