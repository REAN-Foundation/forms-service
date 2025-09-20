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

export interface CalculationRuleSettings {
    DecimalPlaces?: number;
    RoundingMethod?: string;
    AutoUpdate?: boolean;
    ShowFormula?: boolean;
    AllowManualOverride?: boolean;
    NumberFormat?: string;
}

export enum RuleOutcomeType {
    StaticValue = 'StaticValue',
    FunctionExpression = 'FunctionExpression',
}

export enum OutcomeDataType {
    Float = 'Float',
    Integer = 'Integer',
    Boolean = 'Boolean',
    Text = 'Text',
    DateTime = 'DateTime',
    Location = 'Location',
}

export interface RuleOutcome {
    Type: RuleOutcomeType;
    StaticValue?: any;
    DataType?: OutcomeDataType;
    FunctionExpression?: string;
    FunctionExpressionId?: uuid;
}
// Calculation Rule DTOs
export interface CalculationRuleCreateModel extends BaseRuleCreateModel {
    BaseOperationId: uuid;
    OperationId?: uuid;
    LogicId?: uuid;
    Settings?: CalculationRuleSettings;
    RuleOutcome?: RuleOutcome;
    FallbackRuleId?: uuid;
}

export interface CalculationRuleUpdateModel extends BaseRuleUpdateModel {
    BaseOperationId?: uuid;
    OperationId?: uuid;
    LogicId?: uuid;
    Settings?: CalculationRuleSettings;
    RuleOutcome?: RuleOutcome;
    FallbackRuleId?: uuid;
}

export interface CalculationRuleResponseDto extends BaseRuleResponseDto {
    Operation: OperationResponseDto;
    BaseOperationId: uuid;
    ErrorWhenFalse?: boolean;
    ErrorMessage?: string;
    OperationId?: uuid;
    LogicId?: uuid;
    Settings?: CalculationRuleSettings;
    RuleOutcome?: RuleOutcome;
    FallbackRuleId?: uuid;
    FallbackRule?: any;
}

// Calculation Rule Search DTOs
export interface CalculationRuleSearchFilters extends BaseSearchFilters {
    Name?: string;
    Description?: string;
    Priority?: number;
    IsActive?: boolean;
    BaseOperationId?: uuid;
    OperationId?: uuid;
    LogicId?: uuid;
    FallbackRuleId?: uuid;
    ValidationRuleId?: uuid;
    SkipRuleId?: uuid;
    OperationType?: OperationType;
    Settings?: CalculationRuleSettings;
    RuleOutcome?: RuleOutcome;
}

export interface CalculationRuleSearchResults extends BaseSearchResults {
    Items: CalculationRuleResponseDto[];
}
