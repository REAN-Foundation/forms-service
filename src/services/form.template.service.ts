import { FormType, ItemsPerPage, Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { FormTemplateCreateModel, FormTemplateSearchFilters, FormTemplateUpdateModel } from "../domain.types/forms/form.template.domain.types";
import { FormTemplateMapper } from "../mappers/form.template.mapper";
import { ErrorHandler } from "../common/error.handler";
import { FormSectionMapper } from "../mappers/form.section.mapper";
import { QuestionMapper } from "../mappers/question.mapper";


export class FormTemplateService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    // allFormTemplates = async () => {
    //     const response = await this.prisma.formTemplate.findMany({
    //         where: {
    //             DeletedAt: null,
    //         }
    //     });
    //     return FormTemplateMapper.toArrayDto(response);
    // };

    create = async (model: FormTemplateCreateModel) => {
        const response = await this.prisma.formTemplate.create({
            data: {
                Title: model.Title,
                Description: model.Description,
                CurrentVersion: model.CurrentVersion,
                TenantCode: model.TenantCode,
                Type: model.Type as FormType,
                ItemsPerPage: model.ItemsPerPage as ItemsPerPage,
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
                TenantCode: model.TenantCode,
                Type: model.Type as FormType,
                ItemsPerPage: model.ItemsPerPage as ItemsPerPage,
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

    getDetailsById = async (id: string) => {
        const template = await this.prisma.formTemplate.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
        });
        const sections = await this.prisma.formSection.findMany({
            where: {
                ParentFormTemplateId: id,
                DeletedAt: null
            },
            include: {
                ParentFormTemplate: true
            }
        });
        const questions = await this.prisma.question.findMany({
            where: {
                ParentTemplateId: id,
                DeletedAt: null
            },
            include: {
                ParentFormTemplate: true,
                ParentFormSection: true
            }
        });

        const searchResult = {
            Template: FormTemplateMapper.toDto(template),
            Sections: sections.map((x) => FormSectionMapper.toDto(x)),
            Questions: questions.map((x) => QuestionMapper.toDto(x))
        };
        return searchResult;
    };


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

    protected addSortingAndPagination = (
        search: Prisma.FormTemplateFindManyArgs,
        filters: FormTemplateSearchFilters
    ) => {
        // Sorting
        let orderByColumn: keyof typeof Prisma.FormTemplateScalarFieldEnum = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy as keyof typeof Prisma.FormTemplateScalarFieldEnum;
        }
        let order: Prisma.SortOrder = 'asc';
        if (filters.Order === 'descending') {
            order = 'desc';
        }

        search.orderBy = {
            [orderByColumn]: order,
        };

        // Pagination
        let limit = 25;
        if (filters.ItemsPerPage) {
            limit = filters.ItemsPerPage;
        }
        let offset = 0;
        let pageIndex = 1;
        if (filters.PageIndex) {
            pageIndex = filters.PageIndex < 1 ? 1 : filters.PageIndex;
            offset = (pageIndex - 1) * limit;
        }

        search.take = limit;
        search.skip = offset;

        // Update where clause
        const whereClause = this.getSearchModel(filters);
        if (Object.keys(whereClause).length > 0) {
            search.where = whereClause;
        }

        return { search, pageIndex, limit, order, orderByColumn };
    };


    public search = async (filters: FormTemplateSearchFilters) => {
        try {
            const { search: prismaSearch, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination({}, filters);

            const list = await this.prisma.formTemplate.findMany({
                where: prismaSearch.where,
                take: limit,
                skip: (pageIndex - 1) * limit,
                orderBy: {
                    [orderByColumn]: order === 'desc' ? 'desc' : 'asc',
                },
            });

            const count = await this.prisma.formTemplate.count({
                where: prismaSearch.where,
            });

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'desc' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => FormTemplateMapper.toDto(x)),
            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };





    private getSearchModel = (filters: FormTemplateSearchFilters): Prisma.FormTemplateWhereInput => {
        const where: Prisma.FormTemplateWhereInput = {
            DeletedAt: null
        };

        if (filters.id) {
            where.id = {
                equals: filters.id,
            };
        }

        if (filters.title) {
            where.Title = {
                equals: filters.title,
            };
        }
        if (filters.tenantCode) {
            where.TenantCode = {
                equals: filters.tenantCode,
            };
        }

        if (filters.description) {
            where.Description = {
                equals: filters.description,
            };
        }

        if (filters.currentVersion) {
            where.CurrentVersion = {
                equals: filters.currentVersion,
            };
        }

        if (filters.type) {
            where.Type = {
                equals: filters.type,
            };
        }

        if (filters.displayCode) {
            where.DisplayCode = {
                equals: filters.displayCode,
            };
        }

        if (filters.ownerUserId) {
            where.OwnerUserId = {
                equals: filters.ownerUserId,
            };
        }
        if (filters.rootSectionId) {
            where.RootSectionId = {
                equals: filters.rootSectionId,
            };
        }
        if (filters.defaultSectionNumbering) {
            where.DefaultSectionNumbering = {
                equals: filters.defaultSectionNumbering,
            };
        }


        return where;
    };

}
