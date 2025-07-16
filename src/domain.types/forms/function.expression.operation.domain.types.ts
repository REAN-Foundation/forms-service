import {
    BaseOperationCreateModel,
    BaseOperationResponseDto,
    BaseOperationUpdateModel,
} from './operation.domain.types';

// Function Expression Operation DTOs
export interface FunctionExpressionOperationCreateModel
    extends BaseOperationCreateModel {
    FunctionName?: string;
    Parameters?: Record<string, any>;
    Expression?: string;
}

export interface FunctionExpressionOperationUpdateModel
    extends BaseOperationUpdateModel {
    FunctionName?: string;
    Parameters?: Record<string, any>;
    Expression?: string;
}

export interface FunctionExpressionOperationResponseDto
    extends BaseOperationResponseDto {
    FunctionName?: string;
    Parameters?: Record<string, any>;
    Expression?: string;
}
