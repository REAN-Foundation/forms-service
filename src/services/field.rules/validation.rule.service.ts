import { inject, injectable } from 'tsyringe';
import { ValidationRuleCreateModel, ValidationRuleUpdateModel, ValidationRuleResponseDto, RuleSearchFilters } from '../../domain.types/forms/rule.domain.types';
import { IValidationRuleRepo } from '../../database/repository.interfaces/field.rules/validation.rule/validation.rule.repo.interface';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { BaseSearchResults } from '../../domain.types/miscellaneous/base.search.types';

@injectable()
export class ValidationRuleService {
    constructor(
        @inject('IValidationRuleRepo') private _repo: IValidationRuleRepo,
    ) {}

    createValidationRule = async (model: ValidationRuleCreateModel): Promise<ValidationRuleResponseDto> => {
        return await this._repo.create(model);
    };

    getValidationRuleById = async (id: uuid): Promise<ValidationRuleResponseDto> => {
        return await this._repo.getById(id);
    };

    updateValidationRule = async (id: uuid, model: ValidationRuleUpdateModel): Promise<ValidationRuleResponseDto> => {
        return await this._repo.update(id, model);
    };

    deleteValidationRule = async (id: uuid): Promise<boolean> => {
        return await this._repo.delete(id);
    };

    searchValidationRule = async (filters: RuleSearchFilters): Promise<BaseSearchResults> => {
        return await this._repo.search(filters);
    };
} 