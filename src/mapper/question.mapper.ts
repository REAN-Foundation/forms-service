import { QuestionDto } from "../domain.types/student/question.domain.types";

export class QuestionMapper {
    static toDto = (record: any): QuestionDto => {
        if (record === null) {
            return null;
        }

        const dto: QuestionDto = {
            id:record.id,
            question: record.question,
            type: record.type,
        };
        return dto;
    };

    static toArrayDto(record: any[]): QuestionDto[] {
        if (record === null) {
            return null;
        }

        const dtos: QuestionDto[] = [];

        record.forEach((element) => {
            dtos.push({
                id:element.id,
                question: element.question,
                type: element.type,
            });
        });
        return dtos;
    }
}