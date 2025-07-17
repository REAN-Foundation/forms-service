import {
    BaseOperationCreateModel,
    BaseOperationResponseDto,
    BaseOperationUpdateModel,
} from './operation.domain.types';
import { MathematicalOperatorType } from './operation.enums';

// Mathematical Operation DTOs
export interface MathematicalOperationCreateModel
    extends BaseOperationCreateModel {
    OperatorType: MathematicalOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
}

export interface MathematicalOperationUpdateModel
    extends BaseOperationUpdateModel {
    OperatorType?: MathematicalOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
}

export interface MathematicalOperationResponseDto
    extends BaseOperationResponseDto {
    OperatorType: MathematicalOperatorType;
    LeftOperand?: string;
    RightOperand?: string;
    Parameters?: Record<string, any>;
}
