import { PrismaClient, QueryResponseType } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { ResponseMapper } from "../mappers/question.response.mapper";
import { QuestionResponseCreateModel, QuestionResponseUpdateModel } from "../domain.types/forms/response.domain.types";


export class ResponseService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allResponses = async (): Promise<any> => {
        const response = await this.prisma.questionResponse.findMany({
            include: {
                FormSubmission: true,
                Question:true
            }
        });
        return ResponseMapper.toArrayDto(response);
    };

    create = async (model: QuestionResponseCreateModel) => {
        const response = await this.prisma.questionResponse.create({
            data: {
                FormSubmission: {
                    connect: { id: model.FormSubmissionId }
                },
                Question: {
                    connect: { id: model.QuestionId }
                },
                ResponseType       : model.ResponseType as QueryResponseType,
                IntegerValue       : model.IntegerValue,
                FloatValue         : model.FloatValue,
                BooleanValue       : model.BooleanValue,
                DateTimeValue      : model.DateTimeValue,
                Url                : model.Url,
                FileResourceId     : model.FileResourceId,
                TextValue          : model.TextValue,
                SubmissionTimestamp: null,
                LastSaveTimestamp  : new Date(),
                DeletedAt          : null,
            },
            include: {
                FormSubmission: true,
                Question:true
            }
        });
        return ResponseMapper.toDto(response);
    };

    update = async (id: string, model: QuestionResponseUpdateModel) => {
        const record = await this.prisma.questionResponse.findUnique({
            where: {
                id: id,
            }
        });
        const response = await this.prisma.questionResponse.update({
            data: {
                ResponseType     : model.ResponseType as QueryResponseType ?? record.ResponseType,
                IntegerValue     : model.IntegerValue ?? record.IntegerValue,
                FloatValue       : model.FloatValue ?? record.FloatValue,
                BooleanValue     : model.BooleanValue ?? record.BooleanValue,
                DateTimeValue    : model.DateTimeValue ?? record.DateTimeValue,
                Url              : model.Url ?? record.Url,
                FileResourceId   : model.FileResourceId ?? record.FileResourceId,
                TextValue        : model.TextValue ?? record.TextValue,
                LastSaveTimestamp: new Date(),
            },
            include: {
                FormSubmission: true,
                Question:true
            },
            where: {
                id: id,
            },
        });
        return ResponseMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.questionResponse.findUnique({
            where: {
                id: id,
            },
            include: {
                FormSubmission: true,
                Question:true
            }
        });
        return ResponseMapper.toDto(response);
    };

    delete = async (id: string) => {
        const response = await this.prisma.questionResponse.delete({
            where: {
                id: id,
            },
            include: {
                FormSubmission: true,
                Question:true
            }
        });
        return ResponseMapper.toDto(response);
    };
}
