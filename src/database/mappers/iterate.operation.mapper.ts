import { OperationType } from '../../domain.types/enums/operation.enums';
import { IterateOperationResponseDto } from '../../domain.types/operations/iterate.operation.domain.types';

export class IterateOperationMapper {
    static toDto = (record: any): IterateOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: IterateOperationResponseDto = {
            id: record.id,
            Type: OperationType.Iterate,
            Name: record.Name,
            Description: record.Description,
            ArrayOperand: record.ArrayOperand,
            ItemAlias: record.ItemAlias,
            OperationId: record.OperationId,
            Operation: record.Operation ? {
                id: record.Operation.id,
                Name: record.Operation.Name,
                Description: record.Operation.Description,
                CreatedAt: record.Operation.CreatedAt,
                UpdatedAt: record.Operation.UpdatedAt
            } : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): IterateOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => IterateOperationMapper.toDto(record));
    }
}
