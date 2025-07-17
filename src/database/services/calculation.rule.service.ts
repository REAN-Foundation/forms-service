import { inject, injectable } from 'tsyringe';
import {
    CalculationRuleCreateModel,
    CalculationRuleUpdateModel,
    CalculationRuleResponseDto,
    RuleSearchFilters,
} from '../../domain.types/forms/rule.domain.types';
import { ICalculationRuleRepo } from '../../database/repository.interfaces/field.rules/calculation.rule/calculation.rule.repo.interface';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { BaseSearchResults } from '../../domain.types/miscellaneous/base.search.types';

@injectable()
export class CalculationRuleService {
    constructor(
        @inject('ICalculationRuleRepo') private _repo: ICalculationRuleRepo
    ) {}

    createCalculationRule = async (
        model: CalculationRuleCreateModel
    ): Promise<CalculationRuleResponseDto> => {
        return await this._repo.create(model);
    };

    getCalculationRuleById = async (
        id: uuid
    ): Promise<CalculationRuleResponseDto> => {
        return await this._repo.getById(id);
    };

    updateCalculationRule = async (
        id: uuid,
        model: CalculationRuleUpdateModel
    ): Promise<CalculationRuleResponseDto> => {
        return await this._repo.update(id, model);
    };

    deleteCalculationRule = async (id: uuid): Promise<boolean> => {
        return await this._repo.delete(id);
    };

    searchCalculationRule = async (
        filters: RuleSearchFilters
    ): Promise<BaseSearchResults> => {
        return await this._repo.search(filters);
    };
}
