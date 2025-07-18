import { OperationType } from '../operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

// Base Operation DTOs
export interface BaseOperationCreateModel {
    Name?: string;
    Description?: string;
    Type: OperationType;
}

export interface BaseOperationUpdateModel {
    Name?: string;
    Description?: string;
    Type?: OperationType;
}

export interface BaseOperationResponseDto {
    id: string;
    Name?: string;
    Description?: string;
    Type: OperationType;
    CreatedAt: Date;
    UpdatedAt?: Date;
}