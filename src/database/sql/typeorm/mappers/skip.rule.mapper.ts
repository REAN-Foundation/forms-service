import {
    SkipRuleResponseDto,
} from "../../../../domain.types/forms/rule.domain.types";

export class SkipRuleMapper {
    static toDto = (record: any): SkipRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: SkipRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Priority: record.Priority,
            IsActive: record.IsActive,
            OperationId: record.OperationId,
            SkipWhenTrue: record.SkipWhenTrue,
            LogicId: record.LogicId,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toSkipRuleDto = (record: any): SkipRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: SkipRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Priority: record.Priority,
            IsActive: record.IsActive,
            OperationId: record.OperationId,
            SkipWhenTrue: record.SkipWhenTrue,
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