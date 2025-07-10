import { 
    FormFieldResponseDto
} from "../../../../domain.types/forms/form.field.domain.types";

export class FormFieldMapper {
    static toDto = (record: any): FormFieldResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FormFieldResponseDto = {
            id: record.id,
            Name: record.Name,
            Label: record.Label,
            Title: record.Title,
            Description: record.Description,
            DisplayCode: record.DisplayCode,
            ResponseType: record.ResponseType,
            QueryResponseType: record.QueryResponseType,
            Required: record.Required,
            Value: record.Value,
            Score: record.Score,
            Sequence: record.Sequence,
            ExpectedAnswer: record.ExpectedAnswer,
            Hint: record.Hint,
            Options: record.Options,
            ImageResourceId: record.ImageResourceId,
            RangeMin: record.RangeMin,
            RangeMax: record.RangeMax,
            DefaultExpectedUnit: record.DefaultExpectedUnit,
            PageBreakAfter: record.PageBreakAfter,
            SkipLogicId: record.SkipLogicId,
            CalculateLogicId: record.CalculateLogicId,
            ValidateLogicId: record.ValidateLogicId,
            TemplateId: record.TemplateId,
            ParentSectionId: record.ParentSectionId,
            FormId: record.FormId,
            SkipLogic: record.SkipLogic ? {
                id: record.SkipLogic.id,
                Type: record.SkipLogic.Type,
                DefaultSkip: record.SkipLogic.DefaultSkip
            } : undefined,
            CalculateLogic: record.CalculateLogic ? {
                id: record.CalculateLogic.id,
                Type: record.CalculateLogic.Type,
                DefaultSkip: record.CalculateLogic.DefaultSkip
            } : undefined,
            ValidateLogic: record.ValidateLogic ? {
                id: record.ValidateLogic.id,
                Type: record.ValidateLogic.Type,
                DefaultSkip: record.ValidateLogic.DefaultSkip
            } : undefined,
            FormTemplate: record.FormTemplate ? {
                id: record.FormTemplate.id,
                Title: record.FormTemplate.Title,
                Description: record.FormTemplate.Description,
                DisplayCode: record.FormTemplate.DisplayCode
            } : undefined,
            ParentFormSection: record.ParentFormSection ? {
                id: record.ParentFormSection.id,
                SectionIdentifier: record.ParentFormSection.SectionIdentifier,
                Title: record.ParentFormSection.Title,
                Description: record.ParentFormSection.Description,
                DisplayCode: record.ParentFormSection.DisplayCode
            } : undefined,
            ExpectedInputUnitList: record.ExpectedInputUnitList ? {
                id: record.ExpectedInputUnitList.id,
                Name: record.ExpectedInputUnitList.Name,
                Description: record.ExpectedInputUnitList.Description
            } : undefined,
            Responses: record.Responses ? record.Responses.map((response: any) => ({
                id: response.id,
                ResponseValue: response.ResponseValue,
                CreatedAt: response.CreatedAt
            })) : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayDto(records: any[]): FormFieldResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => FormFieldMapper.toDto(record));
    }
} 