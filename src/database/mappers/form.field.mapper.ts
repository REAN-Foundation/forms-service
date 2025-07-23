import {
    FormFieldOption,
    FormFieldResponseDto,
} from '../../domain.types/form.field.domain.types';

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
