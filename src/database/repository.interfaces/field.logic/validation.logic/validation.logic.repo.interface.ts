import {
    ValidationLogicResponseDto,
    ValidationLogicCreateModel,
    ValidationLogicUpdateModel,
    LogicSearchFilters,
} from '../../../../domain.types/forms/logic.domain.types';

export interface IValidationLogicRepo {
    // Validation Logic operations
    createValidationLogic(
        model: ValidationLogicCreateModel
    ): Promise<ValidationLogicResponseDto>;
    updateValidationLogic(
        id: string,
        model: ValidationLogicUpdateModel
    ): Promise<ValidationLogicResponseDto>;
    getValidationLogicById(id: string): Promise<ValidationLogicResponseDto>;
    deleteValidationLogic(id: string): Promise<boolean>;
    searchValidationLogic(filters: LogicSearchFilters): Promise<any>;
}
