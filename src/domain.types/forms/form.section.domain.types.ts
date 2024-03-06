export interface FormSectionCreateModel {
    TemplateId: string;
    SectionIdentifier: string;
    Title: string;
    Description: string;
    DisplayCode: string;
    Sequence: string;
    ParentSectionId: string;
    // CreatedAt: Date;
}

export interface FormSectionUpdateModel {
    SectionIdentifier?: string;
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    Sequence?: string;
    ParentSectionId?: string;
    // CreatedAt?: Date;
}

export interface FormSectionResponseDto {
    id: string;
    FormTemplates: {
        id: string;
        Title: string;
        Description: string;
        CurrentVersion: number;
        Type: string;
        DisplayCode: string;
        OwnerUserId: string;
        RootSectionId: string;
        DefaultSectionNumbering: Boolean
    }
    // TemplateId:string;
    SectionIdentifier: number;
    Title: string;
    Description: string;
    DisplayCode: string;
    Sequence: string;
    ParentSectionId: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}
