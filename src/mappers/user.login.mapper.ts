import { IFormSectionResponseDto } from "../domain.types/forms/user.login.session.domain.types";

export class FormMapper {
    static toDto = (record: any): IFormSectionResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: IFormSectionResponseDto = {
            id: record.id,
            User: {
                FirstName: record.User.FirstName,
                LastName: record.User.LastName,
                CountryCode: record.User.CountryCode,
                Phone: record.User.Phone,
                Email: record.User.Email,
                Username: record.User.Username,
                Password: record.User.Password,
                CreatedAt: record.User.CreatedAt
            },
            IsActiveSession: record.IsActiveSession,
            StartedAt: record.StartedAt,
            ValidTill: record.ValidTill
        };
        return dto;
    };

    static toArrayDto(record: any[]): IFormSectionResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: IFormSectionResponseDto[] = [];

        record.forEach((element) => {
            dtos.push({
                id: element.id,
                User: {
                    FirstName: element.User.FirstName,
                    LastName: element.User.LastName,
                    CountryCode: element.User.CountryCode,
                    Phone: element.User.Phone,
                    Email: element.User.Email,
                    Username: element.User.Username,
                    Password: element.User.Password,
                    CreatedAt: element.User.CreatedAt
                },
                IsActiveSession: element.IsActiveSession,
                StartedAt: element.StartedAt,
                ValidTill: element.ValidTill
            });
            return dtos;
        })
    }
}
