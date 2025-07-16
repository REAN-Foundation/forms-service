import {
    CalculationRuleCreateModel,
    CalculationRuleUpdateModel,
    CalculationRuleResponseDto,
    RuleSearchFilters,
} from '../../../../domain.types/forms/rule.domain.types';
import { BaseSearchResults } from '../../../../domain.types/miscellaneous/base.search.types';
import { uuid } from '../../../../domain.types/miscellaneous/system.types';

export interface ICalculationRuleRepo {
    create(
        model: CalculationRuleCreateModel
    ): Promise<CalculationRuleResponseDto>;
    getById(id: uuid): Promise<CalculationRuleResponseDto>;
    update(
        id: uuid,
        model: CalculationRuleUpdateModel
    ): Promise<CalculationRuleResponseDto>;
    delete(id: uuid): Promise<boolean>;
    search(filters: RuleSearchFilters): Promise<BaseSearchResults>;
}
