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
            DisplayCode: record.DisplayCode,
            OwnerUserId: record.OwnerUserId,
            RootSectionId: record.RootSectionId,
            DefaultSectionNumbering: record.DefaultSectionNumbering,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayDto(record: any[]): FormTemplateResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: FormTemplateResponseDto[] = [];

        for (let i = 0; i < record.length; i++) {
            const element = record[i];
            dtos.push({
                id: element.id,
                Title: element.Title,
                Description: element.Description,
                CurrentVersion: element.CurrentVersion,
                Type: element.Type,
                DisplayCode: element.DisplayCode,
                OwnerUserId: element.OwnerUserId,
                RootSectionId: element.RootSectionId,
                DefaultSectionNumbering: element.DefaultSectionNumbering,
                CreatedAt: element.CreatedAt,
                UpdatedAt: element.UpdatedAt
            });
        }
            return dtos;
    }
}
