import { RuleType } from '../../domain.types/enums/rule.enums';
import { CalculationRuleResponseDto } from '../../domain.types/rules/calculation.rule.domain.types';
import { OperationMapper } from './base.operation.mapper';

export class CalculationRuleMapper {
    static toDto = (record: any): CalculationRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: CalculationRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Operation: record.Operation ? OperationMapper.toOperationDto(record.Operation as any) : null!,
            OperationType: record.OperationType,
            OperationId: record.OperationId,
            BaseOperationId: record.BaseOperationId,
            RuleType: RuleType.Calculation,
            LogicId: record.LogicId,
            Settings: record.Settings ? JSON.parse(record.Settings) : undefined,
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
