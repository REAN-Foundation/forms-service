import {
    LogicalOperationResponseDto,
    LogicalOperationCreateModel,
    LogicalOperationUpdateModel,
    OperationSearchFilters
} from "../../../../domain.types/forms/operation.domain.types";

export interface ILogicalOperationRepo {

    // Logical Operation operations
    createLogicalOperation(model: LogicalOperationCreateModel): Promise<LogicalOperationResponseDto>;
    updateLogicalOperation(id: string, model: LogicalOperationUpdateModel): Promise<LogicalOperationResponseDto>;
    getLogicalOperationById(id: string): Promise<LogicalOperationResponseDto>;
    deleteLogicalOperation(id: string): Promise<boolean>;
    searchLogicalOperation(filters: OperationSearchFilters): Promise<any>;
} 