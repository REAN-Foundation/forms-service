import { QuestionResponseResponseDto } from "../domain.types/forms/response.domain.types";

export class ResponseMapper {
    static toDto = (record: any): QuestionResponseResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: QuestionResponseResponseDto = {
            id            : record.id,
            FormSubmission: {
                id                 : record.Forms.id,
                TemplateId         : record.Forms.TemplateId,
                FormUrl            : record.Forms.FormUrl,
                UserId             : record.Forms.UserId,
                Status             : record.Forms.Status,
                SubmissionTimestamp: record.Forms.SubmissionTimestamp,
                CreatedAt          : record.Forms.CreatedAt
            },
            Question: {
                id           : record.Questions.id,
                Title        : record.Questions.Title,
                Description  : record.Questions.Description,
                DisplayCode  : record.Questions.DisplayCode,
                ResponseType : record.Questions.ResponseType,
                Score        : record.Questions.Score,
                CorrectAnswer: record.Questions.CorrectAnswer,
                Hint         : record.Questions.Hint,
                TemplateId   : record.Questions.TemplateId,
                SectionId    : record.Questions.SectionId,
                CreatedAt    : record.Questions.CreatedAt,
                UpdatedAt    : record.Questions.UpdatedAt
            },
            ResponseType       : record.ResponseType,
            IntegerValue       : record.IntegerValue,
            FloatValue         : record.FloatValue,
            BooleanValue       : record.BooleanValue,
            DateTimeValue      : record.DateTimeValue,
            Url                : record.Url,
            FileResourceId     : record.FileResourceId,
            TextValue          : record.TextValue,
            SubmissionTimestamp: record.SubmissionTimestamp,
            LastSaveTimestamp  : record.LastSaveTimestamp
        };
        return dto;
    };

    static toArrayDto(records: any[]): QuestionResponseResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => ResponseMapper.toDto(record));
    }

}
