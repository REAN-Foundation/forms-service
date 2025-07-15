import { inject, injectable } from "tsyringe";
import { ICalculationLogicRepo } from "../../database/repository.interfaces/field.logic/calculation.logic/calculation.logic.repo.interface";
import {
    CalculationLogicResponseDto,
    CalculationLogicCreateModel,
    CalculationLogicUpdateModel,
    LogicSearchFilters
} from "../../domain.types/forms/logic.domain.types";

@injectable()
export class CalculationLogicService {
    constructor(@inject('ICalculationLogicRepo') private _calculationLogicRepo: ICalculationLogicRepo) { }

    // Calculation Logic operations
    async createCalculationLogic(model: CalculationLogicCreateModel): Promise<CalculationLogicResponseDto> {
        return await this._calculationLogicRepo.createCalculationLogic(model);
    }

    async updateCalculationLogic(id: string, model: CalculationLogicUpdateModel): Promise<CalculationLogicResponseDto> {
        return await this._calculationLogicRepo.updateCalculationLogic(id, model);
    }

    async getCalculationLogicById(id: string): Promise<CalculationLogicResponseDto> {
        return await this._calculationLogicRepo.getCalculationLogicById(id);
    }

    async deleteCalculationLogic(id: string): Promise<boolean> {
        return await this._calculationLogicRepo.deleteCalculationLogic(id);
    }

    async searchCalculationLogic(filters: LogicSearchFilters): Promise<any> {
        return await this._calculationLogicRepo.searchCalculationLogic(filters);
    }
} 