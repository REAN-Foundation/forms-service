import { inject, injectable } from "tsyringe";
import { IMathematicalOperationRepo } from "../../database/repository.interfaces/field.operations/mathematical.operation/mathematical.operation.repo.interface";
import {
    MathematicalOperationResponseDto,
    MathematicalOperationCreateModel,
    MathematicalOperationUpdateModel,
    OperationSearchFilters
} from "../../domain.types/forms/operation.domain.types";

@injectable()
export class MathematicalOperationService {
    constructor(@inject('IMathematicalOperationRepo') private _mathematicalOperationRepo: IMathematicalOperationRepo) { }

    // Mathematical Operation operations
    async createMathematicalOperation(model: MathematicalOperationCreateModel): Promise<MathematicalOperationResponseDto> {
        return await this._mathematicalOperationRepo.createMathematicalOperation(model);
    }

    async updateMathematicalOperation(id: string, model: MathematicalOperationUpdateModel): Promise<MathematicalOperationResponseDto> {
        return await this._mathematicalOperationRepo.updateMathematicalOperation(id, model);
    }

    async getMathematicalOperationById(id: string): Promise<MathematicalOperationResponseDto> {
        return await this._mathematicalOperationRepo.getMathematicalOperationById(id);
    }

    async deleteMathematicalOperation(id: string): Promise<boolean> {
        return await this._mathematicalOperationRepo.deleteMathematicalOperation(id);
    }

    async searchMathematicalOperation(filters: OperationSearchFilters): Promise<any> {
        return await this._mathematicalOperationRepo.searchMathematicalOperation(filters);
    }
} 