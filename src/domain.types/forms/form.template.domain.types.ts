// import { FormType } from "../miscellaneous/system.types";

import { FormType } from "@prisma/client";

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

