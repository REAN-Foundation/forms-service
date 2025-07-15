import { BaseOperationCreateModel, BaseOperationResponseDto, BaseOperationUpdateModel } from "./operation.domain.types";
import { CompositionOperatorType } from "./operation.enums";

// Composition Operation DTOs
export interface CompositionOperationCreateModel extends BaseOperationCreateModel {
    OperatorType: CompositionOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
}

export interface CompositionOperationUpdateModel extends BaseOperationUpdateModel {
    OperatorType?: CompositionOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
}

export interface CompositionOperationResponseDto extends BaseOperationResponseDto {
    OperatorType: CompositionOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
} 