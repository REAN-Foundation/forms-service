import {
    BaseOperationCreateModel,
    BaseOperationResponseDto,
    BaseOperationUpdateModel,
} from './base.operation.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { OperationType } from '../operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

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
}

export interface IterateOperationSearchFilters extends BaseSearchFilters {
    CollectionField?: string; // Field name to iterate over
    ResultField?: string; // Field name to store result
    OperationId?: string;
    FilterExpression?: string; // Optional filter expression
    Name?: string;
    Description?: string;
    Type?: OperationType;
}

export interface IterateOperationSearchResults extends BaseSearchResults {
    Items: IterateOperationResponseDto[];
}