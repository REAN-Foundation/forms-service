import {
    MathematicalOperationResponseDto,
} from "../../../../domain.types/forms/operation.domain.types";

export class MathematicalOperationMapper {
    static toDto = (record: any): MathematicalOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: MathematicalOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Type: record.Type,
            Operator: record.Operator,
            Operands: record.Operands,
            ResultDataType: record.ResultDataType,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toMathematicalOperationDto = (record: any): MathematicalOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: MathematicalOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Type: record.Type,
            Operator: record.Operator,
            Operands: record.Operands,
            ResultDataType: record.ResultDataType,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };
} 