import {
    BaseOperationCreateModel,
    BaseOperationResponseDto,
    BaseOperationUpdateModel,
} from './base.operation.domain.types';
import { CompositionOperatorType, OperationType } from '../enums/operation.enums';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';

///////////////////////////////////////////////////////////////////////////////////////////////

// Composition Operation DTOs
export interface CompositionOperationCreateModel
    extends BaseOperationCreateModel {
    Operator: CompositionOperatorType;
    Children: string; // JSON serialized Operand[]
}

export interface CompositionOperationUpdateModel
    extends BaseOperationUpdateModel {
    Operator?: CompositionOperatorType;
    Children?: string; // JSON serialized Operand[]
}

export interface CompositionOperationResponseDto
    extends BaseOperationResponseDto {
    Type: OperationType.Composition;
    Operator: CompositionOperatorType;
    Children: string; // JSON serialized array of operation IDs
}

export interface ExpandedCompositionOperationResponseDto
    extends BaseOperationResponseDto {
    Type: OperationType.Composition;
    Operator: CompositionOperatorType;
    Children: any[]; // Expanded array of operation DTOs
}

export interface CompositionOperationSearchFilters extends BaseSearchFilters {
    Operator?: CompositionOperatorType;
    Children?: string; // JSON serialized Operand[]
    Name?: string;
    Description?: string;
    Type?: OperationType;
}

export interface CompositionOperationSearchResults extends BaseSearchResults {
    Items: CompositionOperationResponseDto[];
}
