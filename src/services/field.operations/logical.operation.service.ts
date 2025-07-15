import { inject, injectable } from "tsyringe";
import { ILogicalOperationRepo } from "../../database/repository.interfaces/field.operations/logical.operation/logical.operation.repo.interface";
import {
    LogicalOperationResponseDto,
    LogicalOperationCreateModel,
    LogicalOperationUpdateModel,
    OperationSearchFilters
} from "../../domain.types/forms/operation.domain.types";

@injectable()
export class LogicalOperationService {
    constructor(@inject('ILogicalOperationRepo') private _logicalOperationRepo: ILogicalOperationRepo) { }

    // Logical Operation operations
    async createLogicalOperation(model: LogicalOperationCreateModel): Promise<LogicalOperationResponseDto> {
        return await this._logicalOperationRepo.createLogicalOperation(model);
    }

    async updateLogicalOperation(id: string, model: LogicalOperationUpdateModel): Promise<LogicalOperationResponseDto> {
        return await this._logicalOperationRepo.updateLogicalOperation(id, model);
    }

    async getLogicalOperationById(id: string): Promise<LogicalOperationResponseDto> {
        return await this._logicalOperationRepo.getLogicalOperationById(id);
    }

    async deleteLogicalOperation(id: string): Promise<boolean> {
        return await this._logicalOperationRepo.deleteLogicalOperation(id);
    }

    async searchLogicalOperation(filters: OperationSearchFilters): Promise<any> {
        return await this._logicalOperationRepo.searchLogicalOperation(filters);
    }
} 