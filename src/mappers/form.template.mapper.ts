import { IFormTemplateResponseDto } from "../domain.types/forms/form.template.domain.types";

export class FormMapper {
    static toDto = (record: any): IFormTemplateResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: IFormTemplateResponseDto = {
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

    static toArrayDto(record: any[]): IFormTemplateResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: IFormTemplateResponseDto[] = [];

        record.forEach((element) => {
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
            return dtos;
        }
        )
    }
}
