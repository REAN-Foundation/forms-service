import {
    BaseLogicCreateModel,
    BaseLogicResponseDto,
    BaseLogicUpdateModel,
} from './base.logic.domain.types';
import { ValidationRuleResponseDto } from '../rules/validation.rule.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { LogicType } from '../enums/logic.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

// Validation Logic DTOs
export interface ValidationLogicCreateModel extends BaseLogicCreateModel {
    // Type: LogicType.Validation;
}

export interface ValidationLogicUpdateModel extends BaseLogicUpdateModel {
    // Type?: LogicType.Validation;
}

export interface ValidationLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Validation;
    Rules: ValidationRuleResponseDto[];
}

export interface ValidationLogicSearchFilters extends BaseSearchFilters {
    // ErrorWhenFalse?: boolean;
    Enabled?: boolean;
    FieldId?: string;
}

export interface ValidationLogicSearchResults extends BaseSearchResults {
    Items: ValidationLogicResponseDto[];
}
