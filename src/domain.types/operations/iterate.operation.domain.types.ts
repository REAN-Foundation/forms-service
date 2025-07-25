import {
    BaseOperationCreateModel,
    BaseOperationResponseDto,
    BaseOperationUpdateModel,
} from './base.operation.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { OperationType } from '../enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

// Iterate Operation DTOs
export interface IterateOperationCreateModel extends BaseOperationCreateModel {
    // CollectionField: string; // Field name to iterate over
    ItemAlias: string; // Field name to store result
    OperationId: string;
    ArrayOperand?: string; // Optional filter expression
}

export interface IterateOperationUpdateModel extends BaseOperationUpdateModel {
    // CollectionField?: string; // Field name to iterate over
    ItemAlias?: string; // Field name to store result
    OperationId?: string;
    ArrayOperand?: string; // Optional filter expression
}

export interface IterateOperationResponseDto extends BaseOperationResponseDto {
    Type: OperationType.Iterate;
    Operation: BaseOperationResponseDto;
    ItemAlias: string;
    ArrayOperand: string;
    OperationId: string;
}

export interface IterateOperationSearchFilters extends BaseSearchFilters {
    // CollectionField?: string; // Field name to iterate over
    ItemAlias?: string; // Field name to store result
    OperationId?: string;
    ArrayOperand?: string; // Optional filter expression
    Name?: string;
    Description?: string;
    Type?: OperationType;
}

export interface IterateOperationSearchResults extends BaseSearchResults {
    Items: IterateOperationResponseDto[];
}