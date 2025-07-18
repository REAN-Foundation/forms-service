import {
    BaseOperationCreateModel,
    BaseOperationResponseDto,
    BaseOperationUpdateModel,
} from './base.operation.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { OperationType } from '../operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

// Function Expression Operation DTOs
export interface FunctionExpressionOperationCreateModel
    extends BaseOperationCreateModel {
    Expression: string;
    Variables: string; // JSON serialized Record<string, Operand>
    ResultDataType: string;
}

export interface FunctionExpressionOperationUpdateModel
    extends BaseOperationUpdateModel {
    Expression?: string;
    Variables?: string; // JSON serialized Record<string, Operand>
    ResultDataType?: string;
}

export interface FunctionExpressionOperationResponseDto
    extends BaseOperationResponseDto {
    Expression: string;
    Variables: string; // JSON serialized Record<string, Operand>
    ResultDataType: string;
}

export interface FunctionExpressionOperationSearchFilters extends BaseSearchFilters {
    Expression?: string;
    Variables?: string; // JSON serialized Record<string, Operand>
    ResultDataType?: string;
    Type?: OperationType;
}

export interface FunctionExpressionOperationSearchResults extends BaseSearchResults {
    Items: FunctionExpressionOperationResponseDto[];
}
