import { SkipLogicResponseDto } from '../../domain.types/logic/skip.logic.domain.types';
import { LogicType } from '../../domain.types/logic.enums';

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
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): SkipLogicResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => SkipLogicMapper.toDto(record));
    }
}
