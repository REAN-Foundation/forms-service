import { LogicType } from "../enums/logic.enums";
import { Operation } from "../operations/base.operation.domain.types";
import { CalculationRule, SkipRule, ValidationRule } from "../rules/base.rule.domain.types";
import { CalculationLogicResponseDto } from "./calculation.logic.domain.types";
import { SkipLogicResponseDto } from "./skip.logic.domain.types";
import { ValidationLogicResponseDto } from "./validation.logic.domain.types";


///////////////////////////////////////////////////////////////////////////////////////////////
export interface BaseLogicCreateModel {
    FieldId: string;
    Enabled?: boolean;
}

export interface BaseLogicUpdateModel {
    FieldId?: string;
    Enabled?: boolean;
}

export interface BaseLogicResponseDto {
    id: string;
    FieldId: string;
    Enabled: boolean;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export type LogicResponseDto =
    | SkipLogicResponseDto
    | CalculationLogicResponseDto
    | ValidationLogicResponseDto;

export interface Rule {
    id: string;
    Name: string;
    Description?: string;
    Operation: Operation;
    ErrorMessage?: string;     // For validation rules
}

export interface Logic {
    id: string;
    Type: LogicType;
    FieldId: string;
    Rules?: Rule[];
    FallbackRule?: Rule;
    Enabled: boolean;
}

// New Logic Interfaces with Specific Rule Types

export interface SkipLogic {
    id: string;
    Type: LogicType.Skip;
    FieldId: string;
    Enabled: boolean;
    Rules?: SkipRule[];
    DefaultSkip?: boolean;  // Default behavior when no rules match
}

export interface CalculationLogic {
    id: string;
    Type: LogicType.Calculation;
    FieldId: string;
    Enabled: boolean;
    Rules?: CalculationRule[];
    FallbackValue?: any;  // Default value when no rules match
}

export interface ValidationLogic {
    id: string;
    Type: LogicType.Validation;
    FieldId: string;
    Enabled: boolean;
    Rules?: ValidationRule[];
}

export type TypedLogic = SkipLogic | CalculationLogic | ValidationLogic;
