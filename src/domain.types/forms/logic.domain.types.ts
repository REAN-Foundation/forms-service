import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { LogicType } from "../../database/sql/typeorm/models/logic/logic.types";

// Base Logic DTOs
export interface BaseLogicCreateModel {
    Type: LogicType;
    DefaultSkip?: boolean;
}

export interface BaseLogicUpdateModel {
    Type?: LogicType;
    DefaultSkip?: boolean;
}

export interface BaseLogicResponseDto {
    id: string;
    Type: LogicType;
    DefaultSkip?: boolean;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

// Skip Logic DTOs
export interface SkipLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType.Skip;
    DefaultSkip?: boolean;
}

export interface SkipLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Skip;
    DefaultSkip?: boolean;
}

export interface SkipLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Skip;
    Rules?: SkipRuleResponseDto[];
}

// Calculation Logic DTOs
export interface CalculationLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType.Calculation;
    DefaultSkip?: boolean;
    FallbackValue?: string;
}

export interface CalculationLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Calculation;
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
    DefaultSkip?: boolean;
}

export interface ValidationLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Validation;
    DefaultSkip?: boolean;
}

export interface ValidationLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Validation;
    Rules?: ValidationRuleResponseDto[];
}

// Legacy Logic DTOs
export interface LegacyLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType;
    DefaultSkip?: boolean;
}

export interface LegacyLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType;
    DefaultSkip?: boolean;
}

export interface LegacyLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType;
    Rules?: LegacyRuleResponseDto[];
}

// Logic Search DTOs
export interface LogicSearchFilters extends BaseSearchFilters {
    id?: string;
    type?: LogicType;
    defaultSkip?: boolean;
}

export interface LogicSearchResults extends BaseSearchResults {
    Items: LogicSearchResponseDto[];
}

export interface LogicSearchResponseDto extends BaseSearchResults {
    id: string;
    Type: LogicType;
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

export interface LegacyRuleResponseDto {
    id: string;
    OperationId: string;
    LogicId?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
} 