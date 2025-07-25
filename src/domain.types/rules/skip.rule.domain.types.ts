import {
    BaseRuleCreateModel,
    BaseRuleResponseDto,
    BaseRuleUpdateModel,
} from './base.rule.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { uuid } from '../miscellaneous/system.types';
import { OperationResponseDto } from '../operations/base.operation.domain.types';
import { RuleType } from '../enums/rule.enums';
import { OperationType } from '../enums/operation.enums';

// Skip Rule DTOs
export interface SkipRuleCreateModel extends BaseRuleCreateModel {
    OperationId: uuid;
    SkipWhenTrue: boolean;
    LogicId?: uuid;
}

export interface SkipRuleUpdateModel extends BaseRuleUpdateModel {
    OperationId?: uuid;
    SkipWhenTrue?: boolean;
    LogicId?: uuid;
}

export interface SkipRuleResponseDto extends BaseRuleResponseDto {
    ConditionForOperationId?: uuid;
    Operation: OperationResponseDto;
    ErrorMessage?: string;
    ErrorWhenFalse?: boolean;
    OperationId: uuid;
    SkipWhenTrue: boolean;
    LogicId?: uuid;
}

// Skip Rule Search DTOs
export interface SkipRuleSearchFilters extends BaseSearchFilters {
    id?: uuid;
    Name?: string;
    Description?: string;
    Priority?: number;
    IsActive?: boolean;
    OperationId?: uuid;
    LogicId?: uuid;
    SkipWhenTrue?: boolean;
    OperationType?: OperationType;
}

export interface SkipRuleSearchResults extends BaseSearchResults {
    Items: SkipRuleResponseDto[];
}
