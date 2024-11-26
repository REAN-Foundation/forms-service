import { FormSectionResponseDto } from "../domain.types/forms/form.section.domain.types";

export class FormSectionMapper {
    static toDto = (record: any): FormSectionResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FormSectionResponseDto = {
            id: record.id,
            ParentFormTemplate: {
                id: record.ParentFormTemplate.id,
                Title: record.ParentFormTemplate.Title,
                Description: record.ParentFormTemplate.Description,
                CurrentVersion: record.ParentFormTemplate.CurrentVersion,
                Type: record.ParentFormTemplate.Type,
                DisplayCode: record.ParentFormTemplate.DisplayCode,
                OwnerUserId: record.ParentFormTemplate.OwnerUserId,
                RootSectionId: record.ParentFormTemplate.RootSectionId,
                DefaultSectionNumbering: record.ParentFormTemplate.DefaultSectionNumbering
            },
            SectionIdentifier: record.SectionIdentifier,
            Title: record.Title,
            Description: record.Description,
            DisplayCode: record.DisplayCode,
            Sequence: record.Sequence,
            ParentSectionId: record.ParentSectionId,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayDto(records: any[]): FormSectionResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => FormSectionMapper.toDto(record));
    }
}
