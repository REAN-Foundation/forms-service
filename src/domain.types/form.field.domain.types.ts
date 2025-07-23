import { QueryResponseType } from './query.response.types';
import {
    BaseSearchFilters,
    BaseSearchResults,
} from './miscellaneous/base.search.types';

export interface FormFieldOption {
    Text: string;
    Sequence: number;
    ImageUrl?: string;
}

export interface FormFieldCreateModel {
    ParentTemplateId: string;
    ParentSectionId: string;
    Title: string;
    Description?: string;
    DisplayCode: string;
    ResponseType: QueryResponseType;
    Score?: number;
    Sequence?: number;
    CorrectAnswer?: string;
    IsRequired: boolean;
    Hint?: string;
    Options?: FormFieldOption[];
    ImageResourceId?: string;
    RangeMin?: number;
    RangeMax?: number;
    DefaultExpectedUnit?: string;
    PageBreakAfter?: boolean;
}

export interface FormFieldUpdateModel {
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    ResponseType?: QueryResponseType;
    Score?: number;
    CorrectAnswer?: string;
    IsRequired?: boolean;
    Hint?: string;
    Options?: FormFieldOption[];
    ImageResourceId?: string;
    RangeMin?: number;
    RangeMax?: number;
    DefaultExpectedUnit?: string;
    PageBreakAfter?: boolean;
}

export interface FormFieldResponseDto {
    id: string;
    ParentTemplateId: string;
    ParentSectionId: string;
    Title: string;
    Description?: string;
    DisplayCode: string;
    ResponseType: QueryResponseType;
    Score?: number;
    Sequence: number;
    CorrectAnswer?: string;
    IsRequired: boolean;
    Hint?: string;
    Options?: FormFieldOption[];
    ImageResourceId?: string;
    RangeMin?: number;
    RangeMax?: number;
    DefaultExpectedUnit?: string;
    PageBreakAfter: boolean;
    ParentFormSection?: {
        id: string;
        Title: string;
        Description?: string;
        DisplayCode: string;
        Sequence: number;
        ParentSectionId?: string;
        CreatedAt: Date;
    };
    FormTemplate?: {
        id: string;
        Title: string;
        Description?: string;
        Version: string;
        Type: string;
        DisplayCode: string;
        OwnerUserId: string;
        RootSectionId?: string;
        DefaultSectionNumbering: boolean;
        CreatedAt: Date;
    };
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export interface FormFieldSearchFilters extends BaseSearchFilters {
    ParentTemplateId?: string;
    ParentSectionId?: string;
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    ResponseType?: QueryResponseType;
    Score?: number;
    CorrectAnswer?: string;
    IsRequired?: boolean;
    DefaultExpectedUnit?: string;
}

export interface FormFieldSearchResults extends BaseSearchResults {
    Items: FormFieldResponseDto[];
}
