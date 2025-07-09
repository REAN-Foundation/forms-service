import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface InputUnitListCreateModel {
    Name: string;
    Description: string;
    Units: any[]; // Array of units (JSON array)
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