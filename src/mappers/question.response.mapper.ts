import { QuestionResponseResponseDto } from "../domain.types/forms/response.domain.types";

export class ResponseMapper {
    static toDto = (record: any): QuestionResponseResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: QuestionResponseResponseDto = {
            id            : record.id,
            FormSubmission: {
                id                 : record.FormSubmission.id,
                TemplateId         : record.FormSubmission.TemplateId,
                FormUrl            : record.FormSubmission.FormUrl,
                UserId             : record.FormSubmission.UserId,
                Status             : record.FormSubmission.Status,
                SubmissionTimestamp: record.FormSubmission.SubmissionTimestamp,
                CreatedAt          : record.FormSubmission.CreatedAt
            },
            Question: {
                id           : record.Question.id,
                Title        : record.Question.Title,
                Description  : record.Question.Description,
                DisplayCode  : record.Question.DisplayCode,
                ResponseType : record.Question.ResponseType,
                Score        : record.Question.Score,
                CorrectAnswer: record.Question.CorrectAnswer,
                Hint         : record.Question.Hint,
                TemplateId   : record.Question.TemplateId,
                SectionId    : record.Question.SectionId,
                CreatedAt    : record.Question.CreatedAt,
                UpdatedAt    : record.Question.UpdatedAt
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
