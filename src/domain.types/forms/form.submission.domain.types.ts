import { FormStatus } from "@prisma/client";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface FormSubmissionCreateModel {
    FormTemplateId: string;
    FormUrl: string;
    AnsweredByUserId: string;
    Status: FormStatus;
}

// Only status will be updated
export interface FormSubmissionUpdateModel {
    Status?: FormStatus;
    AnsweredByUserId:string;
}

export interface FormSubmissionResponseDto {
    id: string;
    ParentFormTemplateId: string,
    ParentFormTemplate: {
        id: string;
        Title: string;
        Description: string;
        CurrentVersion: number;
        Type: string;
        DisplayCode: string;
        OwnerUserId: string;
        RootSectionId: string;
        DefaultSectionNumbering: boolean
        CreatedAt: Date;
        UpdatedAt: Date;
    };
    // Submitter: {
    //     id: string;
    //     FirstName: string;
    //     LastName: string;
    //     Phone: string;
    //     Email: string;
    //     UserName: string
    //     CountryCode: string
    // }
    FormUrl: string;
    AnsweredByUserId?: string;
    Status: string;
    SubmissionTimestamp: Date;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface FormSubmissionSearchFilters extends BaseSearchFilters {
    id?:string
    formTemplateId?: string;
    formUrl?: string;
    answeredByUserId?: string;
    status?: FormStatus;
    submissionTimestamp?:Date;
}

export interface FormSubmissionSearchResults extends BaseSearchResults {
    Items: FormSubmissionSearchResponseDto[];
}

export interface FormSubmissionSearchResponseDto extends BaseSearchResults{
    id: string;
    ParentFormTemplateId: string,
    ParentFormTemplate: {
        id: string;
        Title: string;
        Description: string;
        CurrentVersion: number;
        Type: string;
        DisplayCode: string;
        OwnerUserId: string;
        RootSectionId: string;
        DefaultSectionNumbering: boolean
        CreatedAt: Date;
        UpdatedAt: Date;
    };
    FormUrl: string;
    AnsweredByUserId?: string;
    Status: string;
    SubmissionTimestamp: Date;
    CreatedAt: Date;
    UpdatedAt: Date;
}
