import { BaseRuleCreateModel, BaseRuleResponseDto, BaseRuleUpdateModel } from "./rule.domain.types";
import { BaseSearchFilters } from "../miscellaneous/base.search.types";

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

// Validation Rule Search DTOs
export interface ValidationRuleSearchFilters extends BaseSearchFilters {
    id?: string;
    name?: string;
    description?: string;
    priority?: number;
    isActive?: boolean;
    operationId?: string;
    logicId?: string;
} 