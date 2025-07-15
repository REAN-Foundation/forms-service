import { BaseOperationCreateModel, BaseOperationResponseDto, BaseOperationUpdateModel } from "./operation.domain.types";
import { LogicalOperatorType } from "./operation.enums";

// Logical Operation DTOs
export interface LogicalOperationCreateModel extends BaseOperationCreateModel {
    OperatorType: LogicalOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
}

export interface LogicalOperationUpdateModel extends BaseOperationUpdateModel {
    OperatorType?: LogicalOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
}

export interface LogicalOperationResponseDto extends BaseOperationResponseDto {
    OperatorType: LogicalOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
} 