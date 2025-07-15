import {
    MathematicalOperationResponseDto,
    MathematicalOperationCreateModel,
    MathematicalOperationUpdateModel,
    OperationSearchFilters
} from "../../../../domain.types/forms/operation.domain.types";

export interface IMathematicalOperationRepo {

    // Mathematical Operation operations
    createMathematicalOperation(model: MathematicalOperationCreateModel): Promise<MathematicalOperationResponseDto>;
    updateMathematicalOperation(id: string, model: MathematicalOperationUpdateModel): Promise<MathematicalOperationResponseDto>;
    getMathematicalOperationById(id: string): Promise<MathematicalOperationResponseDto>;
    deleteMathematicalOperation(id: string): Promise<boolean>;
    searchMathematicalOperation(filters: OperationSearchFilters): Promise<any>;
} 