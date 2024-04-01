import { PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { FormSectionMapper } from "../mappers/form.section.mapper";
import { FormSectionCreateModel, FormSectionUpdateModel } from "../domain.types/forms.submission/form.section.domain.types";


export class FormSectionService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allFormSections = async (): Promise<any> => {
        const response = await this.prisma.formSection.findMany({
            include: {
                ParentFormTemplate: true
            },
            where: {
                DeletedAt: null,
            }
        });
        return FormSectionMapper.toArrayDto(response);
    };




    create = async (model: FormSectionCreateModel) => {
        const response = await this.prisma.formSection.create({
            data: {
                ParentFormTemplate: {
                    connect: { id: model.ParentFormTemplateId }
                },
                SectionIdentifier: model.SectionIdentifier,
                Title: model.Title,
                Description: model.Description,
                DisplayCode: model.DisplayCode,
                Sequence: model.Sequence,
                ParentSectionId: model.ParentSectionId,
                // DeletedAt        : null,
            },
            include: {
                ParentFormTemplate: true
            }
        });
        return FormSectionMapper.toDto(response);
    };

    update = async (id: string, model: FormSectionUpdateModel) => {
        const response = await this.prisma.formSection.update({
            data: {
                SectionIdentifier: model.SectionIdentifier,
                Title: model.Title,
                Description: model.Description,
                DisplayCode: model.DisplayCode,
                Sequence: model.Sequence,
                ParentSectionId: model.ParentSectionId,
                UpdatedAt: new Date(),
            },
            where: {
                id: id,
                DeletedAt: null
            },
            include: {
                ParentFormTemplate: true,
            },
        });
        return FormSectionMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.formSection.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
            include: {
                ParentFormTemplate: true,
            }
        });
        return FormSectionMapper.toDto(response);
    };

    delete = async (id: string) => {
        const response = await this.prisma.formSection.update({
            where: {
                id: id,
            },
            data: {
                DeletedAt: new Date(),
            },
            include: {
                ParentFormTemplate: true,
            }
        });
        return FormSectionMapper.toDto(response);
    };

    getByTemplateId = async (id: string) => {
        const response = await this.prisma.formSection.findMany({
            where: {
                ParentFormTemplateId: id,
                DeletedAt: null
            },
            include: {
                ParentFormTemplate: true,
            }
        });
        return FormSectionMapper.toArrayDto(response);
    };
}
