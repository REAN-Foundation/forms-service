import {
    IterateOperationResponseDto,
} from "../../../../domain.types/forms/operation.domain.types";

export class IterateOperationMapper {
    static toDto = (record: any): IterateOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: IterateOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Type: record.Type,
            CollectionField: record.CollectionField,
            ResultField: record.ResultField,
            OperationId: record.OperationId,
            FilterExpression: record.FilterExpression,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toIterateOperationDto = (record: any): IterateOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: IterateOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Type: record.Type,
            CollectionField: record.CollectionField,
            ResultField: record.ResultField,
            OperationId: record.OperationId,
            FilterExpression: record.FilterExpression,
            Operation: record.Operation ? {
                id: record.Operation.id,
                Name: record.Operation.Name,
                Description: record.Operation.Description
            } : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };
}