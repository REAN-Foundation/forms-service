import {
    FunctionExpressionOperationResponseDto,
    FunctionExpressionOperationCreateModel,
    FunctionExpressionOperationUpdateModel,
    OperationSearchFilters,
} from '../../../../domain.types/forms/operation.domain.types';

export interface IFunctionExpressionOperationRepo {
    // Function Expression Operation operations
    createFunctionExpressionOperation(
        model: FunctionExpressionOperationCreateModel
    ): Promise<FunctionExpressionOperationResponseDto>;
    updateFunctionExpressionOperation(
        id: string,
        model: FunctionExpressionOperationUpdateModel
    ): Promise<FunctionExpressionOperationResponseDto>;
    getFunctionExpressionOperationById(
        id: string
    ): Promise<FunctionExpressionOperationResponseDto>;
    deleteFunctionExpressionOperation(id: string): Promise<boolean>;
    searchFunctionExpressionOperation(
        filters: OperationSearchFilters
    ): Promise<any>;
}
