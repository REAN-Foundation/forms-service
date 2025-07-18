import {
    BaseLogicCreateModel,
    BaseLogicResponseDto,
    BaseLogicUpdateModel,
} from './base.logic.domain.types';
import { CalculationRuleResponseDto } from '../rules/calculation.rule.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export interface CalculationLogicCreateModel extends BaseLogicCreateModel {
    // Type: LogicType.Calculation;
    FallbackValue?: string;
}

export interface CalculationLogicUpdateModel extends BaseLogicUpdateModel {
    // Type?: LogicType.Calculation;
    FallbackValue?: string;
}

export interface CalculationLogicResponseDto extends BaseLogicResponseDto {
    // Type: LogicType.Calculation;
    FallbackValue?: string;
    Rules?: CalculationRuleResponseDto[];
}

// id: string;
// CreatedAt: Date;
// UpdatedAt ?: Date;
// DeletedAt ?: Date;

// FieldId: string;
// Enabled: boolean;

// Type: LogicType.Calculation;
// FallbackValue: string;

export interface CalculationLogicSearchFilters extends BaseSearchFilters {
    FallbackValue?: string;
    Enabled?: boolean;
    FieldId?: string;
}

export interface CalculationLogicSearchResults extends BaseSearchResults {
    Items: CalculationLogicResponseDto[];
}