import { inject, injectable } from "tsyringe";
import { IIterateOperationRepo } from "../../database/repository.interfaces/field.operations/iterate.operation/iterate.operation.repo.interface";
import {
    IterateOperationResponseDto,
    IterateOperationCreateModel,
    IterateOperationUpdateModel,
    OperationSearchFilters
} from "../../domain.types/forms/operation.domain.types";

@injectable()
export class IterateOperationService {
    constructor(@inject('IIterateOperationRepo') private _iterateOperationRepo: IIterateOperationRepo) { }

    // Iterate Operation operations
    async createIterateOperation(model: IterateOperationCreateModel): Promise<IterateOperationResponseDto> {
        return await this._iterateOperationRepo.createIterateOperation(model);
    }

    async updateIterateOperation(id: string, model: IterateOperationUpdateModel): Promise<IterateOperationResponseDto> {
        return await this._iterateOperationRepo.updateIterateOperation(id, model);
    }

    async getIterateOperationById(id: string): Promise<IterateOperationResponseDto> {
        return await this._iterateOperationRepo.getIterateOperationById(id);
    }

    async deleteIterateOperation(id: string): Promise<boolean> {
        return await this._iterateOperationRepo.deleteIterateOperation(id);
    }

    async searchIterateOperation(filters: OperationSearchFilters): Promise<any> {
        return await this._iterateOperationRepo.searchIterateOperation(filters);
    }
} 