import { OperationType } from '../../domain.types/operation.enums';
import { CompositionOperationResponseDto } from '../../domain.types/operations/composition.operation.domain.types';

export class CompositionOperationMapper {
    static toDto = (record: any): CompositionOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: CompositionOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Type: OperationType.Composition,
            Operator: record.Operator,
            Operands: record.Operands,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): CompositionOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => CompositionOperationMapper.toDto(record));
    }
}
