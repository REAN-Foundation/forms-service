import {
    BaseSearchFilters,
    BaseSearchResults,
} from './miscellaneous/base.search.types';

///////////////////////////////////////////////////////////////////////////////////////////////

// User DTOs
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
    // Password: string;
    CreatedAt: Date;
}

export interface UserSearchFilters extends BaseSearchFilters {
    FirstName?: string;
    LastName?: string;
    CountryCode?: number;
    Phone?: string;
    Email?: string;
    Username?: string;
    // Password?: string;
}

export interface UserSearchResults extends BaseSearchResults {
    Items: UserSearchResponseDto[];
}

export interface UserSearchResponseDto {
    id: string;
    FirstName: string;
    LastName: string;
    CountryCode: number;
    Phone: string;
    Email: string;
    Username: string;
    // Password: string;
    CreatedAt: Date;
}
