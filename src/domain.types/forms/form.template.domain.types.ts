// import { FormType } from "../miscellaneous/system.types";

import { FormType, ItemsPerPage, QueryResponseType } from "@prisma/client";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";
import { QuestionOption } from "./question.domain.types";

export interface FormTemplateCreateModel {
    Title: string;
    Description?: string;
    CurrentVersion?: number;
    TenantCode?: string;
    Type: FormType;
    ItemsPerPage: ItemsPerPage;
    DisplayCode?: string;
    OwnerUserId?: string;
    RootSectionId?: string;
    DefaultSectionNumbering: boolean
}

export interface FormTemplateUpdateModel {
    Title?: string;
    Description?: string;
    CurrentVersion?: number;
    TenantCode?: string;
    Type?: FormType;
    ItemsPerPage?: ItemsPerPage;
    RootSectionId?: string;
}

export interface FormTemplateResponseDto {
    id: string;
    Title: string;
    Description: string;
    CurrentVersion: number;
    TenantCode: string;
    Type: FormType;
    ItemsPerPage: ItemsPerPage;
    DisplayCode: string;
    OwnerUserId: string;
    RootSectionId: string;
    DefaultSectionNumbering: boolean
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface FormTemplateSearchFilters extends BaseSearchFilters {
    id?: string;
    Title?: string;
    Description?: string;
    CurrentVersion?: number;
    TenantCode: string;
    Type?: FormType;
    DisplayCode?: string;
    OwnerUserId?: uuid;
    RootSectionId?: uuid;
    DefaultSectionNumbering?: boolean
}


export interface FormTemplateSearchResults extends BaseSearchResults {
    Items: FormTemplateSearchResponseDto[];
}

export interface FormTemplateSearchResponseDto extends BaseSearchResults {
    id: string;
    Title: string;
    Description: string;
    CurrentVersion: number;
    TenantCode: string;
    Type: FormType;
    DisplayCode: string;
    OwnerUserId: string;
    RootSectionId: string;
    DefaultSectionNumbering: boolean
    CreatedAt: Date;
    UpdatedAt: Date;
}


export interface ExportFormTemplateDto {
    Sections: any;
    Template: TemplateDto;
}

export interface TemplateDto extends FormTemplateResponseDto {
    Sections: SectionDto[];
}

export interface SectionDto {
    id: string;
    SectionIdentifier: string;
    Title: string;
    Description: string;
    DisplayCode: string;
    Sequence: string;
    ParentSectionId: string | null;
    CreatedAt: Date;
    UpdatedAt: Date;
    Questions: QuestionDto[];
    Subsections: SubsectionDto[];
}

export interface SubsectionDto {
    id: string;
    SectionIdentifier: string;
    Title: string;
    Description: string;
    DisplayCode: string;
    Sequence: string;
    ParentSectionId: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    Questions: QuestionDto[];
}

export interface QuestionDto {
    id: string;
    Title: string;
    Description?: string;
    DisplayCode: string | null;
    ResponseType: QueryResponseType;
    Score: number;
    Sequence: string;
    CorrectAnswer: string;
    Hint: string;
    Options: QuestionOption[];
    QuestionImageUrl: string;
    RangeMin: number;
    RangeMax: number | null;
    CreatedAt: Date;
    UpdatedAt?: Date;
}



// {
//     Template: {
//         Sections: [
//             {
//                 Subsections:[
//                     {
//                         Questions: []
//                     },
//                     {
//                         Questions: []
//                     },
//                     {
//                         Questions: []
//                     }
//                    ]
//                }
//             ],
//                 Questions: []
//             },

//         ]
//     }
// }

export interface SectionPreviewDto {
    id: string;
    SectionIdentifier: string;
    Title: string;
    Description: string;
    DisplayCode: string;
    Sequence: string;
    ParentSectionId: string | null;
    CreatedAt: Date;
    UpdatedAt: Date;
    Questions: QuestionDto[];
    Sections: SubsectionDto[];
}

export interface TemplatePreviewDto {
    id: string;
    Title: string;
    Description: string;
    CurrentVersion: number;
    TenantCode: string;
    Type: FormType;
    ItemsPerPage: ItemsPerPage;
    DisplayCode: string;
    OwnerUserId: string;
    RootSectionId: string;
    DefaultSectionNumbering: boolean
    CreatedAt: Date;
    UpdatedAt: Date;
    RootSection: SectionPreviewDto[];
}