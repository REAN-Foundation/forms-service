import {
    FavoriteTemplateCreateModel,
    FavoriteTemplateResponseDto,
    FavoriteTemplateSearchFilters,
    FavoriteTemplateUpdateModel,
} from '../../../domain.types/forms/favorite.template.domain.types';

export interface IFavoriteTemplateRepo {
    create(
        model: FavoriteTemplateCreateModel
    ): Promise<FavoriteTemplateResponseDto>;

    update(
        id: string,
        model: FavoriteTemplateUpdateModel
    ): Promise<FavoriteTemplateResponseDto>;

    getById(id: string): Promise<FavoriteTemplateResponseDto>;

    delete(id: string): Promise<boolean>;

    search(filters: FavoriteTemplateSearchFilters): Promise<any>;
}
