export interface FormTemplateCreateDto {
    Title: String;
    Description: String;
    CurrentVersion: number;
    Type: String;
    DisplayCode: String;
    OwnerUserId: String;
    RootSectionId: String;
    DefaultSectionNumbering: Boolean
}

export interface FormTemplateUpdateDto {
    Title?: String;
    Description?: String;
    CurrentVersion?: number;
    Type?: String;
    DisplayCode?: String;
    OwnerUserId?: String;
    RootSectionId?: String;
    DefaultSectionNumbering?: Boolean
}

export interface FormTemplateResponseDto {
    id: String;
    Title: String;
    Description: String;
    CurrentVersion: number;
    Type: String;
    DisplayCode: String;
    OwnerUserId: String;
    RootSectionId: String;
    DefaultSectionNumbering: Boolean
    CreatedAt: Date;
    UpdatedAt: Date;
}
