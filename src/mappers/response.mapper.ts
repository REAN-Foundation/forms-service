import { ResponseResponseDto } from "../domain.types/forms/response.domain.types";

export class ResponseMapper {
    static toDto = (record: any): ResponseResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: ResponseResponseDto = {
            id: record.id,
            Forms: {
                id: record.Forms.id,
                TemplateId: record.Forms.TemplateId,
                FormUrl: record.Forms.FormUrl,
                UserId: record.Forms.UserId,
                Status: record.Forms.Status,
                SubmissionTimestamp: record.Forms.SubmissionTimestamp,
                CreatedAt: record.Forms.CreatedAt
            },
            FormTemplates: {
                id: record.FormTemplates.id,
                Title: record.FormTemplates.Title,
                Description: record.FormTemplates.Description,
                CurrentVersion: record.FormTemplates.CorrectAnswer,
                Type: record.FormTemplates.Type,
                DisplayCode: record.FormTemplates.DisplayCode,
                OwnerUserId: record.FormTemplates.OwnerUserId,
                RootSectionId: record.FormTemplates.RootSectionId,
                DefaultSectionNumbering: record.FormTemplates.DefaultSectionNumbering,
                CreatedAt: record.FormTemplates.CreatedAt
            },
            Questions: {
                id: record.Questions.id,
                Title: record.Questions.Title,
                Description: record.Questions.Description,
                DisplayCode: record.Questions.DisplayCode,
                ResponseType: record.Questions.ResponseType,
                Score: record.Questions.Score,
                CorrectAnswer: record.Questions.CorrectAnswer,
                Hint: record.Questions.Hint,
                TemplateId: record.Questions.TemplateId,
                SectionId: record.Questions.SectionId,
                CreatedAt: record.Questions.CreatedAt,
                UpdatedAt: record.Questions.UpdatedAt
            },
            ResponseType: record.ResponseType,
            IntegerValue: record.IntegerValue,
            FloatValue: record.FloatValue,
            BooleanValue: record.BooleanValue,
            DateTimeValue: record.DateTimeValue,
            Url: record.Url,
            FileResourceId: record.FileResourceId,
            TextValue: record.TextValue,
            SubmissionTimestamp: record.SubmissionTimestamp,
            LastSaveTimestamp: record.LastSaveTimestamp
        };
        return dto;
    };

    static toArrayDto(record: any[]): ResponseResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: ResponseResponseDto[] = [];

        for (let i = 0; i < record.length; i++) {
            const element = record[i];
            dtos.push({
                id: element.id,
                Forms: {
                    id: element.Forms.id,
                    TemplateId: element.Forms.TemplateId,
                    FormUrl: element.Forms.FormUrl,
                    UserId: element.Forms.UserId,
                    Status: element.Forms.Status,
                    SubmissionTimestamp: element.Forms.SubmissionTimestamp,
                    CreatedAt: element.Forms.CreatedAt
                },
                FormTemplates: {
                    id: element.FormTemplates.id,
                    Title: element.FormTemplates.Title,
                    Description: element.FormTemplates.Description,
                    CurrentVersion: element.FormTemplates.CorrectAnswer,
                    Type: element.FormTemplates.Type,
                    DisplayCode: element.FormTemplates.DisplayCode,
                    OwnerUserId: element.FormTemplates.OwnerUserId,
                    RootSectionId: element.FormTemplates.RootSectionId,
                    DefaultSectionNumbering: element.FormTemplates.DefaultSectionNumbering,
                    CreatedAt: element.Template.CreatedAt
                },
                Questions: {
                    id: element.Questions.id,
                    Title: element.Questions.Title,
                    Description: element.Questions.Description,
                    DisplayCode: element.Questions.DisplayCode,
                    ResponseType: element.Questions.ResponseType,
                    Score: element.Questions.Score,
                    CorrectAnswer: element.Questions.CorrectAnswer,
                    Hint: element.Questions.Hint,
                    TemplateId: element.Questions.TemplateId,
                    SectionId: element.Questions.SectionId,
                    CreatedAt: element.Questions.CreatedAt,
                    UpdatedAt: element.Questions.UpdatedAt
                },
                ResponseType: element.ResponseType,
                IntegerValue: element.IntegerValue,
                FloatValue: element.FloatValue,
                BooleanValue: element.BooleanValue,
                DateTimeValue: element.DateTimeValue,
                Url: element.Url,
                FileResourceId: element.FileResourceId,
                TextValue: element.TextValue,
                SubmissionTimestamp: element.SubmissionTimestamp,
                LastSaveTimestamp: element.LastSaveTimestamp
            });
        }
        return dtos;
        
    }
}
