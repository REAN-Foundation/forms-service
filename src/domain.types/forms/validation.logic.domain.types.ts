import { BaseLogicCreateModel, BaseLogicResponseDto, BaseLogicUpdateModel, ValidationRuleResponseDto } from "./logic.domain.types";
import { LogicType } from "./logic.enums";

// Validation Logic DTOs
export interface ValidationLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType.Validation;
    FieldId: string; // UUID foreign key to FormFieldEntity
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface ValidationLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Validation;
    FieldId?: string; // UUID foreign key to FormFieldEntity
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface ValidationLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Validation;
    Rules?: ValidationRuleResponseDto[];
} 