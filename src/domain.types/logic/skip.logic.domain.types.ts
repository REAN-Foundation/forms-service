import {
    BaseLogicCreateModel,
    BaseLogicResponseDto,
    BaseLogicUpdateModel,
} from './base.logic.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { SkipRuleResponseDto } from '../rules/skip.rule.domain.types';
import { LogicType } from '../enums/logic.enums';

export interface SkipLogicCreateModel extends BaseLogicCreateModel {
    DefaultSkip?: boolean;
}

export interface SkipLogicUpdateModel extends BaseLogicUpdateModel {
    DefaultSkip?: boolean;
}

export interface SkipLogicResponseDto extends BaseLogicResponseDto {
    DefaultSkip?: boolean;
    Type: LogicType.Skip;
    Rules?: SkipRuleResponseDto[];
}

export interface SkipLogicSearchFilters extends BaseSearchFilters {
    DefaultSkip?: boolean;
    Enabled?: boolean;
    FieldId?: string;
}

export interface SkipLogicSearchResults extends BaseSearchResults {
    Items: SkipLogicResponseDto[];
}