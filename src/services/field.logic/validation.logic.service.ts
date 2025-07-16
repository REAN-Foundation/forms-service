import { inject, injectable } from 'tsyringe';
import { IValidationLogicRepo } from '../../database/repository.interfaces/field.logic/validation.logic/validation.logic.repo.interface';
import {
    ValidationLogicResponseDto,
    ValidationLogicCreateModel,
    ValidationLogicUpdateModel,
    LogicSearchFilters,
} from '../../domain.types/forms/logic.domain.types';

@injectable()
export class ValidationLogicService {
    constructor(
        @inject('IValidationLogicRepo')
        private _validationLogicRepo: IValidationLogicRepo
    ) {}

    // Validation Logic operations
    async createValidationLogic(
        model: ValidationLogicCreateModel
    ): Promise<ValidationLogicResponseDto> {
        return await this._validationLogicRepo.createValidationLogic(model);
    }

    async updateValidationLogic(
        id: string,
        model: ValidationLogicUpdateModel
    ): Promise<ValidationLogicResponseDto> {
        return await this._validationLogicRepo.updateValidationLogic(id, model);
    }

    async getValidationLogicById(
        id: string
    ): Promise<ValidationLogicResponseDto> {
        return await this._validationLogicRepo.getValidationLogicById(id);
    }

    async deleteValidationLogic(id: string): Promise<boolean> {
        return await this._validationLogicRepo.deleteValidationLogic(id);
    }

    async searchValidationLogic(filters: LogicSearchFilters): Promise<any> {
        return await this._validationLogicRepo.searchValidationLogic(filters);
    }
}
