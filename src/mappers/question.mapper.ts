import { QuestionResponseDto } from "../domain.types/forms/question.domain.types";

export class QuestionMapper {
    static toDto = (record: any): QuestionResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: QuestionResponseDto = {
            id: record.id,
            Title: record.Title,
            Description: record.Description,
            DisplayCode: record.DisplayCode,
            ResponseType: record.ResponseType,
            Score: record.Score,
            CorrectAnswer: record.CorrectAnswer,
            Hint: record.Hint,
            FormTemplates: {
                id: record.FormTemplates.id,
                Title: record.FormTemplates.Title,
                CurrentVersion: record.FormTemplates.CorrectAnswer,
                Type: record.FormTemplates.Type,
                DisplayCode: record.FormTemplates.DisplayCode,
                OwnerUserId: record.FormTemplates.OwnerUserId,
                RootSectionId: record.FormTemplates.RootSectionId,
                DefaultSectionNumbering: record.FormTemplates.DefaultSectionNumbering,
                CreatedAt: record.FormTemplates.CreatedAt
            },
            FormSections: {
                id: record.FormSection.id,
                SectionIdentifier: record.FormSection.SectionIdentifier,
                Title: record.FormSection.Title,
                Description: record.FormSection.Description,
                DisplayCode: record.FormSection.DisplayCode,
                Sequence: record.FormSection.Sequence,
                ParentSectionId: record.FormSection.ParentSectionId,
                CreatedAt: record.FormSection.CreatedAt
            },
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayDto(record: any[]): QuestionResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: QuestionResponseDto[] = [];

        for (let i = 0; i < record.length; i++) {
            const element = record[i];
            dtos.push({
                id: element.id,
                Title: element.Title,
                Description: element.Description,
                DisplayCode: element.DisplayCode,
                ResponseType: element.ResponseType,
                Score: element.Score,
                CorrectAnswer: element.CorrectAnswer,
                Hint: element.Hint,
                FormTemplates: {
                    id: element.FormTemplates.id,
                    Title: element.FormTemplates.Title,
                    CurrentVersion: element.FormTemplates.CorrectAnswer,
                    Type: element.FormTemplates.Type,
                    DisplayCode: element.FormTemplates.DisplayCode,
                    OwnerUserId: element.FormTemplates.OwnerUserId,
                    RootSectionId: element.FormTemplates.RootSectionId,
                    DefaultSectionNumbering: element.DefaultSectionNumbering,
                    CreatedAt: element.FormTemplates.CreatedAt
                },
                FormSections: {
                    id: element.FormSections.id,
                    SectionIdentifier: element.FormSections.SectionIdentifier,
                    Title: element.FormSections.Title,
                    Description: element.FormSections.Description,
                    DisplayCode: element.FormSections.DisplayCode,
                    Sequence: element.FormSections.Sequence,
                    ParentSectionId: element.FormSections.ParentSectionId,
                    CreatedAt: element.FormSections.CreatedAt
                },
                CreatedAt: element.CreatedAt,
                UpdatedAt: element.UpdatedAt
            });
        }
        return dtos;
    }
}
