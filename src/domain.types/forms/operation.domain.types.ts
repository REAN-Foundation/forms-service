import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { 
    OperationType, 
    LogicalOperatorType, 
    MathematicalOperatorType, 
    CompositionOperatorType 
} from "./operation.enums";

// Base Operation DTOs
export interface BaseOperationCreateModel {
    Name?: string;
    Description?: string;
    Type: OperationType;
}

export interface BaseOperationUpdateModel {
    Name?: string;
    Description?: string;
    Type?: OperationType;
}

export interface BaseOperationResponseDto {
    id: string;
    Name?: string;
    Description?: string;
    Type: OperationType;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

// Logical Operation DTOs
export interface LogicalOperationCreateModel extends BaseOperationCreateModel {
    Operator: LogicalOperatorType;
    Operands: string; // JSON serialized Operand[]
}

export interface LogicalOperationUpdateModel extends BaseOperationUpdateModel {
    Operator?: LogicalOperatorType;
    Operands?: string; // JSON serialized Operand[]
}

export interface LogicalOperationResponseDto extends BaseOperationResponseDto {
    Operator: LogicalOperatorType;
    Operands: string; // JSON serialized Operand[]
}

// Mathematical Operation DTOs
export interface MathematicalOperationCreateModel extends BaseOperationCreateModel {
    Operator: MathematicalOperatorType;
    Operands: string; // JSON serialized Operand[]
    ResultDataType: string;
}

export interface MathematicalOperationUpdateModel extends BaseOperationUpdateModel {
    Operator?: MathematicalOperatorType;
    Operands?: string; // JSON serialized Operand[]
    ResultDataType?: string;
}

export interface MathematicalOperationResponseDto extends BaseOperationResponseDto {
    Operator: MathematicalOperatorType;
    Operands: string; // JSON serialized Operand[]
    ResultDataType: string;
}

// Composition Operation DTOs
export interface CompositionOperationCreateModel extends BaseOperationCreateModel {
    Operator: CompositionOperatorType;
    Operands: string; // JSON serialized Operand[]
}

export interface CompositionOperationUpdateModel extends BaseOperationUpdateModel {
    Operator?: CompositionOperatorType;
    Operands?: string; // JSON serialized Operand[]
}

export interface CompositionOperationResponseDto extends BaseOperationResponseDto {
    Operator: CompositionOperatorType;
    Operands: string; // JSON serialized Operand[]
}

// Iterate Operation DTOs
export interface IterateOperationCreateModel extends BaseOperationCreateModel {
    CollectionField: string; // Field name to iterate over
    ResultField: string; // Field name to store result
    OperationId: string;
    FilterExpression?: string; // Optional filter expression
}

export interface IterateOperationUpdateModel extends BaseOperationUpdateModel {
    CollectionField?: string; // Field name to iterate over
    ResultField?: string; // Field name to store result
    OperationId?: string;
    FilterExpression?: string; // Optional filter expression
}

export interface IterateOperationResponseDto extends BaseOperationResponseDto {
    CollectionField: string;
    ResultField: string;
    OperationId: string;
    FilterExpression?: string;
    Operation?: {
        id: string;
        Name?: string;
        Description?: string;
    };
}

// Function Expression Operation DTOs
export interface FunctionExpressionOperationCreateModel extends BaseOperationCreateModel {
    Expression: string;
    Variables: string; // JSON serialized Record<string, Operand>
    ResultDataType: string;
}

export interface FunctionExpressionOperationUpdateModel extends BaseOperationUpdateModel {
    Expression?: string;
    Variables?: string; // JSON serialized Record<string, Operand>
    ResultDataType?: string;
}

export interface FunctionExpressionOperationResponseDto extends BaseOperationResponseDto {
    Expression: string;
    Variables: string; // JSON serialized Record<string, Operand>
    ResultDataType: string;
}

// Operation Search DTOs
export interface OperationSearchFilters extends BaseSearchFilters {
    id?: string;
    name?: string;
    description?: string;
    operator?: LogicalOperatorType | MathematicalOperatorType | CompositionOperatorType;
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