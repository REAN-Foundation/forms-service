import {
    BaseOperationCreateModel,
    BaseOperationResponseDto,
    BaseOperationUpdateModel,
} from './operation.domain.types';

// Iterate Operation DTOs
export interface IterateOperationCreateModel extends BaseOperationCreateModel {
    ArrayOperand: string;
    ItemAlias: string;
    OperationId: string;
}

export interface IterateOperationUpdateModel extends BaseOperationUpdateModel {
    ArrayOperand?: string;
    ItemAlias?: string;
    OperationId?: string;
}

export interface IterateOperationResponseDto extends BaseOperationResponseDto {
    ArrayOperand: string;
    ItemAlias: string;
    OperationId: string;
    Operation?: {
        id: string;
        Name?: string;
        Description?: string;
    };
}
