import { FormStatus, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { FormMapper } from "../mappers/form.submission.mapper"
import { FormSubmissionCreateModel, FormSubmissionUpdateModel } from "../domain.types/forms.submission/form.submission.domain.types";
import moment from "moment";
import { uuid } from "../domain.types/miscellaneous/system.types";

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allForms = async (): Promise<any> => {
        const response = await this.prisma.formSubmission.findMany({
            include: {
                FormTemplate: true,
                Submitter:true
            },
            where: {
                DeletedAt: null
            }
        });
        return FormMapper.toArrayDto(response);
    };

    create = async (model: FormSubmissionCreateModel) => {
        const response = await this.prisma.formSubmission.create({
            data: {
                FormTemplate: {
                    connect: { id: model.FormTemplateId }
                },
                Submitter: {
                    connect: { id: model.AnsweredByUserId }
                },
                FormUrl: model.FormUrl,
                Status: model.Status,
                CreatedAt: new Date(),
                // SubmissionTimestamp: null,
                // DeletedAt: null
            },
            include: {
                FormTemplate: true,
                Submitter: true
            }
        });
        return FormMapper.toDto(response);
        // return response;
    };

    update = async (id: string, model: FormSubmissionUpdateModel) => {
        const response = await this.prisma.formSubmission.update({
            where: {
                id: id,
                DeletedAt: null
            },
            data: {
                Status: model.Status,
                UpdatedAt: new Date()
            },
            include: {
                FormTemplate: true,
                Submitter: true,

            },
        });
        return FormMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.formSubmission.findUnique({
            include: {
                FormTemplate: true,
                Submitter: true
            },
            where: {
                id: id,
                DeletedAt: null
            },
        });
        // return response;
        return FormMapper.toDto(response);
    };


    delete = async (id: string) => {
        const response = await this.prisma.formSubmission.update({
            where: {
                id: id,
            },
            data: {
                DeletedAt: new Date(),
            },
            include:{
                FormTemplate:true,
                Submitter:true
            }
        });
        return FormMapper.toDto(response);
    };

    getByTemplateId = async (id: string) => {
        const response = await this.prisma.formSubmission.findMany({
            where: {
                FormTemplateId: id,
                DeletedAt: null
            },
            include: {
                FormTemplate: true,
                Submitter: true
            },
        });
        return FormMapper.toArrayDto(response);
    };

    submit = async (id: uuid) => {
        const response = await this.prisma.formSubmission.update({
            where: {
                id: id,
                DeletedAt: null
            },
            data: {
                SubmissionTimestamp: new Date(),
                Status: FormStatus.Submitted,
            }
        });
        return FormMapper.toDto(response);
    };

    getByDate = async (date: string) => {
        const startDate = moment(date).startOf('day').toDate();
        const endDate = moment(date).endOf('day').toDate();

        const response = await this.prisma.formSubmission.findMany({
            include: {
                FormTemplate: true,
                Submitter: true
            },
            where: {
                CreatedAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
        return FormMapper.toArrayDto(response);
    };
}
