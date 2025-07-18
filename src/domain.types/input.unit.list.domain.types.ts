import {
    BaseSearchFilters,
    BaseSearchResults,
} from './miscellaneous/base.search.types';

///////////////////////////////////////////////////////////////////////////////////////////////

// Input Unit List DTOs
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
    Name?: string;
    Description?: string;
    Units?: any[];
}

export interface InputUnitListSearchResults extends BaseSearchResults {
    Items: InputUnitListResponseDto[];
}
