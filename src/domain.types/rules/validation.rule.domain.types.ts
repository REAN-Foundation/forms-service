import {
    BaseRuleCreateModel,
    BaseRuleResponseDto,
    BaseRuleUpdateModel,
} from './base.rule.domain.types';
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { uuid } from '../miscellaneous/system.types';
import { OperationResponseDto } from '../operations/base.operation.domain.types';
import { OperationType } from '../enums/operation.enums';

// Validation Rule DTOs
export interface ValidationRuleCreateModel extends BaseRuleCreateModel {
    OperationId: uuid;
    ErrorWhenFalse: boolean;
    ErrorMessage: string;
    LogicId?: uuid;
}

export interface ValidationRuleUpdateModel extends BaseRuleUpdateModel {
    OperationId?: uuid;
    ErrorWhenFalse?: boolean;
    ErrorMessage?: string;
    LogicId?: uuid;
}

export interface ValidationRuleResponseDto extends BaseRuleResponseDto {
    Operation: OperationResponseDto;
    ErrorWhenFalse?: boolean;
    ErrorMessage?: string;
    LogicId?: uuid;
}

// Validation Rule Search DTOs
export interface ValidationRuleSearchFilters extends BaseSearchFilters {
    id?: uuid;
    Name?: string;
    Description?: string;
    Priority?: number;
    IsActive?: boolean;
    OperationId?: uuid;
    LogicId?: uuid;
    ErrorWhenFalse?: boolean;
    ErrorMessage?: string;
    OperationType?: OperationType;
}

export interface ValidationRuleSearchResults extends BaseSearchResults {
    Items: ValidationRuleResponseDto[];
}