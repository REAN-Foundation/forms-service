import {
    BaseLogicCreateModel,
    BaseLogicResponseDto,
    BaseLogicUpdateModel,
} from './base.logic.domain.types';
import { CalculationRuleResponseDto } from '../rules/calculation.rule.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { LogicType } from '../enums/logic.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export interface CalculationLogicCreateModel extends BaseLogicCreateModel {
    FallbackValue?: string;
}

export interface CalculationLogicUpdateModel extends BaseLogicUpdateModel {
    FallbackValue?: string;
}

export interface CalculationLogicResponseDto extends BaseLogicResponseDto {
    FallbackValue?: string;
    Type: LogicType.Calculation;
    Rules?: CalculationRuleResponseDto[];
}

export interface CalculationLogicSearchFilters extends BaseSearchFilters {
    FallbackValue?: string;
    Enabled?: boolean;
    FieldId?: string;
}

export interface CalculationLogicSearchResults extends BaseSearchResults {
    Items: CalculationLogicResponseDto[];
}