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

export enum FallbackActionType {
    SET_DEFAULT = 'SET_DEFAULT',
    SHOW_MESSAGE = 'SHOW_MESSAGE',
    SKIP_FIELD = 'SKIP_FIELD',
    RETRY = 'RETRY',
    CLEAR_FIELD = 'CLEAR_FIELD',
    DISABLE_FIELD = 'DISABLE_FIELD',
}

export interface FallbackActionParameters {
    retryCount?: number;
    timeout?: number;
    delay?: number;
    maxAttempts?: number;
    customSettings?: Record<string, any>;
}

// Fallback Rule DTOs
export interface FallbackRuleCreateModel extends BaseRuleCreateModel {
    Priority?: number;
    IsActive?: boolean;
    Action: FallbackActionType;
    ActionMessage?: string;
    ActionParameters?: FallbackActionParameters;
}

export interface FallbackRuleUpdateModel extends BaseRuleUpdateModel {
    Priority?: number;
    IsActive?: boolean;
    Action?: FallbackActionType;
    ActionMessage?: string;
    ActionParameters?: FallbackActionParameters;
}

export interface FallbackRuleResponseDto extends BaseRuleResponseDto {
    Operation: OperationResponseDto;
    Priority?: number;
    IsActive?: boolean;
    Action: FallbackActionType;
    ActionMessage?: string;
    ActionParameters?: FallbackActionParameters;
}

// Fallback Rule Search DTOs
export interface FallbackRuleSearchFilters extends BaseSearchFilters {
    Name?: string;
    Description?: string;
    Priority?: number;
    IsActive?: boolean;
    BaseOperationId?: string;
    Action?: FallbackActionType;
    OperationType?: OperationType;
}

export interface FallbackRuleSearchResults extends BaseSearchResults {
    Items: FallbackRuleResponseDto[];
}