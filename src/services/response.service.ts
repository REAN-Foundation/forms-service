import { PrismaClient, QueryResponseType } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
// import { ResponseMapper } from "../mappers/form.section.mapper";
// import { ResponseCreateModel, ResponseUpdateModel } from "../domain.types/forms/form.section.domain.types";
import { ResponseMapper } from "../mappers/response.mapper";
import { ResponseCreateModel, ResponseUpdateModel } from "../domain.types/forms/response.domain.types";


export class ResponseService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allResponses = async (): Promise<any> => {
        const response = await this.prisma.response.findMany({
            include: {
                FormTemplates: true,
                Forms:true,
                Questions:true
            }
        });
        return ResponseMapper.toArrayDto(response);
        // return response;
    };

    create = async (model: ResponseCreateModel) => {
        const response = await this.prisma.response.create({
            data: {
                Forms: {
                    connect: { id: model.FormId }
                },
                FormTemplates: {
                    connect: { id: model.FormTemplateId }
                },
                Questions: {
                    connect: { id: model.QuestionId }
                },
                ResponseType: model.ResponseType as QueryResponseType,
                IntegerValue: model.IntegerValue,
                FloatValue: model.FloatValue,
                BooleanValue: model.BooleanValue,
                DateTimeValue: model.DateTimeValue,
                Url: model.Url,
                FileResourceId: model.FileResourceId,
                TextValue:model.TextValue,
                // SubmissionTimestamp:model.SubmissionTimestamp,
                // LastSaveTimestamp:model.LastSaveTimestamp,
            
            },
            include: {
                FormTemplates: true,
                Forms:true,
                Questions:true
            }
        });
        return ResponseMapper.toDto(response);
        // return response;
    };

    update = async (id: string, model: ResponseUpdateModel) => {
        const response = await this.prisma.response.update({
            data: {
                Forms: {
                    connect: { id: model.FormId }
                },
                FormTemplates: {
                    connect: { id: model.FormTemplateId }
                },
                Questions: {
                    connect: { id: model.QuestionId }
                },
                ResponseType: model.ResponseType as QueryResponseType,
                IntegerValue: model.IntegerValue,
                FloatValue: model.FloatValue,
                BooleanValue: model.BooleanValue,
                DateTimeValue: model.DateTimeValue,
                Url: model.Url,
                FileResourceId: model.FileResourceId,
                TextValue:model.TextValue,
                // SubmissionTimestamp:model.SubmissionTimestamp,
                // LastSaveTimestamp:model.LastSaveTimestamp,
            
            },
            include: {
                FormTemplates: true,
                Forms:true,
                Questions:true
            },
            where: {
                id: id,
            },
        });
        return ResponseMapper.toDto(response);
        // return response;
    };

    getById = async (id: string) => {
        const response = await this.prisma.response.findUnique({
            where: {
                id: id,
            },
            include: {
                FormTemplates: true,
                Forms:true,
                Questions:true
            }
        });
        return ResponseMapper.toDto(response);
    };

    delete = async (id: string) => {
        const response = await this.prisma.response.delete({
            where: {
                id: id,
            },
            include: {
                FormTemplates: true,
                Forms:true,
                Questions:true
            }
        });
        return ResponseMapper.toDto(response);
    };
}
