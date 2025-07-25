import {
    FormFieldOption,
    FormFieldResponseDto,
} from '../../domain.types/form.field.domain.types';
import { ValidationRuleMapper } from './validation.rule.mapper';
// import { SkipLogicRuleMapper } from './skip.logic.rule.mapper';
import { CalculationRuleMapper } from './calculation.rule.mapper';
import { SkipRuleMapper } from './skip.rule.mapper';

export class FormFieldMapper {
    static toDto = (record: any): FormFieldResponseDto => {
        if (record === null) {
            return null;
        }

        let options: FormFieldOption[] = [];
        if (record.Options) {
            try {
                options = typeof record.Options === 'string'
                    ? JSON.parse(record.Options)
                    : record.Options;
            } catch (error) {
                options = [];
            }
        }

        const dto: FormFieldResponseDto = {
            id: record.id,
            ParentTemplateId: record.TemplateId,
            ParentSectionId: record.ParentSectionId,
            Title: record.Title,
            Description: record.Description,
            DisplayCode: record.DisplayCode,
            ResponseType: record.ResponseType,
            Score: record.Score,
            Sequence: record.Sequence,
            CorrectAnswer: record.CorrectAnswer,
            IsRequired: record.IsRequired,
            Hint: record.Hint,
            Options: options,
            ImageResourceId: record.ImageResourceId,
            RangeMin: record.RangeMin,
            RangeMax: record.RangeMax,
            DefaultExpectedUnit: record.DefaultExpectedUnit,
            PageBreakAfter: record.PageBreakAfter,
            ParentFormSection: record.ParentFormSection ? {
                id: record.ParentFormSection.id,
                Title: record.ParentFormSection.Title,
                Description: record.ParentFormSection.Description,
                DisplayCode: record.ParentFormSection.DisplayCode,
                Sequence: record.ParentFormSection.Sequence,
                ParentSectionId: record.ParentFormSection.ParentSectionId,
                CreatedAt: record.ParentFormSection.CreatedAt,
            } : null,
            FormTemplate: record.FormTemplate ? {
                id: record.FormTemplate.id,
                Title: record.FormTemplate.Title,
                Description: record.FormTemplate.Description,
                Version: record.FormTemplate.CurrentVersion,
                Type: record.FormTemplate.Type,
                DisplayCode: record.FormTemplate.DisplayCode,
                OwnerUserId: record.FormTemplate.OwnerUserId,
                RootSectionId: record.FormTemplate.RootSectionId,
                DefaultSectionNumbering: record.FormTemplate.DefaultSectionNumbering,
                CreatedAt: record.FormTemplate.CreatedAt,
            } : null,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
            SkipLogicId: record.SkipLogicId,
            CalculateLogicId: record.CalculateLogicId,
            ValidateLogicId: record.ValidateLogicId,
            SkipLogic: record.SkipLogic ? {
                id: record.SkipLogic.id,
                Type: record.SkipLogic.Type,
                FieldId: record.SkipLogic.FieldId,
                Enabled: record.SkipLogic.Enabled,
                CreatedAt: record.SkipLogic.CreatedAt,
                Name: record.SkipLogic.Name,
                Description: record.SkipLogic.Description,
                RuleType: record.SkipLogic.RuleType,
                ErrorWhenFalse: record.SkipLogic.ErrorWhenFalse,
                ErrorMessage: record.SkipLogic.ErrorMessage,
                Rules: record.SkipLogic.Rules ? record.SkipLogic.Rules.map(rule => SkipRuleMapper.toDto(rule)) : [],
            } : null,
            CalculateLogic: record.CalculateLogic ? {
                id: record.CalculateLogic.id,
                Type: record.CalculateLogic.Type,
                FieldId: record.CalculateLogic.FieldId,
                Enabled: record.CalculateLogic.Enabled,
                CreatedAt: record.CalculateLogic.CreatedAt,
                Name: record.CalculateLogic.Name,
                Description: record.CalculateLogic.Description,
                RuleType: record.CalculateLogic.RuleType,
                ErrorWhenFalse: record.CalculateLogic.ErrorWhenFalse,
                ErrorMessage: record.CalculateLogic.ErrorMessage,
                Rules: record.CalculateLogic.Rules ? record.CalculateLogic.Rules.map(rule => CalculationRuleMapper.toDto(rule)) : [],
            } : null,
            ValidateLogic: record.ValidateLogic ? {
                id: record.ValidateLogic.id,
                Type: record.ValidateLogic.Type,
                FieldId: record.ValidateLogic.FieldId,
                Enabled: record.ValidateLogic.Enabled,
                CreatedAt: record.ValidateLogic.CreatedAt,
                Name: record.ValidateLogic.Name,
                Description: record.ValidateLogic.Description,
                RuleType: record.ValidateLogic.RuleType,
                ErrorWhenFalse: record.ValidateLogic.ErrorWhenFalse,
                ErrorMessage: record.ValidateLogic.ErrorMessage,
                Rules: record.ValidateLogic.Rules ? record.ValidateLogic.Rules.map(rule => ValidationRuleMapper.toDto(rule)) : [],
            } : null,
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
