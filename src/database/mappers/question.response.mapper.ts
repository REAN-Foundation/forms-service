import { QuestionResponseResponseDto } from '../../domain.types/response.domain.types';

export class ResponseMapper {
    static toDto = (record: any): QuestionResponseResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: QuestionResponseResponseDto = {
            id: record.id,
            FormSubmission: record.FormSubmission ? {
                id: record.FormSubmission.id,
                TemplateId: record.FormSubmission.TemplateId,
                FormUrl: record.FormSubmission.FormUrl,
                UserId: record.FormSubmission.UserId,
                Status: record.FormSubmission.Status,
                SubmissionTimestamp: record.FormSubmission.SubmissionTimestamp,
                CreatedAt: record.FormSubmission.CreatedAt,
            } : null,
            Question: record.FormField ? {
                id: record.FormField.id,
                Title: record.FormField.Title,
                Description: record.FormField.Description,
                DisplayCode: record.FormField.DisplayCode,
                ResponseType: record.FormField.ResponseType,
                Score: record.FormField.Score,
                CorrectAnswer: record.FormField.CorrectAnswer,
                Hint: record.FormField.Hint,
                TemplateId: record.FormField.ParentTemplateId,
                SectionId: record.FormField.ParentSectionId,
                CreatedAt: record.FormField.CreatedAt,
                UpdatedAt: record.FormField.UpdatedAt,
            } : null,
            FormFieldId: record.FormFieldId,
            ResponseType: record.ResponseType,
            IntegerValue: record.IntegerValue,
            FloatValue: record.FloatValue,
            BooleanValue: record.BooleanValue,
            DateTimeValue: record.DateTimeValue,
            Url: record.Url,
            FileResourceId: record.FileResourceId,
            TextValue: record.TextValue,
            SubmissionTimestamp: record.SubmissionTimestamp,
            LastSaveTimestamp: record.LastSaveTimestamp,
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
