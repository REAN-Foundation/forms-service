import {
    FavoriteTemplateCreateModel,
    FavoriteTemplateResponseDto,
    FavoriteTemplateSearchFilters,
    FavoriteTemplateUpdateModel
} from "../../domain.types/forms/favorite.template.domain.types";
import { IFavoriteTemplateRepo } from "../../database/repository.interfaces/favorite.template/favorite.template.repo.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class FavoriteTemplateService {
    constructor(@inject('IFavoriteTemplateRepo') private _favoriteTemplateRepo: IFavoriteTemplateRepo) {
    }

    create = async (model: FavoriteTemplateCreateModel): Promise<FavoriteTemplateResponseDto> => {
        const dto = await this._favoriteTemplateRepo.create(model);
        return dto;
    };

    update = async (id: string, model: FavoriteTemplateUpdateModel): Promise<FavoriteTemplateResponseDto> => {
        const dto = await this._favoriteTemplateRepo.update(id, model);
        return dto;
    };

    getById = async (id: string): Promise<FavoriteTemplateResponseDto> => {
        const dto = await this._favoriteTemplateRepo.getById(id);
        return dto;
    };

    delete = async (id: string): Promise<boolean> => {
        const dto = await this._favoriteTemplateRepo.delete(id);
        return dto;
    };

    search = async (filters: FavoriteTemplateSearchFilters): Promise<any> => {
        const dto = await this._favoriteTemplateRepo.search(filters);
        return dto;
    };
} 