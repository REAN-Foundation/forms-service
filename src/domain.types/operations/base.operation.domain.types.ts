import { LogicalOperatorType, OperandDataType, OperandType, OperationType } from '../enums/operation.enums';
import { CompositionOperatorType, MathematicalOperatorType } from '../enums/operation.enums';
import { uuid } from '../miscellaneous/system.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { LogicalOperationResponseDto } from './logical.operation.domain.types';
import { MathematicalOperationResponseDto } from './mathematical.operation.domain.types';
import { CompositionOperationResponseDto } from './composition.operation.domain.types';
import { IterateOperationResponseDto } from './iterate.operation.domain.types';
import { FunctionExpressionOperationResponseDto } from './function.expression.operation.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

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
    id: uuid;
    Name?: string;
    Description?: string;
    // Type: OperationType;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export interface BaseOperationSearchFilters extends BaseSearchFilters {
    Name?: string;
    Description?: string;
    Type?: OperationType;
}

export interface BaseOperationSearchResults extends BaseSearchResults {
    Items: BaseOperationResponseDto[];
}

export type OperationResponseDto =
    | LogicalOperationResponseDto
    | MathematicalOperationResponseDto
    | CompositionOperationResponseDto
    | IterateOperationResponseDto
    | FunctionExpressionOperationResponseDto;


export interface Operand {
    Type: OperandType;
    DataType: OperandDataType;
    Value?: any;
    FieldId?: string;
    FieldCode?: string;
    FunctionName?: string;
    FunctionArgs?: Operand[];
}
export interface BaseOperation {
    id: string;
    Type: OperationType;
}

export interface LogicalOperation extends BaseOperation {
    Type: OperationType.Logical;
    Operator: LogicalOperatorType;
    Operands: Operand[];
}

export interface MathematicalOperation extends BaseOperation {
    Type: OperationType.Mathematical;
    Operator: MathematicalOperatorType;
    Operands: Operand[];
}

export interface CompositionOperation extends BaseOperation {
    Type: OperationType.Composition;
    Operator: CompositionOperatorType;
    Children: Operation[];
}

export interface IterateOperation extends BaseOperation {
    Type: OperationType.Iterate;
    ArrayOperand: Operand;
    ItemAlias: string;
    Operation: Operation;
}

export interface FunctionExpressionOperation extends BaseOperation {
    Type: OperationType.FunctionExpression;
    Expression: string;
    Variables: Record<string, Operand>;
}

export type Operation = LogicalOperation |
    MathematicalOperation |
    CompositionOperation |
    IterateOperation |
    FunctionExpressionOperation;
