export interface FormSectionCreateDto {
    UserId: string;
}

export interface FormSectionUpdateDto {
    UserId: string;
}

export interface FormSectionResponseDto {
    id: string;
    user: {
        FirstName: string;
        LastName: string;
        CountryCode: number;
        Phone: String;
        Email: String;
        Username: String;
        Password: String;
        CreatedAt: Date
    }
    IsActiveSession: boolean;
    StartedAt: Date;
    ValidTill: Date;
}
