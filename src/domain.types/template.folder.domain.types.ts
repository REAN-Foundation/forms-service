import {
    BaseSearchFilters,
    BaseSearchResults,
} from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

// Template Folder DTOs
export interface TemplateFolderCreateModel {
    Name: string;
    Description?: string;
    ParentFolderId?: string;
}

export interface TemplateFolderUpdateModel {
    Name?: string;
    Description?: string;
    ParentFolderId?: string;
}

export interface TemplateFolderResponseDto {
    id: string;
    Name: string;
    Description?: string;
    ParentFolderId?: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface TemplateFolderSearchFilters extends BaseSearchFilters {
    Name?: string;
    ParentFolderId?: uuid;
}

export interface TemplateFolderSearchResults extends BaseSearchResults {
    Items: TemplateFolderResponseDto[];
}
