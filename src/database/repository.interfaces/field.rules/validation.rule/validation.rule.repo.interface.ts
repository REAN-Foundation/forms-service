import { ValidationRuleCreateModel, ValidationRuleUpdateModel, ValidationRuleResponseDto, RuleSearchFilters } from '../../../../domain.types/forms/rule.domain.types';
import { BaseSearchResults } from '../../../../domain.types/miscellaneous/base.search.types';
import { uuid } from '../../../../domain.types/miscellaneous/system.types';

export interface IValidationRuleRepo {
    create(model: ValidationRuleCreateModel): Promise<ValidationRuleResponseDto>;
    getById(id: uuid): Promise<ValidationRuleResponseDto>;
    update(id: uuid, model: ValidationRuleUpdateModel): Promise<ValidationRuleResponseDto>;
    delete(id: uuid): Promise<boolean>;
    search(filters: RuleSearchFilters): Promise<BaseSearchResults>;
} 