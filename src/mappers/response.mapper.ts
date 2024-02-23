import { IResponseResponseDto } from "../domain.types/forms/response.domain.types";

export class QuestionMapper {
    static toDto = (record: any): IResponseResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: IResponseResponseDto = {
            id: record.id,
            Form: {
                id: record.Form.id,
                TemplateId: record.Form.TemplateId,
                FormUrl: record.Form.FormUrl,
                UserId: record.Form.UserId,
                Status: record.Form.Status,
                SubmissionTimestamp: record.Form.SubmissionTimestamp,
                CreatedAt: record.Form.CreatedAt
            },
            FormTemplate: {
                id: record.FormTemplate.id,
                Title: record.FormTemplate.Title,
                Description: record.FormTemplate.Description,
                CurrentVersion: record.FormTemplate.CorrectAnswer,
                Type: record.FormTemplate.Type,
                DisplayCode: record.FormTemplate.DisplayCode,
                OwnerUserId: record.FormTemplate.OwnerUserId,
                RootSectionId: record.FormTemplate.RootSectionId,
                DefaultSectionNumbering: record.FormTemplate.DefaultSectionNumbering,
                CreatedAt: record.Template.CreatedAt
            },
            Question: {
                id: record.Question.id,
                Title: record.Question.Title,
                Description: record.Question.Description,
                DisplayCode: record.Question.DisplayCode,
                ResponseType: record.Question.ResponseType,
                Score: record.Question.Score,
                CorrectAnswer: record.Question.CorrectAnswer,
                Hint: record.Question.Hint,
                TemplateId: record.Question.TemplateId,
                SectionId: record.Question.SectionId,
                CreatedAt: record.Question.CreatedAt,
                UpdatedAt: record.Question.UpdatedAt
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

    static toArrayDto(record: any[]): IResponseResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: IResponseResponseDto[] = [];

        record.forEach((element) => {
            dtos.push({
                id: element.id,
                Form: {
                    id: element.Form.id,
                    TemplateId: element.Form.TemplateId,
                    FormUrl: element.Form.FormUrl,
                    UserId: element.Form.UserId,
                    Status: element.Form.Status,
                    SubmissionTimestamp: element.Form.SubmissionTimestamp,
                    CreatedAt: element.Form.CreatedAt
                },
                FormTemplate: {
                    id: element.FormTemplate.id,
                    Title: element.FormTemplate.Title,
                    Description: element.FormTemplate.Description,
                    CurrentVersion: element.FormTemplate.CorrectAnswer,
                    Type: element.FormTemplate.Type,
                    DisplayCode: element.FormTemplate.DisplayCode,
                    OwnerUserId: element.FormTemplate.OwnerUserId,
                    RootSectionId: element.FormTemplate.RootSectionId,
                    DefaultSectionNumbering: element.FormTemplate.DefaultSectionNumbering,
                    CreatedAt: element.Template.CreatedAt
                },
                Question: {
                    id: element.Question.id,
                    Title: element.Question.Title,
                    Description: element.Question.Description,
                    DisplayCode: element.Question.DisplayCode,
                    ResponseType: element.Question.ResponseType,
                    Score: element.Question.Score,
                    CorrectAnswer: element.Question.CorrectAnswer,
                    Hint: element.Question.Hint,
                    TemplateId: element.Question.TemplateId,
                    SectionId: element.Question.SectionId,
                    CreatedAt: element.Question.CreatedAt,
                    UpdatedAt: element.Question.UpdatedAt
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
            return dtos;
        }
        )
    }
}
