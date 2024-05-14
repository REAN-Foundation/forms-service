// import { FormType } from "../miscellaneous/system.types";

import { FormType } from "@prisma/client";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface FormTemplateCreateModel {
    Title: string;
    Description: string;
    CurrentVersion: number;
    Type: FormType;
    DisplayCode: string;
    OwnerUserId?: string;
    RootSectionId?: string;
    DefaultSectionNumbering: boolean
}

export interface FormTemplateUpdateModel {
    Title?: string;
    Description?: string;
    CurrentVersion?: number;
    Type?: FormType;
    DisplayCode?: string;
    OwnerUserId?: string;
    RootSectionId?: string;
    DefaultSectionNumbering?: boolean
}

export interface FormTemplateResponseDto {
    id: string;
    Title: string;
    Description: string;
    CurrentVersion: number;
    Type: FormType;
    DisplayCode: string;
    OwnerUserId: string;
    RootSectionId: string;
    DefaultSectionNumbering: boolean
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface FormTemplateSearchFilters extends BaseSearchFilters {
    id?:string;
    title?: string;
    description?: string;
    currentVersion?: number;
    type?: FormType;
    displayCode?: string;
    ownerUserId?: uuid;
    rootSectionId?: uuid;
    defaultSectionNumbering?: boolean
}


export interface FormTemplateSearchResults extends BaseSearchResults {
    Items: FormTemplateSearchResponseDto[];
}

export interface FormTemplateSearchResponseDto extends BaseSearchResults{
    id: string;
    Title: string;
    Description: string;
    CurrentVersion: number;
    Type: FormType;
    DisplayCode: string;
    OwnerUserId: string;
    RootSectionId: string;
    DefaultSectionNumbering: boolean
    CreatedAt: Date;
    UpdatedAt: Date;
}
