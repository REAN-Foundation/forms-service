import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { LogicType } from "./logic.enums";

// Base Logic DTOs
export interface BaseLogicCreateModel {
    Type: LogicType;
    FieldId: string; // UUID foreign key to FormFieldEntity
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface BaseLogicUpdateModel {
    Type?: LogicType;
    FieldId?: string; // UUID foreign key to FormFieldEntity
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface BaseLogicResponseDto {
    id: string;
    Type: LogicType;
    FieldId: string; // UUID foreign key to FormFieldEntity
    Enabled: boolean;
    DefaultSkip?: boolean;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

// Skip Logic DTOs
export interface SkipLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType.Skip;
    FieldId: string; // UUID foreign key to FormFieldEntity
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface SkipLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Skip;
    FieldId?: string; // UUID foreign key to FormFieldEntity
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface SkipLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Skip;
    Rules?: SkipRuleResponseDto[];
}

// Calculation Logic DTOs
export interface CalculationLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType.Calculation;
    FieldId: string; // UUID foreign key to FormFieldEntity
    Enabled?: boolean;
    DefaultSkip?: boolean;
    FallbackValue?: string;
}

export interface CalculationLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Calculation;
    FieldId?: string; // UUID foreign key to FormFieldEntity
    Enabled?: boolean;
    DefaultSkip?: boolean;
    FallbackValue?: string;
}

export interface CalculationLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Calculation;
    FallbackValue?: string;
    Rules?: CalculationRuleResponseDto[];
}

// Validation Logic DTOs
export interface ValidationLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType.Validation;
    FieldId: string; // UUID foreign key to FormFieldEntity
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface ValidationLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Validation;
    FieldId?: string; // UUID foreign key to FormFieldEntity
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface ValidationLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Validation;
    
    Rules?: ValidationRuleResponseDto[];
}

// Logic Search DTOs
export interface LogicSearchFilters extends BaseSearchFilters {
    id?: string;
    type?: LogicType;
    fieldId?: string; // UUID foreign key to FormFieldEntity
    enabled?: boolean;
    defaultSkip?: boolean;
}

export interface LogicSearchResults extends BaseSearchResults {
    Items: LogicSearchResponseDto[];
}

export interface LogicSearchResponseDto extends BaseSearchResults {
    id: string;
    Type: LogicType;
    FieldId: string; // UUID foreign key to FormFieldEntity
    Enabled: boolean;
    DefaultSkip?: boolean;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

// Import rule DTOs (these will be defined in rule.domain.types.ts)
export interface SkipRuleResponseDto {
    id: string;
    OperationId: string;
    SkipWhenTrue: boolean;
    LogicId?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export interface CalculationRuleResponseDto {
    id: string;
    OperationId: string;
    LogicId?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export interface ValidationRuleResponseDto {
    id: string;
    OperationId: string;
    LogicId?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
} 