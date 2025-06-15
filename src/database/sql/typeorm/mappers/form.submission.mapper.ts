import { FormSubmissionDto } from "../../../../domain.types/forms/form.submission.domain.types";

export class FormMapper {
    static toDto = (record: any): FormSubmissionDto => {
        if (record === null) {
            return null;
        }

        const dto: FormSubmissionDto = {
            id: record.id,
            FormTemplateId: record.FormTemplateId,
            UserId: record.UserId,
            Encrypted: record.Encrypted,
            Unencrypted: record.Unencrypted,
            Link: record.Link,
            LinkQueryParams: JSON.parse(record.LinkQueryParams),
            SubmittedAt: record.SubmittedAt,
            ValidTill: record.ValidTill,
            Category: record.Category,
            Status: record.Status
        };
        return dto;
    };

    // static toArrayDto(record: any[]): FormSubmissionResponseDto[] {
    //     if (record === null) {
    //         return null;
    //     }

    //     const dtos: FormSubmissionResponseDto[] = [];

    //     for (let i = 0; i < record.length; i++) {
    //         const element = record[i];
    //         dtos.push({
    //             id: element.id,
    //             ParentFormTemplateId: element.FormTemplateId,
    //             ParentFormTemplate: {
    //                 id: element.FormTemplate.id,
    //                 Title: element.FormTemplate.Title,
    //                 Description: element.FormTemplate.Description,
    //                 CurrentVersion: element.FormTemplate.CorrectAnswer,
    //                 Type: element.FormTemplate.Type,
    //                 DisplayCode: element.FormTemplate.DisplayCode,
    //                 OwnerUserId: element.FormTemplate.OwnerUserId,
    //                 RootSectionId: element.FormTemplate.RootSectionId,
    //                 DefaultSectionNumbering: element.DefaultSectionNumbering,
    //                 CreatedAt: element.FormTemplate.CreatedAt,
    //                 UpdatedAt: element.FormTemplate.UpdatedAt,
    //             },
    //             // Submitter: {
    //             //     id: element.Submitter.id,
    //             //     FirstName: element.Submitter.FirstName,
    //             //     LastName: element.Submitter.LastName,
    //             //     Phone: element.Submitter.Phone,
    //             //     Email: element.Submitter.Email,
    //             //     UserName: element.Submitter.UserName,
    //             //     CountryCode: element.Submitter.CountryCode
    //             // },
    //             FormUrl: element.FormUrl,
    //             AnsweredByUserId: element.AnsweredByUserId,
    //             Status: element.FormStatus,
    //             SubmissionTimestamp: element.SubmissionTimestamp,
    //             CreatedAt: element.CreatedAt,
    //             UpdatedAt: element.UpdatedAt,
    //         });
    //     }
    //     return dtos;
    // }
}
