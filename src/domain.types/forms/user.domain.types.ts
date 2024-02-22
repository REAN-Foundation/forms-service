export interface UserCreateDto {
    FirstName: string;
    LastName: string;
    CountryCode: number;
    Phone: String;
    Email: String;
    Username: String;
    Password: String;
}

export interface UserUpdateDto {
    FirstName?: string;
    LastName?: string;
    CountryCode?: number;
    Phone?: String;
    Email?: String;
    Username?: String;
    Password?: String;
}

export interface UserResponseDto {
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
