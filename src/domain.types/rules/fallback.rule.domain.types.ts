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
    HIDE_FIELD = 'HIDE_FIELD',
    DISABLE_FIELD = 'DISABLE_FIELD',
    REDIRECT = 'REDIRECT',
    CUSTOM = 'CUSTOM',
}

export interface FallbackActionParameters {
    [key: string]: any;
    // Common parameters
    timeout?: number;
    maxRetries?: number;
    redirectUrl?: string;
    customHandler?: string;
    // Field-specific parameters
    fieldValue?: any;
    fieldState?: string;
    // UI parameters
    messageType?: 'info' | 'warning' | 'error' | 'success';
    showDuration?: number;
    // Validation parameters
    validationRules?: any[];
}

// Fallback Rule DTOs
export interface FallbackRuleCreateModel extends BaseRuleCreateModel {
    OperationId: uuid;
    Action: FallbackActionType;
    ActionValue?: string;
    ActionMessage?: string;
    ActionParameters?: FallbackActionParameters;
    ExecutionOrder?: number;
    StopOnSuccess?: boolean;
}

export interface FallbackRuleUpdateModel extends BaseRuleUpdateModel {
    OperationId?: uuid;
    Action?: FallbackActionType;
    ActionValue?: string;
    ActionMessage?: string;
    ActionParameters?: FallbackActionParameters;
    ExecutionOrder?: number;
    StopOnSuccess?: boolean;
}

export interface FallbackRuleResponseDto extends BaseRuleResponseDto {
    Operation: OperationResponseDto;
    OperationId: uuid;
    Action: FallbackActionType;
    ActionValue?: string;
    ActionMessage?: string;
    ActionParameters?: FallbackActionParameters;
    ExecutionOrder: number;
    StopOnSuccess: boolean;
}

// Fallback Rule Search DTOs
export interface FallbackRuleSearchFilters extends BaseSearchFilters {
    Name?: string;
    Description?: string;
    OperationId?: uuid;
    Action?: FallbackActionType;
    ExecutionOrder?: number;
    StopOnSuccess?: boolean;
    OperationType?: OperationType;
}

export interface FallbackRuleSearchResults extends BaseSearchResults {
    Items: FallbackRuleResponseDto[];
}
