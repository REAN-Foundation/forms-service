import {
    BaseOperationCreateModel,
    BaseOperationResponseDto,
    BaseOperationUpdateModel,
} from './base.operation.domain.types';
import { MathematicalOperatorType, OperationType } from '../enums/operation.enums';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';

///////////////////////////////////////////////////////////////////////////////////////////////

// Mathematical Operation DTOs
export interface MathematicalOperationCreateModel
    extends BaseOperationCreateModel {
    Operator: MathematicalOperatorType;
    Operands: string; // JSON serialized Operand[]
    // ResultDataType: string;
}

export interface MathematicalOperationUpdateModel
    extends BaseOperationUpdateModel {
    Operator?: MathematicalOperatorType;
    Operands?: string; // JSON serialized Operand[]
    // ResultDataType?: string;
}

export interface MathematicalOperationResponseDto
    extends BaseOperationResponseDto {
    Type: OperationType.Mathematical;
    Operator: MathematicalOperatorType;
    Operands: string; // JSON serialized Operand[]
    // ResultDataType: string;
}

export interface MathematicalOperationSearchFilters extends BaseSearchFilters {
    Operator?: MathematicalOperatorType;
    Operands?: string; // JSON serialized Operand[]
    ResultDataType?: string;
    Name?: string;
    Description?: string;
}

export interface MathematicalOperationSearchResults extends BaseSearchResults {
    Items: MathematicalOperationResponseDto[];
}