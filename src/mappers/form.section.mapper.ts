import { FormSectionResponseDto } from "../domain.types/forms/form.section.domain.types";

export class FormSectionMapper {
    static toDto = (record: any): FormSectionResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FormSectionResponseDto = {
            id: record.id,
            FormTemplates: {
                id: record.FormTemplates.id,
                Title: record.FormTemplates.Title,
                Description: record.FormTemplates.Description,
                CurrentVersion: record.FormTemplates.CurrentVersion,
                Type: record.FormTemplates.Type,
                DisplayCode: record.FormTemplates.DisplayCode,
                OwnerUserId: record.FormTemplates.OwnerUserId,
                RootSectionId: record.FormTemplates.RootSectionId,
                DefaultSectionNumbering: record.FormTemplates.DefaultSectionNumbering
            },
            // TemplateId:record.TemplateId,
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

    static toArrayDto(record: any[]): FormSectionResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: FormSectionResponseDto[] = [];

        for (let i = 0; i < record.length; i++) {
            const obj = record[i];
            // Modify the object or push it to a new array
            dtos.push({
                id: obj.id,
                FormTemplates: {
                    id: obj.FormTemplates.id,
                    Title: obj.FormTemplates.Title,
                    Description: obj.FormTemplates.Description,
                    CurrentVersion: obj.FormTemplates.CorrectAnswer,
                    Type: obj.FormTemplates.Type,
                    DisplayCode: obj.FormTemplates.DisplayCode,
                    OwnerUserId: obj.FormTemplates.OwnerUserId,
                    RootSectionId: obj.FormTemplates.RootSectionId,
                    DefaultSectionNumbering: obj.FormTemplates.DefaultSectionNumbering
                },
                // TemplateId:obj.TemplateId,
                SectionIdentifier: obj.SectionIdentifier,
                Title: obj.Title,
                Description: obj.Description,
                DisplayCode: obj.DisplayCode,
                Sequence: obj.Sequence,
                ParentSectionId: obj.ParentSectionId,
                CreatedAt: obj.CreatedAt,
                UpdatedAt: obj.UpdatedAt
            });
        }
        // record.forEach((record) => {
        //     dtos.push({
        //         id: record.id,
        //         FormTemplates: {
        //             id: record.FormTemplates.id,
        //             Title: record.FormTemplates.Title,
        //             Description: record.FormTemplates.Description,
        //             CurrentVersion: record.FormTemplates.CorrectAnswer,
        //             Type: record.FormTemplates.Type,
        //             DisplayCode: record.FormTemplates.DisplayCode,
        //             OwnerUserId: record.FormTemplates.OwnerUserId,
        //             RootSectionId: record.FormTemplates.RootSectionId,
        //             DefaultSectionNumbering: record.FormTemplates.DefaultSectionNumbering
        //         },
        //         SectionIdentifier: record.SectionIdentifier,
        //         Title: record.Title,
        //         Description: record.Description,
        //         DisplayCode: record.DisplayCode,
        //         Sequence: record.Sequence,
        //         ParentSectionId: record.ParentSectionId,
        //         CreatedAt: record.CreatedAt,
        //         UpdatedAt: record.UpdatedAt
        //     });
        return dtos;
        // }
        // )
    }
}
