import { LogicType } from '../logic.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

// id: string;
// CreatedAt: Date;
// UpdatedAt ?: Date;
// DeletedAt ?: Date;

// FieldId: string;
// Enabled: boolean;

export interface BaseLogicCreateModel {
    FieldId: string;
    Enabled?: boolean;
    Type: LogicType;
}

export interface BaseLogicUpdateModel {
    Type?: LogicType;
    FieldId?: string;
    Enabled?: boolean;
}

export interface BaseLogicResponseDto {
    id: string;
    Type: LogicType;
    FieldId: string;
    Enabled: boolean;
    CreatedAt: Date;
    UpdatedAt?: Date;
}