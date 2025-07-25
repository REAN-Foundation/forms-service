import { OperationType } from '../../domain.types/enums/operation.enums';
import { FunctionExpressionOperationResponseDto } from '../../domain.types/operations/function.expression.operation.domain.types';

export class FunctionExpressionOperationMapper {
    static toDto = (record: any): FunctionExpressionOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FunctionExpressionOperationResponseDto = {
            id: record.id,
            Type: OperationType.FunctionExpression,
            Name: record.Name,
            Description: record.Description,
            Expression: record.Expression,
            Variables: record.Variables,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(
        records: any[]
    ): FunctionExpressionOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record =>
            FunctionExpressionOperationMapper.toDto(record)
        );
    }
}
