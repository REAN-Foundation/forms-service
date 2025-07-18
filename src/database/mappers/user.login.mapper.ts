import { UserLoginSessionResponseDto } from '../../domain.types/user.login.session.domain.types';

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
                CreatedAt: record.User.CreatedAt,
            },
            IsActiveSession: record.IsActiveSession,
            StartedAt: record.StartedAt,
            ValidTill: record.ValidTill,
        };
        return dto;
    };

    static toArrayDto(records: any[]): UserLoginSessionResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => UserLoginSessionMapper.toDto(record));
    }
}
