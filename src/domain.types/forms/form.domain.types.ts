import { FormStatus } from "../miscellaneous/system.types";

export interface formCreateDto {
    TemplateId: string;
    FormUrl: string;
    AnsweredByUserId: String;
    Status: FormStatus;
    SubmissionTimestamp: Date;
    CreatedAt: Date;
}

export interface formUpdateDto {
    TemplateId?: string;
    FormUrl?: string;
    AnsweredByUserId?: String;
    Status?: FormStatus;
    SubmissionTimestamp?: Date;
    CreatedAt?: Date;
}

export interface formResponseDto {
    id: String;
    Template: {
        id: String;
        Title: String;
        Description: String;
        CurrentVersion: number;
        Type: String;
        DisplayCode: String;
        OwnerUserId: String;
        RootSectionId: String;
        DefaultSectionNumbering: Boolean
        CreatedAt: Date;
        UpdatedAt: Date;
    }
    FormUrl: string;
    User: {
        id: String;
        FirstName: String;
        LastName: String;
        CountryCode: number;
        Phone: String;
        Email: String;
        Username: String;
    }
    Status: FormStatus;
    SubmissionTimestamp: Date;
    CreatedAt: Date;
}

