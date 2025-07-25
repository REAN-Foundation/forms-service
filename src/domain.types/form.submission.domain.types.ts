import {
    BaseSearchFilters,
    BaseSearchResults,
} from './miscellaneous/base.search.types';
import { FormStatus } from './enums/form.submission.enums';
import { FormType } from './enums/form.template.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

// Form Submission DTOs
export interface FormSubmissionCreateModel {
    FormTemplateId: string;
    UserId?: string;
    Title?: string;
    Encrypted?: string;
    Unencrypted?: string;
    Link?: string;
    LinkQueryParams?: LinkQueryParams;
    ValidTill?: Date;
    SubmittedAt?: Date;
    Status?: FormStatus;
    Category: FormType;
}

export interface LinkQueryParams {
    id?: string;
    UserId?: string;
    Category?: string;
    ExpiresOn?: Date;
}

export interface FormSubmissionUpdateModel {
    UserId?: string;
    FormTemplateId?: string;
    Encrypted?: string;
    Unencrypted?: string;
    Link?: string;
    QueryParams?: LinkQueryParams;
    LinkQueryParams?: string;
    ValidTill?: Date;
    SubmittedAt?: Date;
    Status?: FormStatus;
    Category?: FormType;
}

export interface FormSubmissionDto {
    id?: string;
    FormTemplateId?: string;
    UserId?: string;
    Title?: string;
    Encrypted?: string;
    Unencrypted?: string;
    Link?: string;
    LinkQueryParams?: LinkQueryParams;
    SubmittedAt?: Date;
    ValidTill?: Date;
    Status?: string;
    Category?: FormType;
}

export interface FormSubmissionSearchFilters extends BaseSearchFilters {
    FormTemplateId?: string;
    UserId?: string;
    Encrypted?: string;
    Status?: FormStatus;
    ValidTill?: Date;
    SubmittedAt?: Date;
}

export interface FormSubmissionSearchResults extends BaseSearchResults {
    Items: FormSubmissionSearchResponseDto[];
}

export interface FormSubmissionSearchResponseDto extends BaseSearchResults {
    id: string;
    ParentFormTemplateId: string;
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
        UpdatedAt: Date;
    };
    FormUrl: string;
    AnsweredByUserId?: string;
    Status: string;
    SubmissionTimestamp: Date;
    CreatedAt: Date;
    UpdatedAt: Date;
}
