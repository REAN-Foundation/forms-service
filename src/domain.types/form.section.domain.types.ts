import {
    BaseSearchFilters,
    BaseSearchResults,
} from './miscellaneous/base.search.types';

///////////////////////////////////////////////////////////////////////////////////////////////

// Form Section DTOs
export interface FormSectionCreateModel {
    ParentFormTemplateId: string;
    SectionIdentifier?: string;
    Title?: string;
    Description?: string;
    DisplayCode: string;
    Sequence?: number;
    ParentSectionId?: string;
}

///////////////////////////////////////////////////////////////////////////////////////////////

export interface FormSectionUpdateModel {
    SectionIdentifier?: string;
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    Sequence?: string;
    ParentSectionId?: string;
}

export interface FormSectionResponseDto {
    id: string;
    FormTemplateId: string;
    SectionIdentifier: string;
    Title: string;
    Description: string;
    DisplayCode: string;
    Sequence: string;
    ParentSectionId: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface FormSectionSearchFilters extends BaseSearchFilters {
    ParentFormTemplateId?: string;
    SectionIdentifier?: string;
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    Sequence?: string;
    ParentSectionId?: string;
}

export interface FormSectionSearchResults extends BaseSearchResults {
    Items: FormSectionSearchResponseDto[];
}

export interface FormSectionSearchResponseDto extends BaseSearchResults {
    id: string;
    ParentFormTemplate: {
        id: string;
        Title: string;
        Description: string;
        CurrentVersion: number;
        Type: string;
        DisplayCode: string;
        OwnerUserId: string;
        RootSectionId: string;
        DefaultSectionNumbering: Boolean;
    };
    SectionIdentifier: string;
    Title: string;
    Description: string;
    DisplayCode: string;
    Sequence: string;
    ParentSectionId: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}
