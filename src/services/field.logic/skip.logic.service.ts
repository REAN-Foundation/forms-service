import { inject, injectable } from "tsyringe";
import { ISkipLogicRepo } from "../../database/repository.interfaces/field.logic/skip.logic/skip.logic.repo.interface";
import {
    SkipLogicResponseDto,
    SkipLogicCreateModel,
    SkipLogicUpdateModel,
    LogicSearchFilters
} from "../../domain.types/forms/logic.domain.types";

@injectable()
export class SkipLogicService {
    constructor(@inject('ISkipLogicRepo') private _skipLogicRepo: ISkipLogicRepo) { }

    // Skip Logic operations
    async createSkipLogic(model: SkipLogicCreateModel): Promise<SkipLogicResponseDto> {
        return await this._skipLogicRepo.createSkipLogic(model);
    }

    async updateSkipLogic(id: string, model: SkipLogicUpdateModel): Promise<SkipLogicResponseDto> {
        return await this._skipLogicRepo.updateSkipLogic(id, model);
    }

    async getSkipLogicById(id: string): Promise<SkipLogicResponseDto> {
        return await this._skipLogicRepo.getSkipLogicById(id);
    }

    async deleteSkipLogic(id: string): Promise<boolean> {
        return await this._skipLogicRepo.deleteSkipLogic(id);
    }

    async searchSkipLogic(filters: LogicSearchFilters): Promise<any> {
        return await this._skipLogicRepo.searchSkipLogic(filters);
    }
}