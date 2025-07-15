import { FormFieldOption, FormFieldResponseDto } from "../../../../domain.types/forms/form.field.domain.types";

export class FormFieldMapper {
    static toDto = (record: any): FormFieldResponseDto => {
        if (record === null) {
            return null;
        }

        // Parse the Options JSON if it's present
        let options: FormFieldOption[] = [];
        if (record.Options !== null && record.Options !== undefined) {
            try {
                options = typeof record.Options === 'string' ? JSON.parse(record.Options) : record.Options;
            } catch (error) {
                options = [];
            }
        }

        // Map the record to FormFieldResponseDto
        const dto: FormFieldResponseDto = {
            id: record.id,
            Title: record.Title,
            Description: record.Description,
            DisplayCode: record.DisplayCode ?? null,
            ResponseType: record.ResponseType,
            Score: record.Score,
            Sequence: record.Sequence,
            CorrectAnswer: record.ExpectedAnswer,
            IsRequired: record.IsRequired,
            Hint: record.Hint,
            Options: options,
            QuestionImageUrl: record.ImageResourceId,
            RangeMin: record.RangeMin,
            RangeMax: record.RangeMax,
            ParentFormSection: record.ParentFormSection ? {
                id: record.ParentFormSection.id,
                SectionIdentifier: record.ParentFormSection.SectionIdentifier,
                Title: record.ParentFormSection.Title,
                Description: record.ParentFormSection.Description,
                DisplayCode: record.ParentFormSection.DisplayCode,
                Sequence: record.ParentFormSection.Sequence,
                ParentSectionId: record.ParentFormSection.ParentSectionId,
                CreatedAt: record.ParentFormSection.CreatedAt,
            } : null,
            ParentFormTemplate: record.FormTemplate ? {
                id: record.FormTemplate.id,
                Title: record.FormTemplate.Title,
                Description: record.FormTemplate.Description,
                CurrentVersion: record.FormTemplate.Version,
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