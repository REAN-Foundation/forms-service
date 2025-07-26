import { RuleType } from '../../domain.types/enums/rule.enums';
import { ValidationRuleResponseDto } from '../../domain.types/rules/validation.rule.domain.types';
import { OperationMapper } from './base.operation.mapper';

export class ValidationRuleMapper {
    static toDto = (record: any): ValidationRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: ValidationRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Operation: record.Operation ? OperationMapper.toOperationDto(record.Operation as any) : null!,
            OperationType: record.OperationType,
            OperationId: record.BaseOperationId,
            ErrorWhenFalse: record.ErrorWhenFalse,
            ErrorMessage: record.ErrorMessage,
            RuleType: RuleType.Validation,
            LogicId: record.LogicId,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): ValidationRuleResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => ValidationRuleMapper.toDto(record));
    }
}
