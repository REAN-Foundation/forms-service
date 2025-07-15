import {
    SkipLogicResponseDto,
} from "../../../../domain.types/forms/logic.domain.types";
import { LogicType } from "../../../../domain.types/forms/logic.enums";

export class SkipLogicMapper {
    static toDto = (record: any): SkipLogicResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: SkipLogicResponseDto = {
            id: record.id,
            Type: LogicType.Skip,
            FieldId: record.FieldId,
            Enabled: record.Enabled,
            DefaultSkip: record.DefaultSkip,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toSkipLogicDto = (record: any): SkipLogicResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: SkipLogicResponseDto = {
            id: record.id,
            Type: LogicType.Skip,
            FieldId: record.FieldId,
            Enabled: record.Enabled,
            DefaultSkip: record.DefaultSkip,
            Rules: record.Rules ? record.Rules.map((rule: any) => ({
                id: rule.id,
                OperationId: rule.OperationId,
                SkipWhenTrue: rule.SkipWhenTrue,
                LogicId: rule.LogicId,
                CreatedAt: rule.CreatedAt,
                UpdatedAt: rule.UpdatedAt
            })) : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };
}