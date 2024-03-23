import { FormStatus } from "@prisma/client";

export interface FormSubmissionCreateModel {
    FormTemplateId  : string;
    FormUrl         : string;
    AnsweredByUserId: string;
    Status          : FormStatus;
}

// Only status will be updated
export interface FormSubmissionUpdateModel {
    Status ?: FormStatus;
}

export interface FormSubmissionResponseDto {
    id                  : string;
    ParentFormTemplateId: string,
    ParentFormTemplate  : {
        id                     : string;
        Title                  : string;
        Description            : string;
        CurrentVersion         : number;
        Type                   : string;
        DisplayCode            : string;
        OwnerUserId            : string;
        RootSectionId          : string;
        DefaultSectionNumbering: boolean
        CreatedAt              : Date;
        UpdatedAt              : Date;
    }
    FormUrl             : string;
    AnsweredByUserId   ?: string;
    Status              : string;
    SubmissionTimestamp : Date;
    CreatedAt           : Date;
}
