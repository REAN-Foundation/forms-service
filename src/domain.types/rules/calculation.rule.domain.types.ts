import {
    BaseRuleCreateModel,
    BaseRuleResponseDto,
    BaseRuleUpdateModel,
} from './base.rule.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { uuid } from '../miscellaneous/system.types';
import { OperationResponseDto } from '../operations/base.operation.domain.types';
import { OperationType } from '../enums/operation.enums';

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
    // Operation: OperationResponseDto;
    // ConditionForOperationId?: uuid;
    // ConditionForOperation?: OperationResponseDto;
    // LogicId?: uuid;
    // ErrorMessage?: string;
    // ErrorWhenFalse?: boolean;
    // OperationId: uuid;
    Operation: OperationResponseDto;
    ConditionForOperationId?: uuid;
    ConditionForOperation?: OperationResponseDto;
    ErrorWhenFalse?: boolean;
    ErrorMessage?: string;
    LogicId?: uuid;
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
    OperationType?: OperationType;
}

export interface CalculationRuleSearchResults extends BaseSearchResults {
    Items: CalculationRuleResponseDto[];
}
