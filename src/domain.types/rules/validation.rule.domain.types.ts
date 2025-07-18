import {
    BaseRuleCreateModel,
    BaseRuleResponseDto,
    BaseRuleUpdateModel,
} from './base.rule.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { uuid } from '../miscellaneous/system.types';

// Validation Rule DTOs
export interface ValidationRuleCreateModel extends BaseRuleCreateModel {
    OperationId: uuid;
    ErrorWhenFalse: boolean;
    ErrorMessage: string;
    LogicId?: uuid;
}

export interface ValidationRuleUpdateModel extends BaseRuleUpdateModel {
    OperationId?: uuid;
    ErrorWhenFalse?: boolean;
    ErrorMessage?: string;
    LogicId?: uuid;
}

export interface ValidationRuleResponseDto extends BaseRuleResponseDto {
    OperationId: uuid;
    ErrorWhenFalse: boolean;
    ErrorMessage: string;
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

// Validation Rule Search DTOs
export interface ValidationRuleSearchFilters extends BaseSearchFilters {
    id?: uuid;
    Name?: string;
    Description?: string;
    Priority?: number;
    IsActive?: boolean;
    OperationId?: uuid;
    LogicId?: uuid;
    ErrorWhenFalse?: boolean;
    ErrorMessage?: string;
}

export interface ValidationRuleSearchResults extends BaseSearchResults {
    Items: ValidationRuleResponseDto[];
}