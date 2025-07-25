import { QueryResponseType } from './query.response.types';
import {
    BaseSearchFilters,
    BaseSearchResults,
} from './miscellaneous/base.search.types';
import { LogicType } from './enums/logic.enums';
// import { SkipLogicRuleResponseDto } from './rules/skip.logic.rule.domain.types';
import { CalculationRuleResponseDto } from './rules/calculation.rule.domain.types';
import { ValidationRuleResponseDto } from './rules/validation.rule.domain.types';
import { SkipRuleResponseDto } from './rules/skip.rule.domain.types';
import { RuleType } from './enums/rule.enums';

export interface FormFieldOption {
    Text: string;
    Sequence: number;
    ImageUrl?: string;
}

export interface FormFieldCreateModel {
    ParentTemplateId: string;
    ParentSectionId: string;
    Title: string;
    Description?: string;
    DisplayCode: string;
    ResponseType: QueryResponseType;
    Score?: number;
    Sequence?: number;
    CorrectAnswer?: string;
    IsRequired: boolean;
    Hint?: string;
    Options?: FormFieldOption[];
    ImageResourceId?: string;
    RangeMin?: number;
    RangeMax?: number;
    DefaultExpectedUnit?: string;
    PageBreakAfter?: boolean;
    SkipLogicId?: string;
    CalculateLogicId?: string;
    ValidateLogicId?: string;
}

export interface FormFieldUpdateModel {
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    ResponseType?: QueryResponseType;
    Score?: number;
    CorrectAnswer?: string;
    IsRequired?: boolean;
    Hint?: string;
    Options?: FormFieldOption[];
    ImageResourceId?: string;
    RangeMin?: number;
    RangeMax?: number;
    DefaultExpectedUnit?: string;
    PageBreakAfter?: boolean;
    SkipLogicId?: string;
    CalculateLogicId?: string;
    ValidateLogicId?: string;
}

export interface FormFieldResponseDto {
    id: string;
    ParentTemplateId: string;
    ParentSectionId: string;
    Title: string;
    Description?: string;
    DisplayCode: string;
    ResponseType: QueryResponseType;
    Score?: number;
    Sequence: number;
    CorrectAnswer?: string;
    IsRequired: boolean;
    Hint?: string;
    Options?: FormFieldOption[];
    ImageResourceId?: string;
    RangeMin?: number;
    RangeMax?: number;
    DefaultExpectedUnit?: string;
    PageBreakAfter: boolean;
    SkipLogicId?: string;
    CalculateLogicId?: string;
    ValidateLogicId?: string;
    ParentFormSection?: {
        id: string;
        Title: string;
        Description?: string;
        DisplayCode: string;
        Sequence: number;
        ParentSectionId?: string;
        CreatedAt: Date;
    };
    FormTemplate?: {
        id: string;
        Title: string;
        Description?: string;
        Version: string;
        Type: string;
        DisplayCode: string;
        OwnerUserId: string;
        RootSectionId?: string;
        DefaultSectionNumbering: boolean;
        CreatedAt: Date;
    };
    CreatedAt: Date;
    UpdatedAt?: Date;
    SkipLogic?: {
        id: string;
        Type: LogicType;
        FieldId: string;
        Enabled: boolean;
        CreatedAt: Date;
        Name: string;
        Description: string;
        RuleType: RuleType;
        ErrorWhenFalse: boolean;
        ErrorMessage: string;
        Rules: SkipRuleResponseDto[];
    };
    CalculateLogic?: {
        id: string;
        Type: LogicType;
        FieldId: string;
        Enabled: boolean;
        CreatedAt: Date;
        Name: string;
        Description: string;
        RuleType: RuleType;
        ErrorWhenFalse: boolean;
        ErrorMessage: string;
        Rules: CalculationRuleResponseDto[];
    };
    ValidateLogic?: {
        id: string;
        Type: LogicType;
        FieldId: string;
        Enabled: boolean;
        CreatedAt: Date;
        Name: string;
        Description: string;
        RuleType: RuleType;
        ErrorWhenFalse: boolean;
        ErrorMessage: string;
        Rules: ValidationRuleResponseDto[];
    };
}

export interface FormFieldSearchFilters extends BaseSearchFilters {
    ParentTemplateId?: string;
    ParentSectionId?: string;
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    ResponseType?: QueryResponseType;
    Score?: number;
    CorrectAnswer?: string;
    IsRequired?: boolean;
    DefaultExpectedUnit?: string;
    SkipLogicId?: string;
    CalculateLogicId?: string;
    ValidateLogicId?: string;
}

export interface FormFieldSearchResults extends BaseSearchResults {
    Items: FormFieldResponseDto[];
}
