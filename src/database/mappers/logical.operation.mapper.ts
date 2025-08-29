import { OperationType } from '../../domain.types/enums/operation.enums';
import { LogicalOperationResponseDto } from '../../domain.types/operations/logical.operation.domain.types';
import { LogicalOperation } from '../models/operation/logical.operation.model';

export class LogicalOperationMapper {
    static toDto = (record: LogicalOperation): LogicalOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: LogicalOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Type: OperationType.Logical,
            Operator: record.Operator,
            Operands: record.Operands,
            ValueDefinition: record.ValueDefinition,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): LogicalOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => LogicalOperationMapper.toDto(record));
    }
}
