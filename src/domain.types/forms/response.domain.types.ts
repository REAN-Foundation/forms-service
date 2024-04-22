// import { FormStatus, QueryResponseType } from "../miscellaneous/system.types"

import { FormStatus, QueryResponseType } from "@prisma/client";

export interface QuestionResponseCreateModel {
    FormSubmissionId: string;
    QuestionId      : string;
    ResponseType    : QueryResponseType;
    IntegerValue    : number;
    FloatValue      : GLfloat;
    // BooleanValue    : boolean;
    BooleanValue    : string;
    DateTimeValue   : Date;
    Url             : string;
    FileResourceId  : string;
    TextValue       : string;
}

export interface QuestionResponseUpdateModel {
    FormSubmissionId?: string;
    QuestionId      ?: string;
    ResponseType    ?: QueryResponseType;
    IntegerValue    ?: number;
    FloatValue      ?: GLfloat;
    // BooleanValue    ?: boolean;
    BooleanValue    ?: string;
    DateTimeValue   ?: Date;
    Url             ?: string;
    FileResourceId  ?: string;
    TextValue       ?: string;
}

export interface QuestionResponseResponseDto {
    id            : string;
    FormSubmission: {
        id                 : string;
        TemplateId         : string;
        FormUrl            : string;
        UserId             : string;
        Status             : FormStatus;
        SubmissionTimestamp: Date;
        CreatedAt          : Date;
    }
    Question: {
        id           : string;
        Title        : string;
        Description  : string;
        DisplayCode  : string;
        ResponseType : QueryResponseType;
        Score        : number;
        CorrectAnswer: string;
        Hint         : string;
        TemplateId   : string;
        SectionId    : string;
        CreatedAt    : Date;
        UpdatedAt    : Date;
    }
    ResponseType       : QueryResponseType;
    IntegerValue       : number;
    FloatValue         : GLfloat;
    // BooleanValue       : boolean;
    BooleanValue       ?: string;
    DateTimeValue      : Date;
    Url                : string;
    FileResourceId     : string;
    TextValue          : string;
    SubmissionTimestamp: Date;
    LastSaveTimestamp  : Date
}
