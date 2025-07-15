import {
    FunctionExpressionOperationResponseDto,
} from "../../../../domain.types/forms/operation.domain.types";

export class FunctionExpressionOperationMapper {
    static toDto = (record: any): FunctionExpressionOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FunctionExpressionOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Type: record.Type,
            Expression: record.Expression,
            Variables: record.Variables,
            ResultDataType: record.ResultDataType,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayDto(records: any[]): FunctionExpressionOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => FunctionExpressionOperationMapper.toDto(record));
    }
} 