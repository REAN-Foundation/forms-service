import { QuestionResponseDto } from "../domain.types/forms/question.domain.types";

export class QuestionMapper {
    static toDto = (record: any): QuestionResponseDto => {
        if (record === null) {
            return null;
        }

        var options = [];
        if (record.Options !== null && record.Options !== undefined) {
            options = JSON.parse(record.Options);
        }
        const dto: QuestionResponseDto = {
            id              : record.id,
            Title           : record.Title,
            Description     : record.Description,
            DisplayCode     : record.DisplayCode ?? null,
            ResponseType    : record.ResponseType,
            Score           : record.Score,
            Sequence        : record.Sequence,
            CorrectAnswer   : record.CorrectAnswer,
            Hint            : record.Hint,
            Options         : options,
            QuestionImageUrl: record.QuestionImageUrl,
            RangeMin        : record.RangeMin,
            RangeMax        : record.RangeMax,
            ParentFormSection: {
                id               : record.ParentFormSection.id,
                SectionIdentifier: record.ParentFormSection.SectionIdentifier,
                Title            : record.ParentFormSection.Title,
                Description      : record.ParentFormSection.Description,
                DisplayCode      : record.ParentFormSection.DisplayCode,
                Sequence         : record.ParentFormSection.Sequence,
                ParentSectionId  : record.ParentFormSection.ParentSectionId,
                CreatedAt        : record.ParentFormSection.CreatedAt
            },
            ParentFormTemplate: {
                id                     : record.ParentFormTemplate.id,
                Title                  : record.ParentFormTemplate.Title,
                Description            : record.ParentFormTemplate.Description,
                CurrentVersion         : record.ParentFormTemplate.CorrectAnswer,
                Type                   : record.ParentFormTemplate.Type,
                DisplayCode            : record.ParentFormTemplate.DisplayCode,
                OwnerUserId            : record.ParentFormTemplate.OwnerUserId,
                RootSectionId          : record.ParentFormTemplate.RootSectionId,
                DefaultSectionNumbering: record.ParentFormTemplate.DefaultSectionNumbering,
                CreatedAt              : record.ParentFormTemplate.CreatedAt
            },
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayDto(records: any[]): QuestionResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => QuestionMapper.toDto(record));
    }
}
