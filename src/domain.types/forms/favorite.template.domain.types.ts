import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface FavoriteTemplateCreateModel {
    UserId: string;
    TemplateId: string;
}

export interface FavoriteTemplateUpdateModel {
    UserId?: string;
    TemplateId?: string;
}

export interface FavoriteTemplateResponseDto {
    id: string;
    UserId: string;
    TemplateId: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface FavoriteTemplateSearchFilters extends BaseSearchFilters {
    id?: string;
    UserId?: uuid;
    TemplateId?: uuid;
}

export interface FavoriteTemplateSearchResults extends BaseSearchResults {
    Items: FavoriteTemplateResponseDto[];
} 