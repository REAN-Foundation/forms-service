import { QueryResponseType } from "../miscellaneous/system.types";

export interface QuestionCreateDto {
    TemplateId: string;
    SectionId: string;
    Title: string;
    Description?: string;
    DisplayCode: string;
    ResponseType: QueryResponseType;
    Score: number;
    CorrectAnswer: String;
    Hint: String;
}

export interface QuestionUpdateDto {
    TemplateId?: string;
    SectionId?: string;
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    ResponseType?: QueryResponseType;
    Score?: number;
    CorrectAnswer?: String;
    Hint?: String;
}

export interface QuestionResponseDto {
    id: string;
    Title: string;
    Description: string;
    DisplayCode: string;
    ResponseType: QueryResponseType;
    Score: number;
    CorrectAnswer: String;
    Hint: String;
    Template: {
        id: string;
        Title: string;
        CurrentVersion: string;
        Type: String;
        DisplayCode: String;
        OwnerUserId: String;
        RootSectionId: String;
        DefaultSectionNumbering: Boolean;
        CreatedAt: Date
    };
    Section: {
        id: string;
        SectionIdentifier: String;
        Title: String;
        Description: String;
        DisplayCode: String;
        Sequence: number;
        ParentSectionId: String;
        CreatedAt: Date
    }
    CreatedAt: Date;
    UpdatedAt: Date;
}
