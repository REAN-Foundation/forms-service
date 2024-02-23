import { IFormSectionResponseDto } from "../domain.types/forms/form.section.domain.types";

export class FormMapper {
    static toDto = (record: any): IFormSectionResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: IFormSectionResponseDto = {
            id: record.id,
            Template: {
                id: record.Template.id,
                Title: record.Template.Title,
                Description: record.Template.Description,
                CurrentVersion: record.Template.CurrentVersion,
                Type: record.Template.Type,
                DisplayCode: record.Template.DisplayCode,
                OwnerUserId: record.Template.OwnerUserId,
                RootSectionId: record.Template.RootSectionId,
                DefaultSectionNumbering: record.DefaultSectionNumbering
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

    static toArrayDto(record: any[]): IFormSectionResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: IFormSectionResponseDto[] = [];

        record.forEach((element) => {
            dtos.push({
                id: element.id,
                Template: {
                    id: element.Template.id,
                    Title: element.Template.Title,
                    Description: element.Template.Description,
                    CurrentVersion: element.Template.CorrectAnswer,
                    Type: element.Template.Type,
                    DisplayCode: element.Template.DisplayCode,
                    OwnerUserId: element.Template.OwnerUserId,
                    RootSectionId: element.Template.RootSectionId,
                    DefaultSectionNumbering: element.DefaultSectionNumbering
                },
                SectionIdentifier: element.SectionIdentifier,
                Title: element.Title,
                Description: element.Description,
                DisplayCode: element.DisplayCode,
                Sequence: element.Sequence,
                ParentSectionId: element.ParentSectionId,
                CreatedAt: element.CreatedAt,
                UpdatedAt: element.UpdatedAt
            });
            return dtos;
        }
        )
    }
}
