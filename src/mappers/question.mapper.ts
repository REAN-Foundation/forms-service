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
            Template: {
                id: record.Template.id,
                Title: record.Template.Title,
                CurrentVersion: record.Template.CorrectAnswer,
                Type: record.Template.Type,
                DisplayCode: record.Template.DisplayCode,
                OwnerUserId: record.Template.OwnerUserId,
                RootSectionId: record.Template.RootSectionId,
                DefaultSectionNumbering: record.Template.DefaultSectionNumbering,
                CreatedAt: record.Template.CreatedAt
            },
            Section: {
                id: record.Section.id,
                SectionIdentifier: record.Section.SectionIdentifier,
                Title: record.Section.Title,
                Description: record.Section.Description,
                DisplayCode: record.Section.DisplayCode,
                Sequence: record.Section.Sequence,
                ParentSectionId: record.Section.ParentSectionId,
                CreatedAt: record.Section.CreatedAt
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
                Template: {
                    id: element.Template.id,
                    Title: element.Template.Title,
                    CurrentVersion: element.Template.CorrectAnswer,
                    Type: element.Template.Type,
                    DisplayCode: element.Template.DisplayCode,
                    OwnerUserId: element.Template.OwnerUserId,
                    RootSectionId: element.Template.RootSectionId,
                    DefaultSectionNumbering: element.DefaultSectionNumbering,
                    CreatedAt: element.Template.CreatedAt
                },
                Section: {
                    id: element.Section.id,
                    SectionIdentifier: element.Section.SectionIdentifier,
                    Title: element.Section.Title,
                    Description: element.Section.Description,
                    DisplayCode: element.Section.DisplayCode,
                    Sequence: element.Section.Sequence,
                    ParentSectionId: element.Section.ParentSectionId,
                    CreatedAt: element.Section.CreatedAt
                },
                CreatedAt: element.CreatedAt,
                UpdatedAt: element.UpdatedAt
            });
        }
        return dtos;
    }
}
