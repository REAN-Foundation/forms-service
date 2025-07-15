import {
    CompositionOperationResponseDto,
} from "../../../../domain.types/forms/operation.domain.types";

export class CompositionOperationMapper {
    static toDto = (record: any): CompositionOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: CompositionOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Type: record.Type,
            Operator: record.Operator,
            Operands: record.Operands,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toCompositionOperationDto = (record: any): CompositionOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: CompositionOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Type: record.Type,
            Operator: record.Operator,
            Operands: record.Operands,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };
} 