export interface FormSectionCreateModel {
    ParentFormTemplateId: string;
    SectionIdentifier   : string;
    Title               : string;
    Description         : string;
    DisplayCode         : string;
    Sequence            : string;
    ParentSectionId     : string;
}

export interface FormSectionUpdateModel {
    SectionIdentifier?: string;
    Title            ?: string;
    Description      ?: string;
    DisplayCode      ?: string;
    Sequence         ?: string;
    ParentSectionId  ?: string;
}

export interface FormSectionResponseDto {
    id                : string;
    ParentFormTemplate: {
        id                     : string;
        Title                  : string;
        Description            : string;
        CurrentVersion         : number;
        Type                   : string;
        DisplayCode            : string;
        OwnerUserId            : string;
        RootSectionId          : string;
        DefaultSectionNumbering: Boolean
    }
    SectionIdentifier: number;
    Title            : string;
    Description      : string;
    DisplayCode      : string;
    Sequence         : string;
    ParentSectionId  : string;
    CreatedAt        : Date;
    UpdatedAt        : Date;
}
