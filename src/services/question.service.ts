import { PrismaClient, QueryResponseType } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { QuestionMapper } from "../mappers/question.mapper";
import { QuestionCreateModel, QuestionUpdateModel } from "../domain.types/forms/question.domain.types";


export class QuestionService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allQuestions = async (): Promise<any> => {
        const response = await this.prisma.question.findMany({
            include: {
                ParentFormTemplate: true,
                ParentFormSection: true
            },
            where: {
                DeletedAt: null
            }
        });
        return QuestionMapper.toArrayDto(response);
    };

    create = async (model: QuestionCreateModel) => {
        const response = await this.prisma.question.create({
            data: {
                ParentFormTemplate: {
                    connect: { id: model.ParentTemplateId }
                },
                ParentFormSection: {
                    connect: { id: model.ParentSectionId }
                },
                Title: model.Title,
                Description: model.Description,
                DisplayCode: model.DisplayCode,
                ResponseType: model.ResponseType as QueryResponseType,
                Score: model.Score,
                CorrectAnswer: model.CorrectAnswer,
                Hint: model.Hint,
                Options: JSON.stringify(model.Options),
                QuestionImageUrl: model.QuestionImageUrl,
                RangeMax: model.RangeMax,
                RangeMin: model.RangeMin,
                CreatedAt: new Date(),
                // UpdatedAt: new Date(),
                // DeletedAt: null,
            },
            include: {
                ParentFormTemplate: true,
                ParentFormSection: true
            }
        });
        return QuestionMapper.toDto(response);

    };

    update = async (id: string, model: QuestionUpdateModel) => {
        const response = await this.prisma.question.update({
            data: {
                Title: model.Title,
                Description: model.Description,
                // DisplayCode: model.DisplayCode,
                ResponseType: model.ResponseType as QueryResponseType,
                Score: model.Score,
                CorrectAnswer: model.CorrectAnswer,
                Hint: model.Hint,
                UpdatedAt: new Date()
            },
            include: {
                ParentFormSection: true,
                ParentFormTemplate: true
            },
            where: {
                id: id,
                DeletedAt: null
            }
        });
        return QuestionMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.question.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
            include: {
                ParentFormSection: true,
                ParentFormTemplate: true
            },
        });
        return QuestionMapper.toDto(response);
    };

    getByTemplateId = async (id: string) => {
        const response = await this.prisma.question.findMany({
            where: {
                ParentTemplateId: id,
                DeletedAt: null
            },
            include: {
                ParentFormSection: true,
                ParentFormTemplate: true
            },
        });
        return QuestionMapper.toArrayDto(response);
    };

    delete = async (id: string) => {
        const response = await this.prisma.question.update({
            where: {
                id: id,
                DeletedAt: null
            },
            data: {
                DeletedAt: new Date()
            },
            include: {
                ParentFormSection: true,
                ParentFormTemplate: true
            },
        });
        return QuestionMapper.toDto(response);
    };
}
