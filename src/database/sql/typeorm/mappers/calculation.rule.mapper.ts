import {
    CalculationRuleResponseDto,
} from "../../../../domain.types/forms/rule.domain.types";

export class CalculationRuleMapper {
    static toDto = (record: any): CalculationRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: CalculationRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Priority: record.Priority,
            IsActive: record.IsActive,
            ConditionForOperationId: record.ConditionForOperationId,
            OperationId: record.OperationId,
            LogicId: record.LogicId,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toCalculationRuleDto = (record: any): CalculationRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: CalculationRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Priority: record.Priority,
            IsActive: record.IsActive,
            ConditionForOperationId: record.ConditionForOperationId,
            OperationId: record.OperationId,
            LogicId: record.LogicId,
            ConditionForOperation: record.ConditionForOperation ? {
                id: record.ConditionForOperation.id,
                Name: record.ConditionForOperation.Name,
                Description: record.ConditionForOperation.Description
            } : undefined,
            Operation: record.Operation ? {
                id: record.Operation.id,
                Name: record.Operation.Name,
                Description: record.Operation.Description
            } : undefined,
            Logic: record.Logic ? {
                id: record.Logic.id,
                Type: record.Logic.Type,
                DefaultSkip: record.Logic.DefaultSkip,
                FallbackValue: record.Logic.FallbackValue
            } : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };
} 