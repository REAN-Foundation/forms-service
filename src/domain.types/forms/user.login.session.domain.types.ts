export interface IFormSectionCreateDto {
    UserId: string;
}

export interface IFormSectionUpdateDto {
    UserId: string;
}

export interface IFormSectionResponseDto {
    id: string;
    User: {
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
