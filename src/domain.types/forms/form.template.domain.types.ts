import { FormType } from "../miscellaneous/system.types";

export interface IFormTemplateCreateDto {
    Title: String;
    Description: String;
    CurrentVersion: number;
    Type: FormType;
    DisplayCode: String;
    OwnerUserId: String;
    RootSectionId: String;
    DefaultSectionNumbering: Boolean
}

export interface IFormTemplateUpdateDto {
    Title?: String;
    Description?: String;
    CurrentVersion?: number;
    Type?: FormType;
    DisplayCode?: String;
    OwnerUserId?: String;
    RootSectionId?: String;
    DefaultSectionNumbering?: Boolean
}

export interface IFormTemplateResponseDto {
    id: String;
    Title: String;
    Description: String;
    CurrentVersion: number;
    Type: FormType;
    DisplayCode: String;
    OwnerUserId: String;
    RootSectionId: String;
    DefaultSectionNumbering: Boolean
    CreatedAt: Date;
    UpdatedAt: Date;
}


