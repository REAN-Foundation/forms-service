// import { QueryResponseType } from "../miscellaneous/system.types";

import { QueryResponseType } from "@prisma/client";

export interface QuestionCreateModel {
    TemplateId: string;
    SectionId: string;
    Title: string;
    Description?: string;
    DisplayCode: string;
    ResponseType: QueryResponseType;
    Score: number;
    CorrectAnswer: string;
    Hint: string;
}

export interface QuestionUpdateModel {
    TemplateId?: string;
    SectionId?: string;
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    ResponseType?: QueryResponseType;
    Score?: number;
    CorrectAnswer?: string;
    Hint?: string;
}

export interface QuestionResponseDto {
    id: string;
    Title: string;
    Description: string;
    DisplayCode: string;
    ResponseType: string;
    Score: number;
    CorrectAnswer: string;
    Hint: string;
    FormTemplates: {
        id: string;
        Title: string;
        CurrentVersion: string;
        Type: string;
        DisplayCode: string;
        OwnerUserId: string;
        RootSectionId: string;
        DefaultSectionNumbering: Boolean;
        CreatedAt: Date
    };
    FormSections: {
        id: string;
        SectionIdentifier: string;
        Title: string;
        Description: string;
        DisplayCode: string;
        Sequence: number;
        ParentSectionId: string;
        CreatedAt: Date
    }
    CreatedAt: Date;
    UpdatedAt: Date;
}
