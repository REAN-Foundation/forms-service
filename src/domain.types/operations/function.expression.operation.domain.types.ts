import {
    BaseOperationCreateModel,
    BaseOperationResponseDto,
    BaseOperationUpdateModel,
} from './base.operation.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { OperationType } from '../enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

// Function Expression Operation DTOs
export interface FunctionExpressionOperationCreateModel
    extends BaseOperationCreateModel {
    Expression: string;
    Variables: string; // JSON serialized Record<string, Operand>
    // ResultDataType: string;
}

export interface FunctionExpressionOperationUpdateModel
    extends BaseOperationUpdateModel {
    Expression?: string;
    Variables?: string; // JSON serialized Record<string, Operand>
    // ResultDataType?: string;
}

export interface FunctionExpressionOperationResponseDto
    extends BaseOperationResponseDto {
    Type: OperationType.FunctionExpression;
    Expression: string;
    Variables: string; // JSON serialized Record<string, Operand>
}

export interface FunctionExpressionOperationSearchFilters extends BaseSearchFilters {
    Expression?: string;
    Variables?: string; // JSON serialized Record<string, Operand>
    Type?: OperationType;
}

export interface FunctionExpressionOperationSearchResults extends BaseSearchResults {
    Items: FunctionExpressionOperationResponseDto[];
}
