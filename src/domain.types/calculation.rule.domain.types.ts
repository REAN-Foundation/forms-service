import {
    BaseRuleCreateModel,
    BaseRuleResponseDto,
    BaseRuleUpdateModel,
} from './rule.domain.types';
import { BaseSearchFilters } from '../miscellaneous/base.search.types';

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

// Calculation Rule Search DTOs
export interface CalculationRuleSearchFilters extends BaseSearchFilters {
    id?: string;
    name?: string;
    description?: string;
    priority?: number;
    isActive?: boolean;
    operationId?: string;
    logicId?: string;
}
