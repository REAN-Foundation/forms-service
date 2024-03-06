import { PrismaClient } from "@prisma/client";
import * as express from "express";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { FormMapper } from "../mappers/form.mapper"
import { FormCreateModel, FormUpdateModel } from "../domain.types/forms/form.domain.types";

export class FormService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allForms = async (): Promise<any> => {
        const response = await this.prisma.form.findMany({
            include: {
                FormTemplate: true,
                Users:true
            }
        });
        return FormMapper.toArrayDto(response);
    };

    create = async (model: FormCreateModel) => {
        const response = await this.prisma.form.create({
            data: {
                FormTemplateId: model.FormTemplateId,
                FormUrl: model.FormUrl,
                AnsweredByUserId: model.AnsweredByUserId,
                Status: model.Status,
            },
        });
        return FormMapper.toDto(response);
    };

    update = async (id: string, model: FormUpdateModel) => {
        const response = await this.prisma.form.update({
            where: {
                id: id,
            },
            data: {
                FormTemplateId: model.FormTemplateId,
                FormUrl: model.FormUrl,
                AnsweredByUserId: model.AnsweredByUserId,
                Status: model.Status,
            },
        });
        return FormMapper.toDto(response);
    };



    getById = async (id: string) => {
        const response = await this.prisma.form.findUnique({
            where: {
                id: id,
            },
        });
        return FormMapper.toDto(response);
    };


    delete = async (id: string) => {
        const response = await this.prisma.form.delete({
            where: {
                id: id,
            },
        });
        return FormMapper.toDto(response);
    };

    getByTemplateId = async (id: string) => {
        const response = await this.prisma.form.findMany({
            where: {
                FormTemplateId: id,
            },
        });
        return FormMapper.toArrayDto(response);
    };

    // getByResponse = async (phone: string) => {
    //     const response = await this.prisma.form.findMany({
    //         where: {
    //             Phone: phone,
    //         },
    //     });
    //     return response;
    // };

    submit = async (model: FormUpdateModel) => {
        const response = await this.prisma.form.create({
            data: {
                FormTemplateId: model.FormTemplateId,
                FormUrl: model.FormUrl,
                AnsweredByUserId: model.AnsweredByUserId,
                Status: model.Status,
            },
        });
        return FormMapper.toDto(response);
    };
}
