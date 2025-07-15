import {
    IterateOperationResponseDto,
    IterateOperationCreateModel,
    IterateOperationUpdateModel,
    OperationSearchFilters
} from "../../../../domain.types/forms/operation.domain.types";

export interface IIterateOperationRepo {

    // Iterate Operation operations
    createIterateOperation(model: IterateOperationCreateModel): Promise<IterateOperationResponseDto>;
    updateIterateOperation(id: string, model: IterateOperationUpdateModel): Promise<IterateOperationResponseDto>;
    getIterateOperationById(id: string): Promise<IterateOperationResponseDto>;
    deleteIterateOperation(id: string): Promise<boolean>;
    searchIterateOperation(filters: OperationSearchFilters): Promise<any>;
} 