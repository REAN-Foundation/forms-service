import {
    BaseOperationCreateModel,
    BaseOperationResponseDto,
    BaseOperationUpdateModel,
} from './base.operation.domain.types';
import { CompositionOperatorType, OperationType } from '../operation.enums';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';

///////////////////////////////////////////////////////////////////////////////////////////////

// Composition Operation DTOs
export interface CompositionOperationCreateModel
    extends BaseOperationCreateModel {
    Operator: CompositionOperatorType;
    Operands: string; // JSON serialized Operand[]
}

export interface CompositionOperationUpdateModel
    extends BaseOperationUpdateModel {
    Operator?: CompositionOperatorType;
    Operands?: string; // JSON serialized Operand[]
}

export interface CompositionOperationResponseDto
    extends BaseOperationResponseDto {
    Operator: CompositionOperatorType;
    Operands: string; // JSON serialized Operand[]
}

export interface CompositionOperationSearchFilters extends BaseSearchFilters {
    Operator?: CompositionOperatorType;
    Operands?: string; // JSON serialized Operand[]
    Name?: string;
    Description?: string;
    Type?: OperationType;
}

export interface CompositionOperationSearchResults extends BaseSearchResults {
    Items: CompositionOperationResponseDto[];
}
