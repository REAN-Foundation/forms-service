import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { FormSectionMapper } from "../mappers/form.section.mapper";
import { FormSectionCreateModel, FormSectionSearchFilters, FormSectionSearchResponseDto, FormSectionUpdateModel } from "../domain.types/forms/form.section.domain.types";
import { ErrorHandler } from "../common/error.handler";


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

    protected addSortingAndPagination = (
        search: Prisma.FormSectionFindManyArgs,
        filters: FormSectionSearchFilters
    ) => {
        // Sorting
        let orderByColumn: keyof typeof Prisma.FormSectionScalarFieldEnum = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy as keyof typeof Prisma.FormSectionScalarFieldEnum;
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







    public search = async (filters: FormSectionSearchFilters): Promise<FormSectionSearchResponseDto> => {
        try {
            const { search: prismaSearch, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination({}, filters);

            const list = await this.prisma.formSection.findMany({
                where: prismaSearch.where,
                include: {
                    ParentFormTemplate: true,
                },
                take: limit,
                skip: (pageIndex - 1) * limit,
                orderBy: {
                    [orderByColumn]: order === 'desc' ? 'desc' : 'asc',
                },
            });

            const count = await this.prisma.formSection.count({
                where: prismaSearch.where,
            });

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'desc' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => FormSectionMapper.toDto(x)),
            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };





    private getSearchModel = (filters: FormSectionSearchFilters): Prisma.FormSectionWhereInput => {
        const where: Prisma.FormSectionWhereInput = {};

        if (filters.id) {
            where.id = {
                equals: filters.id,
            };
        }

        if (filters.parentFormTemplateId) {
            where.ParentFormTemplateId = {
                equals: filters.parentFormTemplateId,
            };
        }

        if (filters.sectionIdentifier) {
            where.SectionIdentifier = {
                equals: filters.sectionIdentifier,
            };
        }

        if (filters.title) {
            where.Title = {
                equals: filters.title,
            };
        }

        if (filters.description) {
            where.Description = {
                equals: filters.description,
            };
        }

        if (filters.sequence) {
            where.Sequence = {
                equals: filters.sequence,
            };
        }
        if (filters.parentSectionId) {
            where.ParentSectionId = {
                equals: filters.parentSectionId,
            };
        }

        return where;
    };
}
