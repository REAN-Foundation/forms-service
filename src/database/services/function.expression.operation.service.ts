import { inject, injectable } from 'tsyringe';
import { IFunctionExpressionOperationRepo } from '../../database/repository.interfaces/field.operations/function.expression.operation/function.expression.operation.repo.interface';
import {
    FunctionExpressionOperationResponseDto,
    FunctionExpressionOperationCreateModel,
    FunctionExpressionOperationUpdateModel,
    OperationSearchFilters,
} from '../../domain.types/forms/operation.domain.types';

@injectable()
export class FunctionExpressionOperationService {
    constructor(
        @inject('IFunctionExpressionOperationRepo')
        private _functionExpressionOperationRepo: IFunctionExpressionOperationRepo
    ) {}

    // Function Expression Operation operations
    async createFunctionExpressionOperation(
        model: FunctionExpressionOperationCreateModel
    ): Promise<FunctionExpressionOperationResponseDto> {
        return await this._functionExpressionOperationRepo.createFunctionExpressionOperation(
            model
        );
    }

    async updateFunctionExpressionOperation(
        id: string,
        model: FunctionExpressionOperationUpdateModel
    ): Promise<FunctionExpressionOperationResponseDto> {
        return await this._functionExpressionOperationRepo.updateFunctionExpressionOperation(
            id,
            model
        );
    }

    async getFunctionExpressionOperationById(
        id: string
    ): Promise<FunctionExpressionOperationResponseDto> {
        return await this._functionExpressionOperationRepo.getFunctionExpressionOperationById(
            id
        );
    }

    async deleteFunctionExpressionOperation(id: string): Promise<boolean> {
        return await this._functionExpressionOperationRepo.deleteFunctionExpressionOperation(
            id
        );
    }

    async searchFunctionExpressionOperation(
        filters: OperationSearchFilters
    ): Promise<any> {
        return await this._functionExpressionOperationRepo.searchFunctionExpressionOperation(
            filters
        );
    }
}
