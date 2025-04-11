import { FormType, ItemsPerPage, Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import {
    ExportFormTemplateDto,
    FormTemplateCreateModel,
    FormTemplateSearchFilters,
    FormTemplateUpdateModel,
    SectionDto,
    SectionPreviewDto,
    SubsectionDto,
    TemplateDto,
    TemplatePreviewDto
} from "../domain.types/forms/form.template.domain.types";
import { FormTemplateMapper } from "../mappers/form.template.mapper";
import { ErrorHandler } from "../common/error.handler";
import { FormSectionMapper } from "../mappers/form.section.mapper";
import { QuestionMapper } from "../mappers/question.mapper";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class FormTemplateService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    create = async (model: FormTemplateCreateModel) => {
        const response = await this.prisma.formTemplate.create({
            data: {
                User: {
                    connect: { id: model.OwnerUserId }
                },
                Title: model.Title,
                Description: model.Description,
                CurrentVersion: model.CurrentVersion,
                TenantId: model.TenantId,
                Type: model.Type as FormType,
                ItemsPerPage: model.ItemsPerPage as ItemsPerPage,
                DisplayCode: model.DisplayCode,
                // OwnerUserId: model.OwnerUserId,
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
                TenantId: model.TenantId,
                Type: model.Type as FormType,
                ItemsPerPage: model.ItemsPerPage as ItemsPerPage,
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

    getDetailsById = async (id: string) => {
        const record = await this.prisma.formTemplate.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
            include: {
                FormSections: {
                    where: {
                        DeletedAt: null
                    },
                    orderBy: {
                        Sequence: "asc" // Sort sections within each template
                    },
                    include: {
                        Questions: {
                            where: {
                                DeletedAt: null
                            },
                            orderBy: {
                                Sequence: 'asc' // Sort questions within each section
                            }
                        },
                        ParentFormTemplate: true
                    }
                }
            }
        })

        const subsections = await this.mapSections(record.FormSections);
        record.FormSections = subsections;

        return record;
    };

    mapSections = async (sections: any[]) => {
        const sectionMap = new Map();

        sections.forEach((section) => {
            sectionMap.set(section.id, { ...section, Subsections: [] });
        });

        const rootSections: any[] = [];

        sections.forEach((section) => {
            if (section.ParentSectionId !== null) {
                const parent = sectionMap.get(section.ParentSectionId);
                if (parent) {
                    parent.Subsections.push(sectionMap.get(section.id));
                }
            } else {
                rootSections.push(sectionMap.get(section.id));
            }
        });

        return rootSections;
    }


    delete = async (id: string) => {
        const response = await this.prisma.formTemplate.update({
            where: {
                id: id,
                DeletedAt: null
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

 
    public search = async (filters: FormTemplateSearchFilters) => {
        try {
            const search = this.getSearchModel(filters);

            const list = await this.prisma.formTemplate.findMany(search);

            const count = await this.prisma.formTemplate.count({
                where: search.where,
            });

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: filters.PageIndex,
                ItemsPerPage: filters.ItemsPerPage,
                Order: filters.Order,
                OrderedBy: filters.OrderBy,
                Items: list.map((x) => FormTemplateMapper.toDto(x)),
            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };
  

    private getSearchModel = (filters: FormTemplateSearchFilters) => {
        // const where: Prisma.FormTemplateWhereInput = {
        //     DeletedAt: null
        // };
        const searchFilter = {
            where: {
                DeletedAt: null,
            }
        }

        if (filters.id) {
            searchFilter.where['id'] = filters.id
        }

        if (filters.Title) {
            searchFilter.where['Title'] = filters.Title
        }

        if (filters.TenantId) {
            searchFilter.where['TenantId'] = filters.TenantId
        }

        if (filters.Description) {
            searchFilter.where['Description'] = filters.Description
        }

        if (filters.CurrentVersion) {
            searchFilter.where['CurrentVersion'] = filters.CurrentVersion
        }

        if (filters.Type) {
            searchFilter.where['Type'] = filters.Type
        }

        if (filters.DisplayCode) {
            searchFilter.where['DisplayCode'] = filters.DisplayCode
        }

        if (filters.OwnerUserId) {
            searchFilter.where['OwnerUserId'] = filters.OwnerUserId
        }
        if (filters.RootSectionId) {
            searchFilter.where['RootSectionId'] = filters.RootSectionId
        }
        if (filters.DefaultSectionNumbering) {
            searchFilter.where['DefaultSectionNumbering'] = filters.DefaultSectionNumbering
        }

        let limit = 25;
        if (filters.ItemsPerPage) {
            limit = filters.ItemsPerPage;
        }

        let order = 'asc';
        if (filters.Order === 'descending') {
            order = 'desc';
        }

        let orderByColum = 'CreatedAt';
        if (filters.OrderBy) {
            searchFilter['orderBy'] = {
                [orderByColum]: order
            }
        }

        let offset = 0;

        let pageIndex = 0;

        if (filters.PageIndex) {
            pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
            offset = pageIndex * limit;
        }

        searchFilter['take'] = limit;
        searchFilter['skip'] = offset;

        return searchFilter;
    };

}
