// import { UserLoginSessionResponseDto } from "../domain.types/forms/form.section.domain.types";

import { UserLoginSessionResponseDto } from "../../../../domain.types/forms/user.login.session.domain.types";

export class UserLoginSessionMapper {
    static toDto = (record: any): UserLoginSessionResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: UserLoginSessionResponseDto = {
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

    static toArrayDto(record: any[]): UserLoginSessionResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: UserLoginSessionResponseDto[] = [];

        for (let i = 0; i < record.length; i++) {
            const element = record[i];
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
        }
        return dtos;
    }
}
