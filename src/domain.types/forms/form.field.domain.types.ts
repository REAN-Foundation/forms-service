import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { FieldResponseType } from "../../database/sql/typeorm/models/form.field/field.types";
import { QueryResponseType } from "./query.response.types";

// Form Field Option Interface
export interface FormFieldOption {
    Text: string;
    Sequence: string;
    ImageUrl: string;
}

// Base Form Field DTOs
export interface FormFieldCreateModel {
    Name: string;
    Label: string;
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    ResponseType: FieldResponseType;
    QueryResponseType?: QueryResponseType;
    Required: boolean;
    Value?: string;
    Score?: number;
    Sequence?: number;
    ExpectedAnswer?: string;
    Hint?: string;
    Options?: string; // JSON serialized
    ImageResourceId?: string;
    RangeMin?: number;
    RangeMax?: number;
    DefaultExpectedUnit?: string;
    PageBreakAfter?: boolean;
    SkipLogicId?: string;
    CalculateLogicId?: string;
    ValidateLogicId?: string;
    TemplateId?: string;
    ParentSectionId?: string;
    FormId?: string;
}

export interface FormFieldUpdateModel {
    Name?: string;
    Label?: string;
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    ResponseType?: FieldResponseType;
    QueryResponseType?: QueryResponseType;
    Required?: boolean;
    Value?: string;
    Score?: number;
    Sequence?: number;
    ExpectedAnswer?: string;
    Hint?: string;
    Options?: string;
    ImageResourceId?: string;
    RangeMin?: number;
    RangeMax?: number;
    DefaultExpectedUnit?: string;
    PageBreakAfter?: boolean;
    SkipLogicId?: string;
    CalculateLogicId?: string;
    ValidateLogicId?: string;
    TemplateId?: string;
    ParentSectionId?: string;
    FormId?: string;
}

export interface FormFieldResponseDto {
    id: string;
    Name: string;
    Label: string;
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    ResponseType: FieldResponseType;
    QueryResponseType?: QueryResponseType;
    Required: boolean;
    Value?: string;
    Score?: number;
    Sequence?: number;
    ExpectedAnswer?: string;
    Hint?: string;
    Options?: string;
    ImageResourceId?: string;
    RangeMin?: number;
    RangeMax?: number;
    DefaultExpectedUnit?: string;
    PageBreakAfter: boolean;
    SkipLogicId?: string;
    CalculateLogicId?: string;
    ValidateLogicId?: string;
    TemplateId?: string;
    ParentSectionId?: string;
    FormId?: string;
    SkipLogic?: {
        id: string;
        Type: string;
        DefaultSkip?: boolean;
    };
    CalculateLogic?: {
        id: string;
        Type: string;
        DefaultSkip?: boolean;
    };
    ValidateLogic?: {
        id: string;
        Type: string;
        DefaultSkip?: boolean;
    };
    FormTemplate?: {
        id: string;
        Title: string;
        Description?: string;
        DisplayCode: string;
    };
    ParentFormSection?: {
        id: string;
        SectionIdentifier: string;
        Title: string;
        Description?: string;
        DisplayCode: string;
    };
    ExpectedInputUnitList?: {
        id: string;
        Name: string;
        Description?: string;
    };
    Responses?: {
        id: string;
        ResponseValue: string;
        CreatedAt: Date;
    }[];
    CreatedAt: Date;
    UpdatedAt?: Date;
}

// Form Field Search DTOs
export interface FormFieldSearchFilters extends BaseSearchFilters {
    id?: string;
    name?: string;
    label?: string;
    title?: string;
    description?: string;
    displayCode?: string;
    responseType?: FieldResponseType;
    queryResponseType?: QueryResponseType;
    required?: boolean;
    score?: number;
    sequence?: number;
    expectedAnswer?: string;
    hint?: string;
    rangeMin?: number;
    rangeMax?: number;
    defaultExpectedUnit?: string;
    pageBreakAfter?: boolean;
    skipLogicId?: string;
    calculateLogicId?: string;
    validateLogicId?: string;
    templateId?: string;
    parentSectionId?: string;
    formId?: string;
}

export interface FormFieldSearchResults extends BaseSearchResults {
    Items: FormFieldSearchResponseDto[];
}

export interface FormFieldSearchResponseDto extends BaseSearchResults {
    id: string;
    Name: string;
    Label: string;
    Title?: string;
    Description?: string;
    DisplayCode?: string;
    ResponseType: FieldResponseType;
    QueryResponseType?: QueryResponseType;
    Required: boolean;
    Value?: string;
    Score?: number;
    Sequence?: number;
    ExpectedAnswer?: string;
    Hint?: string;
    Options?: string;
    ImageResourceId?: string;
    RangeMin?: number;
    RangeMax?: number;
    DefaultExpectedUnit?: string;
    PageBreakAfter: boolean;
    SkipLogicId?: string;
    CalculateLogicId?: string;
    ValidateLogicId?: string;
    TemplateId?: string;
    ParentSectionId?: string;
    FormId?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
} 