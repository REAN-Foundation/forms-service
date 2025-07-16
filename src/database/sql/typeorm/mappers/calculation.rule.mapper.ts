import { CalculationRuleResponseDto } from '../../../../domain.types/forms/rule.domain.types';

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
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): CalculationRuleResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => CalculationRuleMapper.toDto(record));
    }
}
