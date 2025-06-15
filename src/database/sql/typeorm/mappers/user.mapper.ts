import { UserResponseDto } from "../../../../domain.types/forms/user.domain.types";

export class UserMapper {
    static toDto = (record: any): UserResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: UserResponseDto = {
            id: record.id,
            FirstName: record.FirstName,
            LastName: record.LastName,
            CountryCode: record.CountryCode,
            Phone: record.Phone,
            Email: record.Email,
            Username: record.Username,
            Password: record.Password,
            CreatedAt: record.CreatedAt
        };
        return dto;
    };

    static toArrayDto(record: any[]): UserResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: UserResponseDto[] = [];

        for (let i = 0; i < record.length; i++) {
            const element = record[i];
            dtos.push({
                id: element.id,
                FirstName: element.FirstName,
                LastName: element.LastName,
                CountryCode: element.CountryCode,
                Phone: element.Phone,
                Email: element.Email,
                Username: element.Username,
                Password: element.Password,
                CreatedAt: element.CreatedAt
            });
        }
        return dtos;

    }
}
