import {
    BaseLogicResponseDto,
    SkipLogicResponseDto,
    CalculationLogicResponseDto,
    ValidationLogicResponseDto,
    SkipLogicCreateModel,
    CalculationLogicCreateModel,
    ValidationLogicCreateModel,
    SkipLogicUpdateModel,
    CalculationLogicUpdateModel,
    ValidationLogicUpdateModel,
    LogicSearchFilters,
} from '../../../domain.types/forms/logic.domain.types';

export interface ILogicRepo {
    // Base Logic operations
    createBaseLogic(
        model:
            | SkipLogicCreateModel
            | CalculationLogicCreateModel
            | ValidationLogicCreateModel
    ): Promise<BaseLogicResponseDto>;
    updateBaseLogic(
        id: string,
        model:
            | SkipLogicUpdateModel
            | CalculationLogicUpdateModel
            | ValidationLogicUpdateModel
    ): Promise<BaseLogicResponseDto>;
    getBaseLogicById(id: string): Promise<BaseLogicResponseDto>;
    deleteBaseLogic(id: string): Promise<boolean>;
    searchBaseLogic(filters: LogicSearchFilters): Promise<any>;

    // Skip Logic operations
    createSkipLogic(model: SkipLogicCreateModel): Promise<SkipLogicResponseDto>;
    updateSkipLogic(
        id: string,
        model: SkipLogicUpdateModel
    ): Promise<SkipLogicResponseDto>;
    getSkipLogicById(id: string): Promise<SkipLogicResponseDto>;
    deleteSkipLogic(id: string): Promise<boolean>;
    searchSkipLogic(filters: LogicSearchFilters): Promise<any>;

    // Calculation Logic operations
    createCalculationLogic(
        model: CalculationLogicCreateModel
    ): Promise<CalculationLogicResponseDto>;
    updateCalculationLogic(
        id: string,
        model: CalculationLogicUpdateModel
    ): Promise<CalculationLogicResponseDto>;
    getCalculationLogicById(id: string): Promise<CalculationLogicResponseDto>;
    deleteCalculationLogic(id: string): Promise<boolean>;
    searchCalculationLogic(filters: LogicSearchFilters): Promise<any>;

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
