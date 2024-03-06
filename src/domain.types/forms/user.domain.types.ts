export interface UserCreateModel {
    FirstName: string;
    LastName: string;
    CountryCode: number;
    Phone: string;
    Email: string;
    Username: string;
    Password: string;
}

export interface UserUpdateModel {
    FirstName?: string;
    LastName?: string;
    CountryCode?: number;
    Phone?: string;
    Email?: string;
    Username?: string;
    Password?: string;
}

export interface UserResponseDto {
    id: string;
    FirstName: string;
    LastName: string;
    CountryCode: number;
    Phone: string;
    Email: string;
    Username: string;
    Password: string;
    CreatedAt: Date
}
