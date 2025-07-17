import {
    BaseSearchFilters,
    BaseSearchResults,
} from '../miscellaneous/base.search.types';

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

// Skip Rule DTOs
export interface SkipRuleCreateModel extends BaseRuleCreateModel {
    OperationId: string;
    SkipWhenTrue: boolean;
    LogicId?: string;
}

export interface SkipRuleUpdateModel extends BaseRuleUpdateModel {
    OperationId?: string;
    SkipWhenTrue?: boolean;
    LogicId?: string;
}

export interface SkipRuleResponseDto extends BaseRuleResponseDto {
    OperationId: string;
    SkipWhenTrue: boolean;
    LogicId?: string;
    Operation?: {
        id: string;
        Name?: string;
        Description?: string;
    };
    Logic?: {
        id: string;
        Type: string;
        DefaultSkip?: boolean;
    };
}

// Calculation Rule DTOs
export interface CalculationRuleCreateModel extends BaseRuleCreateModel {
    ConditionForOperationId?: string;
    OperationId: string;
    LogicId?: string;
}

export interface CalculationRuleUpdateModel extends BaseRuleUpdateModel {
    ConditionForOperationId?: string;
    OperationId?: string;
    LogicId?: string;
}

export interface CalculationRuleResponseDto extends BaseRuleResponseDto {
    ConditionForOperationId?: string;
    OperationId: string;
    LogicId?: string;
    ConditionForOperation?: {
        id: string;
        Name?: string;
        Description?: string;
    };
    Operation?: {
        id: string;
        Name?: string;
        Description?: string;
    };
    Logic?: {
        id: string;
        Type: string;
        DefaultSkip?: boolean;
        FallbackValue?: string;
    };
}

// Validation Rule DTOs
export interface ValidationRuleCreateModel extends BaseRuleCreateModel {
    OperationId: string;
    ErrorWhenFalse: boolean;
    ErrorMessage: string;
    LogicId?: string;
}

export interface ValidationRuleUpdateModel extends BaseRuleUpdateModel {
    OperationId?: string;
    ErrorWhenFalse?: boolean;
    ErrorMessage?: string;
    LogicId?: string;
}

export interface ValidationRuleResponseDto extends BaseRuleResponseDto {
    OperationId: string;
    ErrorWhenFalse: boolean;
    ErrorMessage: string;
    LogicId?: string;
    Operation?: {
        id: string;
        Name?: string;
        Description?: string;
    };
    Logic?: {
        id: string;
        Type: string;
        DefaultSkip?: boolean;
    };
}

export interface RuleSearchFilters extends BaseSearchFilters {
    id?: string;
    name?: string;
    description?: string;
    priority?: number;
    isActive?: boolean;
    operationId?: string;
    logicId?: string;
}

export interface RuleSearchResults extends BaseSearchResults {
    Items: RuleSearchResponseDto[];
}

export interface RuleSearchResponseDto extends BaseSearchResults {
    id: string;
    Name?: string;
    Description?: string;
    Priority?: number;
    IsActive?: boolean;
    OperationId?: string;
    LogicId?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
}
