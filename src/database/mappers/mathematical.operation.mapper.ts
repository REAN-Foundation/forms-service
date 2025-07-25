import { OperationType } from '../../domain.types/enums/operation.enums';
import { MathematicalOperationResponseDto } from '../../domain.types/operations/mathematical.operation.domain.types';

export class MathematicalOperationMapper {
    static toDto = (record: any): MathematicalOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: MathematicalOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Type: OperationType.Mathematical,
            Operator: record.Operator,
            Operands: record.Operands,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): MathematicalOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => MathematicalOperationMapper.toDto(record));
    }
}
