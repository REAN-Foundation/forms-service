import { RuleType } from '../enums/rule.enums';
import { uuid } from '../miscellaneous/system.types';
import { CalculationRuleResponseDto } from './calculation.rule.domain.types';
import { SkipRuleResponseDto } from './skip.rule.domain.types';
import { ValidationRuleResponseDto } from './validation.rule.domain.types';
import { FallbackRuleResponseDto } from './fallback.rule.domain.types';
import { Operation } from '../operations/base.operation.domain.types';
import { OperationType } from '../enums/operation.enums';

// Base Rule DTOs
export interface BaseRuleCreateModel {
    Name?: string;
    Description?: string;
    OperationType: OperationType;
}

export interface BaseRuleUpdateModel {
    Name?: string;
    Description?: string;
    OperationType?: OperationType;
}

export interface BaseRuleResponseDto {
    id: uuid;
    Name?: string;
    Description?: string;
    RuleType: RuleType;
    OperationType: OperationType;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export type RuleResponseDto = SkipRuleResponseDto | CalculationRuleResponseDto | ValidationRuleResponseDto | FallbackRuleResponseDto;

export interface BaseRule {
    id: string;
    Name: string;
    Description?: string;
}

export interface SkipRule extends BaseRule {
    Operation: Operation;           // When should we consider skipping?
    SkipWhenTrue: boolean;         // Skip field if condition evaluates to true (or false)
}

export interface CalculationRule extends BaseRule {
    ConditionForOperation?: Operation;         // Optional: When should this calculation apply?
    Operation: Operation;         // What value should be calculated?
}

export interface ValidationRule extends BaseRule {
    Operation: Operation;           // What should be validated?
    ErrorWhenFalse: boolean;         // Show error when expression is false (typical) or true
    ErrorMessage: string;            // Error message to show when validation fails
}

export interface FallbackRule extends BaseRule {
    Operation: Operation;           // When should this fallback action be triggered?
    Action: string;                 // What action to take (SET_DEFAULT, SHOW_MESSAGE, etc.)
    ActionValue?: string;           // The value to set or the message to show
    ActionMessage?: string;         // User-friendly message for the action
    ActionParameters?: any;         // Additional parameters for complex actions
    ExecutionOrder: number;         // Order in which fallback actions should be executed
    StopOnSuccess: boolean;         // Whether to stop executing other fallback rules if this one succeeds
}