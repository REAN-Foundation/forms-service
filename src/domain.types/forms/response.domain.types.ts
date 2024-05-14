// import { FormStatus, QueryResponseType } from "../miscellaneous/system.types"

import { FormStatus, QueryResponseType } from "@prisma/client";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

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

export interface QuestionResponseSearchFilters extends BaseSearchFilters {
    formSubmissionId?: string;
    questionId      ?: string;
    responseType    ?: QueryResponseType;
    integerValue    ?: number;
    floatValue      ?: GLfloat;
    // BooleanValue    ?: boolean;
    booleanValue    ?: string;
    dateTimeValue   ?: Date;
    url             ?: string;
    fileResourceId  ?: string;
    textValue       ?: string;
}


export interface QuestionResponseSearchResults extends BaseSearchResults {
    Items: QuestionResponseSearchResponseDto[];
}

export interface QuestionResponseSearchResponseDto extends BaseSearchResults{
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
