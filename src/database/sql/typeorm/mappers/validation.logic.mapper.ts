import {
    ValidationLogicResponseDto,
} from "../../../../domain.types/forms/logic.domain.types";
import { LogicType } from "../../../../domain.types/forms/logic.enums";

export class ValidationLogicMapper {
    static toDto = (record: any): ValidationLogicResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: ValidationLogicResponseDto = {
            id: record.id,
            Type: LogicType.Validation,
            FieldId: record.FieldId,
            Enabled: record.Enabled,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayDto(records: any[]): ValidationLogicResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => ValidationLogicMapper.toDto(record));
    }
} 