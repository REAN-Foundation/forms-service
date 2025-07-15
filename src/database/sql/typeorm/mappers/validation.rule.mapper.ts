import {
    ValidationRuleResponseDto,
} from "../../../../domain.types/forms/rule.domain.types";

export class ValidationRuleMapper {
    static toDto = (record: any): ValidationRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: ValidationRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Priority: record.Priority,
            IsActive: record.IsActive,
            OperationId: record.OperationId,
            ErrorWhenFalse: record.ErrorWhenFalse,
            ErrorMessage: record.ErrorMessage,
            LogicId: record.LogicId,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toValidationRuleDto = (record: any): ValidationRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: ValidationRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Priority: record.Priority,
            IsActive: record.IsActive,
            OperationId: record.OperationId,
            ErrorWhenFalse: record.ErrorWhenFalse,
            ErrorMessage: record.ErrorMessage,
            LogicId: record.LogicId,
            Operation: record.Operation ? {
                id: record.Operation.id,
                Name: record.Operation.Name,
                Description: record.Operation.Description
            } : undefined,
            Logic: record.Logic ? {
                id: record.Logic.id,
                Type: record.Logic.Type,
                DefaultSkip: record.Logic.DefaultSkip
            } : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };
} 