import { IformResponseDto } from "../domain.types/forms/form.domain.types";

export class FormMapper {
    static toDto = (record: any): IformResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: IformResponseDto = {
            id: record.id,
            Template: {
                id: record.Template.id,
                Title: record.Template.Title,
                Description: record.Template.Description,
                CurrentVersion: record.Template.CorrectAnswer,
                Type: record.Template.Type,
                DisplayCode: record.Template.DisplayCode,
                OwnerUserId: record.Template.OwnerUserId,
                RootSectionId: record.Template.RootSectionId,
                DefaultSectionNumbering: record.DefaultSectionNumbering,
                CreatedAt: record.Template.CreatedAt,
                UpdatedAt: record.Template.UpdatedAt
            },
            FormUrl: record.FormUrl,
            User: {
                id: record.User.id,
                FirstName: record.User.FirstName,
                LastName: record.User.LastName,
                CountryCode: record.User.CountryCode,
                Phone: record.User.Phone,
                Email: record.User.Email,
                Username: record.User.User
            },
            Status: record.FormStatus,
            SubmissionTimestamp: record.SubmissionTimestamp,
            CreatedAt: record.CreatedAt
        };
        return dto;
    };

    static toArrayDto(record: any[]): IformResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: IformResponseDto[] = [];

        record.forEach((element) => {
            dtos.push({
                id: element.id,
                Template: {
                    id: element.Template.id,
                    Title: element.Template.Title,
                    Description: element.Template.Description,
                    CurrentVersion: element.Template.CorrectAnswer,
                    Type: element.Template.Type,
                    DisplayCode: element.Template.DisplayCode,
                    OwnerUserId: element.Template.OwnerUserId,
                    RootSectionId: element.Template.RootSectionId,
                    DefaultSectionNumbering: element.DefaultSectionNumbering,
                    CreatedAt: element.Template.CreatedAt,
                    UpdatedAt: element.Template.UpdatedAt
                },
                FormUrl: element.FormUrl,
                User: {
                    id: element.User.id,
                    FirstName: element.User.FirstName,
                    LastName: element.User.LastName,
                    CountryCode: element.User.CountryCode,
                    Phone: element.User.Phone,
                    Email: element.User.Email,
                    Username: element.User.User
                },
                Status: element.FormStatus,
                SubmissionTimestamp: element.SubmissionTimestamp,
                CreatedAt: element.CreatedAt
            });
            return dtos;
        }
        )
    }
}
