import {
    BaseSearchFilters,
    BaseSearchResults,
} from '../miscellaneous/base.search.types';
import { LogicType } from './logic.enums';

export interface BaseLogicCreateModel {
    Type: LogicType;
    FieldId: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface BaseLogicUpdateModel {
    Type?: LogicType;
    FieldId?: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface BaseLogicResponseDto {
    id: string;
    Type: LogicType;
    FieldId: string;
    Enabled: boolean;
    DefaultSkip?: boolean;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export interface SkipLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType.Skip;
    FieldId: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface SkipLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Skip;
    FieldId?: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface SkipLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Skip;
    Rules?: SkipRuleResponseDto[];
}

export interface CalculationLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType.Calculation;
    FieldId: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
    FallbackValue?: string;
}

export interface CalculationLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Calculation;
    FieldId?: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
    FallbackValue?: string;
}

export interface CalculationLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Calculation;
    FallbackValue?: string;
    Rules?: CalculationRuleResponseDto[];
}

export interface ValidationLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType.Validation;
    FieldId: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface ValidationLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Validation;
    FieldId?: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface ValidationLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Validation;

    Rules?: ValidationRuleResponseDto[];
}

export interface LogicSearchFilters extends BaseSearchFilters {
    id?: string;
    type?: LogicType;
    fieldId?: string;
    enabled?: boolean;
    defaultSkip?: boolean;
}

export interface LogicSearchResults extends BaseSearchResults {
    Items: LogicSearchResponseDto[];
}

export interface LogicSearchResponseDto extends BaseSearchResults {
    id: string;
    Type: LogicType;
    FieldId: string;
    Enabled: boolean;
    DefaultSkip?: boolean;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export interface SkipRuleResponseDto {
    id: string;
    OperationId: string;
    SkipWhenTrue: boolean;
    LogicId?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export interface CalculationRuleResponseDto {
    id: string;
    OperationId: string;
    LogicId?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export interface ValidationRuleResponseDto {
    id: string;
    OperationId: string;
    LogicId?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
}
