import { RuleType } from '../../domain.types/enums/rule.enums';
import { FallbackRuleResponseDto } from '../../domain.types/rules/fallback.rule.domain.types';
import { OperationMapper } from './base.operation.mapper';

export class FallbackRuleMapper {
    static toDto = (record: any): FallbackRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FallbackRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Operation: record.Operation ? OperationMapper.toOperationDto(record.Operation as any) : null!,
            OperationType: record.OperationType,
            OperationId: record.OperationId,
            RuleType: RuleType.Fallback,
            Action: record.Action,
            ActionValue: record.ActionValue,
            ActionMessage: record.ActionMessage,
            ActionParameters: record.ActionParameters ? JSON.parse(record.ActionParameters) : undefined,
            ExecutionOrder: record.ExecutionOrder,
            StopOnSuccess: record.StopOnSuccess,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): FallbackRuleResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => FallbackRuleMapper.toDto(record));
    }
}
