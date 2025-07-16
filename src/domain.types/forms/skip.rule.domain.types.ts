import {
    BaseRuleCreateModel,
    BaseRuleResponseDto,
    BaseRuleUpdateModel,
} from './rule.domain.types';
import { BaseSearchFilters } from '../miscellaneous/base.search.types';

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

// Skip Rule Search DTOs
export interface SkipRuleSearchFilters extends BaseSearchFilters {
    id?: string;
    name?: string;
    description?: string;
    priority?: number;
    isActive?: boolean;
    operationId?: string;
    logicId?: string;
}
