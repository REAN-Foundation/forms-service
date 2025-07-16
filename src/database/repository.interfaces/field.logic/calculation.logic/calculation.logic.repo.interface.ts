import {
    CalculationLogicResponseDto,
    CalculationLogicCreateModel,
    CalculationLogicUpdateModel,
    LogicSearchFilters,
} from '../../../../domain.types/forms/logic.domain.types';

export interface ICalculationLogicRepo {
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
}
