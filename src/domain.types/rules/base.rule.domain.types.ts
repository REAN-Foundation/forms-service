// Base Rule DTOs
export interface BaseRuleCreateModel {
    Name?: string;
    Description?: string;
    Priority?: number;
    IsActive?: boolean;
}

export interface BaseRuleUpdateModel {
    Name?: string;
    Description?: string;
    Priority?: number;
    IsActive?: boolean;
}

export interface BaseRuleResponseDto {
    id: string;
    Name?: string;
    Description?: string;
    Priority?: number;
    IsActive?: boolean;
    CreatedAt: Date;
    UpdatedAt?: Date;
}