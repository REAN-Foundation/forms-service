// import { QueryResponseType } from "../miscellaneous/system.types";

import { QueryResponseType } from "@prisma/client";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

// export interface QuestionOption {
//     Sequence: number;
//     Option: string;
//     ImageUrl: string;
// }

export interface QuestionCreateModel {
    ParentTemplateId: string;
    ParentSectionId: string;
    Title: string;
    Description?: string;
    DisplayCode: string;
    ResponseType: QueryResponseType;
    Score: number;
    CorrectAnswer: string;
    Hint: string;
    Options: string[]; // JSON array of QuestionOption
    // FileResourceId   : string;
    QuestionImageUrl: string;
    RangeMin: number;
    RangeMax: number | null;
}

export interface QuestionUpdateModel {
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    ResponseType?: QueryResponseType;
    Score?: number;
    CorrectAnswer?: string;
    Hint?: string;
    Options?: string[]; // JSON array of QuestionOption
    // FileResourceId  ?: string;
    QuestionImageUrl?: string;
    RangeMin?: number;
    RangeMax?: number;
}

export interface QuestionResponseDto {
    id: string;
    Title: string;
    Description: string;
    DisplayCode?: string;
    ResponseType: QueryResponseType;
    Score: number;
    CorrectAnswer: string;
    Hint: string;
    Options: string[]; // JSON array of QuestionOption
    // FileResourceId  : string;
    QuestionImageUrl: string;
    RangeMin: number;
    RangeMax: number;
    ParentFormSection?: {
        id: string;
        SectionIdentifier: string;
        Title: string;
        Description: string;
        DisplayCode: string;
        Sequence: number;
        ParentSectionId: string;
        CreatedAt: Date;
    };
    ParentFormTemplate?: {
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

export interface QuestionSearchFilters extends BaseSearchFilters {
    id?:string;
    parentTemplateId?: string;
    parentSectionId?: string;
    title?: string;
    description?: string;
    displayCode?: string;
    responseType?: QueryResponseType;
    score?: number;
    correctAnswer?: string;
    hint?: string;
    options?: string[]; // JSON array of QuestionOption
    // FileResourceId   : string;
    questionImageUrl?: string;
    rangeMin?: number;
    rangeMax?: number | null;
}

export interface QuestionSearchResults extends BaseSearchResults {
    Items: QuestionSearchResponseDto[];
}

export interface QuestionSearchResponseDto extends BaseSearchResults{
    id: string;
    Title: string;
    Description: string;
    DisplayCode?: string;
    ResponseType: QueryResponseType;
    Score: number;
    CorrectAnswer: string;
    Hint: string;
    Options: string[]; // JSON array of QuestionOption
    // FileResourceId  : string;
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
