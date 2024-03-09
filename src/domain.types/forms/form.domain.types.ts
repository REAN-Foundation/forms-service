// import { FormStatus } from "../miscellaneous/system.types";

import { FormStatus } from "@prisma/client";

export interface FormCreateModel {
    FormTemplateId: string;
    FormUrl: string;
    AnsweredByUserId: string;
    Status: FormStatus;
    // SubmissionTimestamp: Date;
    // CreatedAt: Date;
}

export interface FormUpdateModel {
    FormTemplateId?: string;
    FormUrl?: string;
    AnsweredByUserId?: string;
    Status?: FormStatus;
    // SubmissionTimestamp?: Date;
    // CreatedAt?: Date;
}

export interface FormResponseDto {
    id: string;
    FormTemplateId:string,
    FormTemplate: {
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
    }
    FormUrl: string;
    // AnsweresByUserId:string;
    Users: {
        id: string;
        FirstName: string;
        LastName: string;
        CountryCode: number;
        Phone: string;
        Email: string;
        Username: string;
    }
    Status: string;
    SubmissionTimestamp: Date;
    CreatedAt: Date;
}

