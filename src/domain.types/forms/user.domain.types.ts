export interface IUserCreateDto {
    FirstName: string;
    LastName: string;
    CountryCode: number;
    Phone: String;
    Email: String;
    Username: String;
    Password: String;
}

export interface IUserUpdateDto {
    FirstName?: string;
    LastName?: string;
    CountryCode?: number;
    Phone?: String;
    Email?: String;
    Username?: String;
    Password?: String;
}

export interface IUserResponseDto {
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
