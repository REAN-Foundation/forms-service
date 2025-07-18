import { SkipRuleResponseDto } from '../../domain.types/rules/skip.rule.domain.types';

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
