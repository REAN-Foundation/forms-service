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
        Phone: String;
        Email: String;
        Username: String;
        Password: String;
        CreatedAt: Date
    }
    IsActiveSession: boolean;
    StartedAt: Date;
    ValidTill: Date;
}
