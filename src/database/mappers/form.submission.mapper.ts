import { FormSubmissionDto } from '../../domain.types/form.submission.domain.types';

export class FormSubmissionMapper {
    static toDto = (record: any): FormSubmissionDto => {
        if (record === null) {
            return null;
        }

        const dto: FormSubmissionDto = {
            id: record.id,
            FormTemplateId: record.FormTemplateId,
            Title: record.Title,
            UserId: record.UserId,
            Encrypted: record.Encrypted,
            Unencrypted: record.Unencrypted,
            Link: record.Link,
            LinkQueryParams: JSON.parse(record.LinkQueryParams),
            SubmittedAt: record.SubmittedAt,
            ValidTill: record.ValidTill,
            Category: record.Category,
            Status: record.Status,
        };
        return dto;
    };

    static toArrayDto(records: any[]): FormSubmissionDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => FormSubmissionMapper.toDto(record));
    }
}
