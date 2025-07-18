import { InputUnitListResponseDto } from '../../domain.types/input.unit.list.domain.types';

export class InputUnitListMapper {
    static toDto = (record: any): InputUnitListResponseDto => {
        if (record === null) {
            return null;
        }
        let units: any[] = [];
        try {
            units =
                typeof record.Units === 'string'
                    ? JSON.parse(record.Units)
                    : record.Units;
        } catch {
            units = [];
        }
        const dto: InputUnitListResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Units: units,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): InputUnitListResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => InputUnitListMapper.toDto(record));
    }
}
