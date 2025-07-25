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
            ConditionForOperationId: record.ConditionForOperationId,
            ConditionForOperation: record.ConditionForOperation ? OperationMapper.toOperationDto(record.ConditionForOperation as any) : null!,
            RuleType: RuleType.Calculation,
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
