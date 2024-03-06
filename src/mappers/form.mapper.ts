import { FormResponseDto } from "../domain.types/forms/form.domain.types";

export class FormMapper {
    static toDto = (record: any): FormResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FormResponseDto = {
            id: record.id,
            FormTemplate: {
                id: record.FormTemplate.id,
                Title: record.FormTemplate.Title,
                Description: record.FormTemplate.Description,
                CurrentVersion: record.FormTemplate.CorrectAnswer,
                Type: record.FormTemplate.Type,
                DisplayCode: record.FormTemplate.DisplayCode,
                OwnerUserId: record.FormTemplate.OwnerUserId,
                RootSectionId: record.FormTemplate.RootSectionId,
                DefaultSectionNumbering: record.DefaultSectionNumbering,
                CreatedAt: record.FormTemplate.CreatedAt,
                UpdatedAt: record.FormTemplate.UpdatedAt,
            },
            FormUrl: record.FormUrl,
            User: {
                id: record.User.id,
                FirstName: record.User.FirstName,
                LastName: record.User.LastName,
                CountryCode: record.User.CountryCode,
                Phone: record.User.Phone,
                Email: record.User.Email,
                Username: record.User.User,
            },
            Status: record.FormStatus,
            SubmissionTimestamp: record.SubmissionTimestamp,
            CreatedAt: record.CreatedAt,
        };
        return dto;
    };

    static toArrayDto(record: any[]): FormResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: FormResponseDto[] = [];

        for (let i = 0; i < record.length; i++) {
            const element = record[i];
            dtos.push({
                id: element.id,
                FormTemplate: {
                    id: element.FormTemplate.id,
                    Title: element.FormTemplate.Title,
                    Description: element.FormTemplate.Description,
                    CurrentVersion: element.FormTemplate.CorrectAnswer,
                    Type: element.FormTemplate.Type,
                    DisplayCode: element.FormTemplate.DisplayCode,
                    OwnerUserId: element.FormTemplate.OwnerUserId,
                    RootSectionId: element.FormTemplate.RootSectionId,
                    DefaultSectionNumbering: element.DefaultSectionNumbering,
                    CreatedAt: element.FormTemplate.CreatedAt,
                    UpdatedAt: element.FormTemplate.UpdatedAt,
                },
                FormUrl: element.FormUrl,
                User: {
                    id: element.User.id,
                    FirstName: element.User.FirstName,
                    LastName: element.User.LastName,
                    CountryCode: element.User.CountryCode,
                    Phone: element.User.Phone,
                    Email: element.User.Email,
                    Username: element.User.User,
                },
                Status: element.FormStatus,
                SubmissionTimestamp: element.SubmissionTimestamp,
                CreatedAt: element.CreatedAt
            });
        }
        return dtos;
    }
}
