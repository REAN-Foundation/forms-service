export interface FormSectionCreateDto {
    FirstName: string;
    LastName: string;
    CountryCode: number;
    Phone: String;
    Email: String;
    Username: String;
    Password: String;
}

export interface FormSectionUpdateDto {
    FirstName?: string;
    LastName?: string;
    CountryCode?: number;
    Phone?: String;
    Email?: String;
    Username?: String;
    Password?: String;
}

export interface FormSectionResponseDto {
    id: string;
    FirstName: string;
    LastName: string;
    CountryCode: number;
    Phone: String;
    Email: String;
    Username: String;
    Password: String;
    CreatedAt: Date
}
