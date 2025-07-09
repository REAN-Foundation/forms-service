import { FavoriteTemplateResponseDto } from "../../../../domain.types/forms/favorite.template.domain.types";

export class FavoriteTemplateMapper {
    static toDto = (record: any): FavoriteTemplateResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FavoriteTemplateResponseDto = {
            id: record.id,
            UserId: record.UserId,
            TemplateId: record.TemplateId,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayDto(records: any[]): FavoriteTemplateResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => FavoriteTemplateMapper.toDto(record));
    }
} 