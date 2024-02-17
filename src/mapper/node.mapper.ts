import { QuestionDto } from "../domain.types/node/node";


export class QuestionMapper {
    static toDto = (record: any): QuestionDto => {
        if (record === null) {
            return null;
        }

        const dto: QuestionDto = {
            // id:record.id,
            // question: record.question,
            // type: record.type,
            nodeType: record.nodeType,
            parentNodeId: record.parentNodeId,
            title: record.title,
            description: record.description,
            sequence: record.sequence,
            queryType: record.queryType,
            resolutionScore: record.resolutionScore,
            providerAssessmentCode: record.providerAssessmentCode,
            message: record.message,
            serveListNodeChildrenAtOnce: record.serveListNodeChildrenAtOnce,
            scoringApplicable: record.scoringApplicable,
            options: record.options
        };
        return dto;
    };

    // static toArrayDto(record: any[]): QuestionDto[] {
    //     if (record === null) {
    //         return null;
    //     }

    //     const dtos: QuestionDto[] = [];

    //     record.forEach((element) => {
    //         dtos.push({
    //             id:element.id,
    //             question: element.question,
    //             type: element.type,
    //         });
    //     });
    //     return dtos;
    // }
}