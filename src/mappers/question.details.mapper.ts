import { QuestionDetailsResponseDto } from "../domain.types/forms/question.details.domain.types";

export class QuestionDetailMapper {
    static toDto = (record: any): QuestionDetailsResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: QuestionDetailsResponseDto = {
            id: record.id,
            Question: {
                id: record.Question.id,
                Title: record.Question.Title,
                Description: record.Question.Description,
                DisplayCode: record.Question.DisplayCode,
                ResponseType: record.Question.ResponseType,
                TemplateId: record.Question.TemplateId,
                SectionId: record.Question.SectionId,
                CreatedAt: record.Question.CreatedAt,
            },
            Option: record.Option,
            OptionSequence: record.OptionSequence,
            FileResourceId: record.FileResourceId,
            QuestionImageUrl: record.QuestionImageUrl,
            RangeMin: record.RangeMin,
            RangeMax: record.RangeMax
        };
        return dto;
    };

    static toArrayDto(record: any[]): QuestionDetailsResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: QuestionDetailsResponseDto[] = [];
        for (let i = 0; i < record.length; i++) {
            const element = record[i];
            dtos.push({
                id: element.id,
                Question: {
                    id: element.Question.id,
                    Title: element.Question.Title,
                    Description: element.Question.Description,
                    DisplayCode: element.Question.DisplayCode,
                    ResponseType: element.Question.ResponseType,
                    TemplateId: element.Question.TemplateId,
                    SectionId: element.Question.SectionId,
                    CreatedAt: element.Question.CreatedAt,
                },
                Option: element.Option,
                OptionSequence: element.OptionSequence,
                FileResourceId: element.FileResourceId,
                QuestionImageUrl: element.QuestionImageUrl,
                RangeMin: element.RangeMin,
                RangeMax: element.Ranelement
            });
        }
        return dtos;
    }

}
