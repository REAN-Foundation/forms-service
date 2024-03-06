import { PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { QuestionDetailMapper } from "../mappers/question.details.mapper";
import { QuestionDetailsCreateModel, QuestionDetailsUpdateModel } from "../domain.types/forms/question.details.domain.types";


export class QuestionDetailService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allQuestionDetails = async () => {
        const response = await this.prisma.questionDetail.findMany({});
        return QuestionDetailMapper.toArrayDto(response);
    };

    create = async (model: QuestionDetailsCreateModel) => {
        const response = await this.prisma.questionDetail.create({
            data: {
                Question: {
                    connect: { id: model.QuestionId }
                },
                Option: model.Option,
                OptionSequence: model.OptionSequence,
                FileResourceId: model.FileResourceId,
                QuestionImageUrl: model.QuestionImageUrl,
                RangeMin: model.RangeMin,
                RangeMax: model.RangeMax
            },
            include: {
                Question: true,
            }
        });
        return QuestionDetailMapper.toDto(response);
    };

    update = async (id: string, model: QuestionDetailsUpdateModel) => {
        const response = await this.prisma.questionDetail.update({
            where: {
                id: id,
            },
            data: {
                Option: model.Option,
                OptionSequence: model.OptionSequence,
                FileResourceId: model.FileResourceId,
                QuestionImageUrl: model.QuestionImageUrl,
                RangeMin: model.RangeMin,
                RangeMax: model.RangeMax
            },
            include: {
                Question: true,
            }
            
        });
        return QuestionDetailMapper.toDto(response);
    };



    getById = async (id: string) => {
        const response = await this.prisma.questionDetail.findUnique({
            where: {
                id: id,
            },
        });
        return QuestionDetailMapper.toDto(response);
    };


    delete = async (id: string) => {
        const response = await this.prisma.questionDetail.delete({
            where: {
                id: id,
            },
        });
        return QuestionDetailMapper.toDto(response);
    };

}
