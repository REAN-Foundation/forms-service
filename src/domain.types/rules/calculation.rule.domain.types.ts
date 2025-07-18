import {
    BaseRuleCreateModel,
    BaseRuleResponseDto,
    BaseRuleUpdateModel,
} from './base.rule.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { uuid } from '../miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

// Calculation Rule DTOs
export interface CalculationRuleCreateModel extends BaseRuleCreateModel {
    ConditionForOperationId?: uuid;
    OperationId: uuid;
    LogicId?: uuid;
}

export interface CalculationRuleUpdateModel extends BaseRuleUpdateModel {
    ConditionForOperationId?: uuid;
    OperationId?: uuid;
    LogicId?: uuid;
}

export interface CalculationRuleResponseDto extends BaseRuleResponseDto {
    ConditionForOperationId?: uuid;
    OperationId: uuid;
    LogicId?: uuid;
    ConditionForOperation?: {
        id: uuid;
        Name?: string;
        Description?: string;
    };
    Operation?: {
        id: uuid;
        Name?: string;
        Description?: string;
    };
    Logic?: {
        id: uuid;
        Type: string;
        DefaultSkip?: boolean;
        FallbackValue?: string;
    };
}

// Calculation Rule Search DTOs
export interface CalculationRuleSearchFilters extends BaseSearchFilters {
    Name?: string;
    Description?: string;
    Priority?: number;
    IsActive?: boolean;
    OperationId?: uuid;
    LogicId?: uuid;
    ValidationRuleId?: uuid;
    SkipRuleId?: uuid;
}

export interface CalculationRuleSearchResults extends BaseSearchResults {
    Items: CalculationRuleResponseDto[];
}
