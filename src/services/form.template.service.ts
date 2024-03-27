import { FormType,PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { FormTemplateCreateModel, FormTemplateUpdateModel } from "../domain.types/forms.submission/form.template.domain.types";
import { FormTemplateMapper } from "../mappers/form.template.mapper";


export class FormTemplateService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allFormTemplates = async () => {
        const response = await this.prisma.formTemplate.findMany({
            where: {
                DeletedAt: null,
            }
        });
        return FormTemplateMapper.toArrayDto(response);
    };

    create = async (model: FormTemplateCreateModel) => {
        const response = await this.prisma.formTemplate.create({
            data: {
                Title: model.Title,
                Description: model.Description,
                CurrentVersion: model.CurrentVersion,
                Type: model.Type as FormType,
                DisplayCode: model.DisplayCode,
                OwnerUserId: model.OwnerUserId,
                RootSectionId: model.RootSectionId,
                DefaultSectionNumbering: model.DefaultSectionNumbering,
                // DeletedAt              : null
            },
        });
        return FormTemplateMapper.toDto(response);
    };

    update = async (id: string, model: FormTemplateUpdateModel) => {
        const response = await this.prisma.formTemplate.update({
            where: {
                id: id,
                DeletedAt: null
            },
            data: {
                Title: model.Title,
                Description: model.Description,
                CurrentVersion: model.CurrentVersion,
                Type: model.Type as FormType,
                DisplayCode: model.DisplayCode,
                OwnerUserId: model.OwnerUserId,
                RootSectionId: model.RootSectionId,
                DefaultSectionNumbering: model.DefaultSectionNumbering,
                UpdatedAt: new Date()
            },
        });
        return FormTemplateMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.formTemplate.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
        });
        return FormTemplateMapper.toDto(response);
    };


    delete = async (id: string) => {
        const response = await this.prisma.formTemplate.update({
            where: {
                id: id,
                DeletedAt:null
            },
            data: {
                DeletedAt: new Date(),
            }
        });
        return FormTemplateMapper.toDto(response);
    };

    submissions = async (id: string) => {
        const response = await this.prisma.formTemplate.findMany({
            where: {
                id: id,
                DeletedAt: null
            }
        });
        return FormTemplateMapper.toArrayDto(response);
    };

}
