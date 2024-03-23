import { FormSectionResponseDto } from "../domain.types/forms/form.section.domain.types";

export class FormSectionMapper {
    static toDto = (record: any): FormSectionResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FormSectionResponseDto = {
            id                : record.id,
            ParentFormTemplate: {
                id                     : record.FormTemplates.id,
                Title                  : record.FormTemplates.Title,
                Description            : record.FormTemplates.Description,
                CurrentVersion         : record.FormTemplates.CurrentVersion,
                Type                   : record.FormTemplates.Type,
                DisplayCode            : record.FormTemplates.DisplayCode,
                OwnerUserId            : record.FormTemplates.OwnerUserId,
                RootSectionId          : record.FormTemplates.RootSectionId,
                DefaultSectionNumbering: record.FormTemplates.DefaultSectionNumbering
            },
            SectionIdentifier: record.SectionIdentifier,
            Title            : record.Title,
            Description      : record.Description,
            DisplayCode      : record.DisplayCode,
            Sequence         : record.Sequence,
            ParentSectionId  : record.ParentSectionId,
            CreatedAt        : record.CreatedAt,
            UpdatedAt        : record.UpdatedAt
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
