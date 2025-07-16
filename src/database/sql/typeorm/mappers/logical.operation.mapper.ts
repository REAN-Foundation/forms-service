import { LogicalOperationResponseDto } from '../../../../domain.types/forms/operation.domain.types';

export class LogicalOperationMapper {
    static toDto = (record: any): LogicalOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: LogicalOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Type: record.Type,
            Operator: record.Operator,
            Operands: record.Operands,
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
