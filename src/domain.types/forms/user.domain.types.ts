import {
    BaseSearchFilters,
    BaseSearchResults,
} from '../miscellaneous/base.search.types';

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
    CreatedAt: Date;
}

export interface UserSearchFilters extends BaseSearchFilters {
    firstName?: string;
    lastName?: string;
    countryCode?: number;
    phone?: string;
    email?: string;
    username?: string;
    password?: string;
}

export interface UserSearchResults extends BaseSearchResults {
    Items: UserSearchResponseDto[];
}

export interface UserSearchResponseDto extends BaseSearchResults {
    id: string;
    FirstName: string;
    LastName: string;
    CountryCode: number;
    Phone: string;
    Email: string;
    Username: string;
    Password: string;
    CreatedAt: Date;
}
