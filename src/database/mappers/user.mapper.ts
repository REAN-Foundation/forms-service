import { UserResponseDto } from '../../../../domain.types/forms/user.domain.types';

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
            CreatedAt: record.CreatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): UserResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => UserMapper.toDto(record));
    }
}
