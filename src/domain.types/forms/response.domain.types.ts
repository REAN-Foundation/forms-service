// import { FormStatus, QueryResponseType } from "../miscellaneous/system.types"

import { FormStatus, QueryResponseType } from "@prisma/client";

export interface ResponseCreateModel {
    FormId: string;
    FormTemplateId: string;
    QuestionId:string;
    ResponseType: QueryResponseType;
    IntegerValue: number;
    FloatValue: GLfloat;
    BooleanValue: boolean;
    DateTimeValue: Date;
    Url: string;
    FileResourceId: string;
    TextValue: string;
    SubmissionTimestamp: Date;
    LastSaveTimestamp: Date
    // CreatedAt: Date;
}

export interface ResponseUpdateModel {
    FormId?: string;
    FormTemplateId?: string;
    QuestionId?:string;
    ResponseType?: QueryResponseType;
    IntegerValue?: number;
    FloatValue?: GLfloat;
    BooleanValue?: boolean;
    DateTimeValue?: Date;
    Url?: string;
    FileResourceId?: string;
    TextValue?: string;
    SubmissionTimestamp?: Date;
    LastSaveTimestamp?: Date
    // CreatedAt?: Date;
}

export interface ResponseResponseDto {
    id:string;
    Forms: {
        id:string;
        TemplateId: string;
        FormUrl: string;
        UserId: string;
        Status: FormStatus;
        SubmissionTimestamp: Date;
        CreatedAt: Date;
    }
    FormTemplates: {
        id:string;
        Title:string;
        Description:string;
        CurrentVersion: number;
        Type:string;
        DisplayCode:string;
        OwnerUserId:string;
        RootSectionId:string;
        DefaultSectionNumbering: boolean
        CreatedAt: Date;
    }
    Questions: {
        id: string;
        Title: string;
        Description: string;
        DisplayCode: string;
        ResponseType: QueryResponseType;
        Score: number;
        CorrectAnswer:string;
        Hint:string;
        TemplateId: string;
        SectionId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
    }
    ResponseType: QueryResponseType;
    IntegerValue: number;
    FloatValue: GLfloat;
    BooleanValue: boolean;
    DateTimeValue: Date;
    Url: string;
    FileResourceId: string;
    TextValue: string;
    SubmissionTimestamp: Date;
    LastSaveTimestamp: Date
}

