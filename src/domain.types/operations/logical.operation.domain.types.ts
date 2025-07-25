import {
    BaseOperationCreateModel,
    BaseOperationResponseDto,
    BaseOperationUpdateModel,
} from './base.operation.domain.types';
import { LogicalOperatorType, OperationType } from '../enums/operation.enums';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';

///////////////////////////////////////////////////////////////////////////////////////////////

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
    Type: OperationType.Logical;
    Operator: LogicalOperatorType;
    Operands: string; // JSON serialized Operand[]
}

export interface LogicalOperationSearchFilters extends BaseSearchFilters {
    Operator?: LogicalOperatorType;
    Operands?: string; // JSON serialized Operand[]
    Name?: string;
    Description?: string;
    Type?: OperationType;
}

export interface LogicalOperationSearchResults extends BaseSearchResults {
    Items: LogicalOperationResponseDto[];
}