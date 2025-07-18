import {
    BaseLogicCreateModel,
    BaseLogicResponseDto,
    BaseLogicUpdateModel,
} from './base.logic.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { SkipRuleResponseDto } from '../rules/skip.rule.domain.types';

export interface SkipLogicCreateModel extends BaseLogicCreateModel {
    // Type: LogicType.Skip;
    DefaultSkip?: boolean;
}

export interface SkipLogicUpdateModel extends BaseLogicUpdateModel {
    // Type?: LogicType.Skip;
    DefaultSkip?: boolean;
}

export interface SkipLogicResponseDto extends BaseLogicResponseDto {
    // Type: LogicType.Skip;
    DefaultSkip?: boolean;
    Rules?: SkipRuleResponseDto[];
}

export interface SkipLogicSearchFilters extends BaseSearchFilters {
    Enabled?: boolean;
    FieldId?: string;
    DefaultSkip?: boolean;
}

export interface SkipLogicSearchResults extends BaseSearchResults {
    Items: SkipLogicResponseDto[];
}