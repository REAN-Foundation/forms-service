import {
    SkipRuleCreateModel,
    SkipRuleUpdateModel,
    SkipRuleResponseDto,
    RuleSearchFilters,
} from '../../../../domain.types/forms/rule.domain.types';
import { BaseSearchResults } from '../../../../domain.types/miscellaneous/base.search.types';
import { uuid } from '../../../../domain.types/miscellaneous/system.types';

export interface ISkipRuleRepo {
    create(model: SkipRuleCreateModel): Promise<SkipRuleResponseDto>;
    getById(id: uuid): Promise<SkipRuleResponseDto>;
    update(id: uuid, model: SkipRuleUpdateModel): Promise<SkipRuleResponseDto>;
    delete(id: uuid): Promise<boolean>;
    search(filters: RuleSearchFilters): Promise<BaseSearchResults>;
}
