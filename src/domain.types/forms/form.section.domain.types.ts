export interface FormSectionCreateDto {
    TemplateId:string;
    SectionIdentifier: number;
    Title: String;
    Description: String;
    DisplayCode: String;
    Sequence: String;
    ParentSectionId: String;
    CreatedAt: Date;
}

export interface FormSectionUpdateDto {
    SectionIdentifier?: number;
    Title?: String;
    Description?: String;
    DisplayCode?: String;
    Sequence?: String;
    ParentSectionId?: String;
    CreatedAt?: Date;
}

export interface FormSectionResponseDto {
    id: String;
    Template: {
        id: string;
        Title: String;
        Description: String;
        CurrentVersion: number;
        Type: String;
        DisplayCode: String;
        OwnerUserId: String;
        RootSectionId: String;
        DefaultSectionNumbering: Boolean
    }
    SectionIdentifier: number;
    Title: String;
    Description: String;
    DisplayCode: String;
    Sequence: String;
    ParentSectionId: String;
    CreatedAt: Date;
    UpdatedAt: Date;
}
