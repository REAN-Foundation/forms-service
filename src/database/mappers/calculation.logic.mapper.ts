import { CalculationLogicResponseDto } from '../../../../domain.types/forms/logic.domain.types';
import { LogicType } from '../../../../domain.types/forms/logic.enums';

export class CalculationLogicMapper {
    static toDto = (record: any): CalculationLogicResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: CalculationLogicResponseDto = {
            id: record.id,
            Type: LogicType.Calculation,
            FieldId: record.FieldId,
            Enabled: record.Enabled,
            FallbackValue: record.FallbackValue,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): CalculationLogicResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => CalculationLogicMapper.toDto(record));
    }
}
