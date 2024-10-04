import { FormTemplateResponseDto } from "../domain.types/forms/form.template.domain.types";

export class FormTemplateMapper {
    static toDto = (record: any): FormTemplateResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FormTemplateResponseDto = {
            id: record.id,
            Title: record.Title,
            Description: record.Description,
            CurrentVersion: record.CurrentVersion,
            Type: record.Type,
            ItemsPerPage: record.ItemsPerPage,
            DisplayCode: record.DisplayCode,
            OwnerUserId: record.OwnerUserId,
            RootSectionId: record.RootSectionId,
            DefaultSectionNumbering: record.DefaultSectionNumbering,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayDto(records: any[]): FormTemplateResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => FormTemplateMapper.toDto(record));
    }
}
