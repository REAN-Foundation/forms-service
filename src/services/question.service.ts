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
            include:{
                FormTemplates:true,
                FormSections:true
            }
        });
        return QuestionMapper.toArrayDto(response);
    };

    create = async (model: QuestionCreateModel) => {
        const response = await this.prisma.question.create({
            data: {
                FormTemplates: {
                    connect: { id: model.TemplateId }
                },
                FormSections:{
                    connect:{ id:model.SectionId}
                },
                Title: model.Title,
                Description: model.Description,
                DisplayCode: model.DisplayCode,
                ResponseType: model.ResponseType as QueryResponseType,
                Score: model.Score,
                CorrectAnswer: model.CorrectAnswer,
                Hint: model.Hint,
            },
            include: {
                FormTemplates: true,
                FormSections:true
            }
        });
        return QuestionMapper.toDto(response);
        
    };

    update = async (id: string, model: QuestionUpdateModel) => {
        const response = await this.prisma.question.update({
            data: {
                FormTemplates: {
                    connect: { id: model.TemplateId }
                },
                FormSections:{
                    connect:{ id:model.SectionId}
                },
                Title: model.Title,
                Description: model.Description,
                DisplayCode: model.DisplayCode,
                ResponseType: model.ResponseType as QueryResponseType,
                Score: model.Score,
                CorrectAnswer: model.CorrectAnswer,
                Hint: model.Hint,
            },
            include: {
                FormTemplates: true,
                FormSections:true
            },
            where: {
                id: id,
            }
        });
        return QuestionMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.question.findUnique({
            where: {
                id: id,
            },
            include: {
                FormTemplates: true,
                FormSections:true
            },
        });
        return QuestionMapper.toDto(response);
    };

    delete = async (id: string) => {
        const response = await this.prisma.question.delete({
            where: {
                id: id,
            },
            include: {
                FormTemplates: true,
                FormSections:true
            },
        });
        return QuestionMapper.toDto(response);
    };
}
