import { FormStatus } from './form.submission.enums';
import { QueryResponseType } from './query.response.types';
import {
    BaseSearchFilters,
    BaseSearchResults,
} from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';

export interface QuestionResponseCreateModel {
    FormSubmissionId: string;
    QuestionId: string;
    ResponseType: QueryResponseType;
    IntegerValue: number;
    FloatValue: number;
    BooleanValue: string;
    DateTimeValue: Date;
    Url: string;
    FileResourceId: string;
    TextValue: string;
    UserResponse: string;
}

export interface QuestionResponseUpdateModel {
    id?: string;
    FormSubmissionId?: string;
    QuestionId?: string;
    ResponseType?: QueryResponseType;
    IntegerValue?: number;
    FloatValue?: number;
    BooleanValue?: string;
    DateTimeValue?: Date;
    Url?: string;
    FileResourceId?: string;
    TextValue?: string;
    UserResponse?: string;
}

export interface QuestionResponseSaveModel {
    QuestionResponses: QuestionResponseUpdateModel[];
    FormSubmissionKey: string;
}

export interface QuestionResponseResponseDto {
    id: string;
    FormSubmission?: {
        id: string;
        TemplateId: string;
        FormUrl: string;
        UserId: string;
        Status: FormStatus;
        SubmissionTimestamp: Date;
        CreatedAt: Date;
    };
    Question?: {
        id: string;
        Title: string;
        Description: string;
        DisplayCode: string;
        ResponseType: QueryResponseType;
        Score: number;
        CorrectAnswer: string;
        Hint: string;
        TemplateId: string;
        SectionId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
    };
    ResponseType: QueryResponseType;
    IntegerValue: number;
    FloatValue: GLfloat;
    BooleanValue?: string;
    DateTimeValue: Date;
    Url: string;
    FileResourceId: string;
    TextValue: string;
    SubmissionTimestamp: Date;
    LastSaveTimestamp: Date;
}

export interface QuestionResponseSearchFilters extends BaseSearchFilters {
    FormSubmissionId?: uuid;
    QuestionId?: uuid;
    ResponseType?: QueryResponseType;
    IntegerValue?: number;
    FloatValue?: GLfloat;
    BooleanValue?: string;
    DateTimeValue?: Date;
    Url?: string;
    FileResourceId?: uuid;
    TextValue?: string;
}

export interface QuestionResponseSearchResults extends BaseSearchResults {
    Items: QuestionResponseSearchResponseDto[];
}

export interface QuestionResponseSearchResponseDto extends BaseSearchResults {
    id: string;
    FormSubmission: {
        id: string;
        TemplateId: string;
        FormUrl: string;
        UserId: string;
        Status: FormStatus;
        SubmissionTimestamp: Date;
        CreatedAt: Date;
    };
    Question: {
        id: string;
        Title: string;
        Description: string;
        DisplayCode: string;
        ResponseType: QueryResponseType;
        Score: number;
        CorrectAnswer: string;
        Hint: string;
        TemplateId: string;
        SectionId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
    };
    ResponseType: QueryResponseType;
    IntegerValue: number;
    FloatValue: GLfloat;
    BooleanValue?: string;
    DateTimeValue: Date;
    Url: string;
    FileResourceId: string;
    TextValue: string;
    SubmissionTimestamp: Date;
    LastSaveTimestamp: Date;
}
