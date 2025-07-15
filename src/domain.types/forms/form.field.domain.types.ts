import { QueryResponseType } from "./query.response.types";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface FormFieldOption {
    Text: string;
    Sequence: string;
    ImageUrl: string;
}

export interface FormFieldCreateModel {
    ParentTemplateId: string;
    ParentSectionId: string;
    Title?: string;
    Description?: string;
    DisplayCode: string;
    ResponseType: QueryResponseType;
    Score?: number;
    Sequence?: number;
    CorrectAnswer: string;
    IsRequired?: boolean;
    Hint: string;
    Options?: FormFieldOption[];
    QuestionImageUrl: string;
    RangeMin: number;
    RangeMax: number | null;
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
    QuestionImageUrl?: string;
    RangeMin?: number;
    RangeMax?: number;
}

export interface FormFieldResponseDto {
    id: string;
    Title: string;
    Description?: string;
    DisplayCode: string | null;
    ResponseType: QueryResponseType;
    Score: number;
    Sequence: string;
    CorrectAnswer: string;
    IsRequired?: boolean;
    Hint: string;
    Options: FormFieldOption[];
    QuestionImageUrl: string;
    RangeMin: number;
    RangeMax: number | null;
    ParentFormSection?: {
        id: string;
        SectionIdentifier: string;
        Title: string;
        Description?: string;
        DisplayCode: string;
        Sequence: string;
        ParentSectionId: string;
        CreatedAt: Date;
    };
    ParentFormTemplate?: {
        id: string;
        Title: string;
        Description?: string;
        CurrentVersion: string;
        Type: string;
        DisplayCode: string;
        OwnerUserId: string;
        RootSectionId: string;
        DefaultSectionNumbering: string;
        CreatedAt: Date;
    };
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export interface FormFieldSearchFilters extends BaseSearchFilters {
    id?: string;
    parentTemplateId?: string;
    parentSectionId?: string;
    title?: string;
    description?: string;
    displayCode?: string;
    responseType?: QueryResponseType;
    score?: number;
    correctAnswer?: string;
    isRequired?: boolean;
    hint?: string;
    options?: FormFieldOption[];
    questionImageUrl?: string;
    rangeMin?: number;
    rangeMax?: number | null;
}

export interface FormFieldSearchResults extends BaseSearchResults {
    Items: FormFieldSearchResponseDto[];
}

export interface FormFieldSearchResponseDto extends BaseSearchResults {
    id: string;
    Title: string;
    Description: string;
    DisplayCode?: string;
    ResponseType: QueryResponseType;
    Score: number;
    Sequence: string;
    CorrectAnswer: string;
    IsRequired?: boolean;
    Hint: string;
    Options: FormFieldOption;
    QuestionImageUrl: string;
    RangeMin: number;
    RangeMax: number;
    ParentFormSection: {
        id: string;
        SectionIdentifier: string;
        Title: string;
        Description: string;
        DisplayCode: string;
        Sequence: number;
        ParentSectionId: string;
        CreatedAt: Date;
    };
    ParentFormTemplate: {
        id: string;
        Title: string;
        Description: string;
        CurrentVersion: number;
        Type: string;
        DisplayCode: string;
        OwnerUserId: string;
        RootSectionId: string;
        DefaultSectionNumbering: boolean;
        CreatedAt: Date;
    };
    CreatedAt: Date;
    UpdatedAt: Date;
} 