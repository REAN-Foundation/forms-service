import { inject, injectable } from 'tsyringe';
import {
    SkipRuleCreateModel,
    SkipRuleUpdateModel,
    SkipRuleResponseDto,
    RuleSearchFilters,
} from '../../domain.types/forms/rule.domain.types';
import { ISkipRuleRepo } from '../../database/repository.interfaces/field.rules/skip.rule/skip.rule.repo.interface';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { BaseSearchResults } from '../../domain.types/miscellaneous/base.search.types';

@injectable()
export class SkipRuleService {
    constructor(@inject('ISkipRuleRepo') private _repo: ISkipRuleRepo) {}

    createSkipRule = async (
        model: SkipRuleCreateModel
    ): Promise<SkipRuleResponseDto> => {
        return await this._repo.create(model);
    };

    getSkipRuleById = async (id: uuid): Promise<SkipRuleResponseDto> => {
        return await this._repo.getById(id);
    };

    updateSkipRule = async (
        id: uuid,
        model: SkipRuleUpdateModel
    ): Promise<SkipRuleResponseDto> => {
        return await this._repo.update(id, model);
    };

    deleteSkipRule = async (id: uuid): Promise<boolean> => {
        return await this._repo.delete(id);
    };

    searchSkipRule = async (
        filters: RuleSearchFilters
    ): Promise<BaseSearchResults> => {
        return await this._repo.search(filters);
    };
}
