import { RuleType } from '../../domain.types/enums/rule.enums';
import { SkipRuleResponseDto } from '../../domain.types/rules/skip.rule.domain.types';
import { OperationMapper } from './base.operation.mapper';

export class SkipRuleMapper {
    static toDto = (record: any): SkipRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: SkipRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            RuleType: RuleType.Skip,
            OperationType: record.OperationType,
            OperationId: record.BaseOperationId,
            Operation: record.Operation ? OperationMapper.toOperationDto(record.Operation as any) : null!,
            SkipWhenTrue: record.SkipWhenTrue,
            LogicId: record.LogicId,
            ErrorMessage: record.ErrorMessage,
            ErrorWhenFalse: record.ErrorWhenFalse,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): SkipRuleResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => SkipRuleMapper.toDto(record));
    }
}
