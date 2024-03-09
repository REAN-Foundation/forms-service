export interface UserLoginSessionCreateModel {
    IsActiveSession: boolean;
    UserId: string;
    ValidTill:Date;
}

export interface UserLoginSessionUpdateModel {
    UserId: string;
    ValidTill:Date;
    IsActiveSession: boolean;

}

export interface UserLoginSessionResponseDto {
    id: string;
    User: {
        FirstName: string;
        LastName: string;
        CountryCode: number;
        Phone: string;
        Email: string;
        Username: string;
        Password: string;
        CreatedAt: Date
    }
    IsActiveSession: boolean;
    StartedAt: Date;
    ValidTill: Date;
}
