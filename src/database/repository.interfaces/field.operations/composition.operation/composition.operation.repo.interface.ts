import {
    CompositionOperationCreateModel,
    CompositionOperationUpdateModel,
    CompositionOperationResponseDto,
    OperationSearchFilters
} from "../../../../domain.types/forms/operation.domain.types";

export interface ICompositionOperationRepo {


    // Composition Operation operations
    createCompositionOperation(model: CompositionOperationCreateModel): Promise<CompositionOperationResponseDto>;
    getCompositionOperationById(id: string): Promise<CompositionOperationResponseDto>;
    updateCompositionOperation(id: string, model: CompositionOperationUpdateModel): Promise<CompositionOperationResponseDto>;
    deleteCompositionOperation(id: string): Promise<boolean>;
    searchCompositionOperation(filters: OperationSearchFilters): Promise<any>;

} 