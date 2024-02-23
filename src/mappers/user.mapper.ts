import { IUserResponseDto } from "../domain.types/forms/user.domain.types";

export class FormMapper {
    static toDto = (record: any): IUserResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: IUserResponseDto = {
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

    static toArrayDto(record: any[]): IUserResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: IUserResponseDto[] = [];

        record.forEach((element) => {
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
            return dtos;
        }
        )
    }
}
