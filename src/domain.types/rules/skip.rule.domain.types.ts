import {
    BaseRuleCreateModel,
    BaseRuleResponseDto,
    BaseRuleUpdateModel,
} from './base.rule.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { uuid } from '../miscellaneous/system.types';

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
    OperationId: uuid;
    SkipWhenTrue: boolean;
    LogicId?: uuid;
    Operation?: {
        id: uuid;
        Name?: string;
        Description?: string;
    };
    Logic?: {
        id: uuid;
        Type: string;
        DefaultSkip?: boolean;
    };
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
}

export interface SkipRuleSearchResults extends BaseSearchResults {
    Items: SkipRuleResponseDto[];
}
