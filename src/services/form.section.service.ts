import { PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { FormSectionMapper } from "../mappers/form.section.mapper";
import { FormSectionCreateModel, FormSectionUpdateModel } from "../domain.types/forms/form.section.domain.types";


export class FormSectionService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allFormSections = async (): Promise<any> => {
        const response = await this.prisma.formSection.findMany({
            include:{
                FormTemplates:true
            }
        });
        return FormSectionMapper.toArrayDto(response);
        // return response;
    };




    create = async (model: FormSectionCreateModel) => {
        const response = await this.prisma.formSection.create({
            data: {
                FormTemplates: {
                    connect: { id: model.TemplateId }
                },
                // TemplateId: model.TemplateId,
                SectionIdentifier: model.SectionIdentifier,
                Title: model.Title,
                Description: model.Description,
                DisplayCode: model.DisplayCode,
                Sequence: model.Sequence,
                ParentSectionId: model.ParentSectionId,
            },
            include: {
                FormTemplates: true
            }
        });
        return FormSectionMapper.toDto(response);
    };

    update = async (id: string, model: FormSectionUpdateModel) => {
        const response = await this.prisma.formSection.update({
            data: {
                // TemplateId: model.TemplateId,
                SectionIdentifier: model.SectionIdentifier,
                Title: model.Title,
                Description: model.Description,
                DisplayCode: model.DisplayCode,
                Sequence: model.Sequence,
                ParentSectionId: model.ParentSectionId,
            },
            where: {
                id: id,
            },
            include: {
                FormTemplates: true,
            },
        });
        return FormSectionMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.formSection.findUnique({
            where: {
                id: id,
            },
            include: {
                FormTemplates: true,
            }
        });
        return FormSectionMapper.toDto(response);
    };

    delete = async (id: string) => {
        const response = await this.prisma.formSection.delete({
            where: {
                id: id,
            },
            include: {
                FormTemplates: true,
            }
        });
        return FormSectionMapper.toDto(response);
    };
}
