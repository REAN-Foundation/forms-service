import {
    BaseSearchFilters,
    BaseSearchResults,
} from '../miscellaneous/base.search.types';

export interface InputUnitListCreateModel {
    Name: string;
    Description: string;
    Units: any[];
}

export interface InputUnitListUpdateModel {
    Name?: string;
    Description?: string;
    Units?: any[];
}

export interface InputUnitListResponseDto {
    id: string;
    Name: string;
    Description: string;
    Units: any[];
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface InputUnitListSearchFilters extends BaseSearchFilters {
    id?: string;
    Name?: string;
}

export interface InputUnitListSearchResults extends BaseSearchResults {
    Items: InputUnitListResponseDto[];
}
