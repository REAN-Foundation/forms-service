import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { 
    OperationType, 
    LogicalOperatorType, 
    MathematicalOperatorType, 
    CompositionOperatorType 
} from "../../database/sql/typeorm/models/operation/operation.types";

// Base Operation DTOs
export interface BaseOperationCreateModel {
    Name?: string;
    Description?: string;
}

export interface BaseOperationUpdateModel {
    Name?: string;
    Description?: string;
}

export interface BaseOperationResponseDto {
    id: string;
    Name?: string;
    Description?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

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

// Mathematical Operation DTOs
export interface MathematicalOperationCreateModel extends BaseOperationCreateModel {
    OperatorType: MathematicalOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
}

export interface MathematicalOperationUpdateModel extends BaseOperationUpdateModel {
    OperatorType?: MathematicalOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
}

export interface MathematicalOperationResponseDto extends BaseOperationResponseDto {
    OperatorType: MathematicalOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
}

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

// Iterate Operation DTOs
export interface IterateOperationCreateModel extends BaseOperationCreateModel {
    ArrayOperand: string;
    ItemAlias: string;
    OperationId: string;
}

export interface IterateOperationUpdateModel extends BaseOperationUpdateModel {
    ArrayOperand?: string;
    ItemAlias?: string;
    OperationId?: string;
}

export interface IterateOperationResponseDto extends BaseOperationResponseDto {
    ArrayOperand: string;
    ItemAlias: string;
    OperationId: string;
    Operation?: {
        id: string;
        Name?: string;
        Description?: string;
    };
}

// Function Expression Operation DTOs
export interface FunctionExpressionOperationCreateModel extends BaseOperationCreateModel {
    FunctionName?: string;
    Parameters?: Record<string, any>;
    Expression?: string;
}

export interface FunctionExpressionOperationUpdateModel extends BaseOperationUpdateModel {
    FunctionName?: string;
    Parameters?: Record<string, any>;
    Expression?: string;
}

export interface FunctionExpressionOperationResponseDto extends BaseOperationResponseDto {
    FunctionName?: string;
    Parameters?: Record<string, any>;
    Expression?: string;
}

// Operation Search DTOs
export interface OperationSearchFilters extends BaseSearchFilters {
    id?: string;
    name?: string;
    description?: string;
    operatorType?: LogicalOperatorType | MathematicalOperatorType | CompositionOperatorType;
}

export interface OperationSearchResults extends BaseSearchResults {
    Items: OperationSearchResponseDto[];
}

export interface OperationSearchResponseDto extends BaseSearchResults {
    id: string;
    Name?: string;
    Description?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
} 