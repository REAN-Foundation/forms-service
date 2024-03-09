import { PrismaClient } from "@prisma/client";
import * as express from "express";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { FormMapper } from "../mappers/form.mapper"
import { FormCreateModel, FormUpdateModel } from "../domain.types/forms/form.domain.types";
import moment from "moment";

export class FormService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allForms = async (): Promise<any> => {
        const response = await this.prisma.form.findMany({
            include: {
                FormTemplate: true,
                Users: true
            }
        });
        return FormMapper.toArrayDto(response);
    };

    create = async (model: FormCreateModel) => {
        const response = await this.prisma.form.create({
            data: {
                FormTemplate: {
                    connect: { id: model.FormTemplateId }
                },
                Users: {
                    connect: { id: model.AnsweredByUserId }
                },
                FormUrl: model.FormUrl,
                Status: model.Status,
            },
            include: {
                FormTemplate: true,
                Users: true
            }
        });
        return FormMapper.toDto(response);
        // return response;
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
            include: {
                FormTemplate: true,
                Users: true
            },
        });
        return FormMapper.toDto(response);
    };



    getById = async (id: string) => {
        const response = await this.prisma.form.findUnique({
            include: {
                FormTemplate: true,
                Users: true
            },
            where: {
                id: id,
            },
        });
        // return response;
        return FormMapper.toDto(response);
    };


    delete = async (id: string) => {
        const response = await this.prisma.form.delete({
            where: {
                id: id,
            },
            include: {
                FormTemplate: true,
                Users: true
            },
        });
        return FormMapper.toDto(response);
    };

    getByTemplateId = async (id: string) => {
        const response = await this.prisma.form.findMany({
            where: {
                FormTemplateId: id,
            },
            include: {
                FormTemplate: true,
                Users: true
            },
        });
        return FormMapper.toArrayDto(response);
    };

    getByResponse = async (phone: string) => {
        const response = await this.prisma.form.findMany({
            // where: {
            //     id:id,

            // },
        });
        return response;
    };

    submit = async (model: FormUpdateModel) => {
        const response = await this.prisma.form.create({
            data: {
                FormTemplateId: model.FormTemplateId,
                FormUrl: model.FormUrl,
                AnsweredByUserId: model.AnsweredByUserId,
                Status: model.Status,
            },
            include: {
                FormTemplate: true,
                Users: true
            },
        });
        return FormMapper.toDto(response);
    };

    getByDate = async (date: string) => {
        const startDate = moment(date).startOf('day').toDate();
        const endDate = moment(date).endOf('day').toDate();

        const response = await this.prisma.form.findMany({
            include: {
                FormTemplate: true,
                Users: true
            },
            where: {
                CreatedAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
        // return FormMapper.toDto(response);
        return FormMapper.toArrayDto(response);
        // return response;
    };
}
