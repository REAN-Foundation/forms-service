import { FormStatus, Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { FormMapper } from "../mappers/form.submission.mapper"
import { FormSubmissionCreateModel, FormSubmissionSearchFilters, FormSubmissionSearchResponseDto, FormSubmissionUpdateModel } from "../domain.types/forms/form.submission.domain.types";
import moment from "moment";
import { uuid } from "../domain.types/miscellaneous/system.types";
import { ErrorHandler } from "../common/error.handler";

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    // allForms = async (): Promise<any> => {
    //     const response = await this.prisma.formSubmission.findMany({
    //         include: {
    //             FormTemplate: true,
    //             Submitter: true
    //         },
    //         where: {
    //             DeletedAt: null
    //         }
    //     });
    //     return FormMapper.toArrayDto(response);
    // };

    create = async (model: FormSubmissionCreateModel) => {
        const response = await this.prisma.formSubmission.create({
            data: {
                FormTemplate: {
                    connect: { id: model.FormTemplateId }
                },
                // Submitter: {
                //     connect: { id: model.AnsweredByUserId }
                // },
                // FormUrl: model.FormUrl,
                Status: 'LinkShared',
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
                UpdatedAt: new Date(),
                Submitter: {
                    connect: { id: model.AnsweredByUserId }
                },
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
            include: {
                FormTemplate: true,
                Submitter: true
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
                UpdatedAt: new Date()
            },
            include: {
                FormTemplate: true,
                Submitter: true
            },
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

    protected addSortingAndPagination = (
        search: Prisma.FormSubmissionFindManyArgs,
        filters: FormSubmissionSearchFilters
    ) => {
        // Sorting
        let orderByColumn: keyof typeof Prisma.FormSubmissionScalarFieldEnum = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy as keyof typeof Prisma.FormSubmissionScalarFieldEnum;
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







    public search = async (filters: FormSubmissionSearchFilters) => {
        try {
            const { search: prismaSearch, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination({}, filters);

            const list = await this.prisma.formSubmission.findMany({
                where: prismaSearch.where,
                include: {
                    FormTemplate: true,
                    Submitter: true
                },
                take: limit,
                skip: (pageIndex - 1) * limit,
                orderBy: {
                    [orderByColumn]: order === 'desc' ? 'desc' : 'asc',
                },
            });

            const count = await this.prisma.formSubmission.count({
                where: prismaSearch.where,
            });

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'desc' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => FormMapper.toDto(x)),
            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };





    private getSearchModel = (filters: FormSubmissionSearchFilters): Prisma.FormSubmissionWhereInput => {
        const where: Prisma.FormSubmissionWhereInput = {
            DeletedAt: null
        };

        if (filters.id) {
            where.id = {
                equals: filters.id,
            };
        }

        if (filters.formTemplateId) {
            where.FormTemplateId = {
                equals: filters.formTemplateId,
            };
        }

        if (filters.formUrl) {
            where.FormUrl = {
                equals: filters.formUrl,
            };
        }

        if (filters.answeredByUserId) {
            where.AnsweredByUserId = {
                equals: filters.answeredByUserId,
            };
        }

        if (filters.submissionTimestamp) {
            where.SubmissionTimestamp = {
                equals: filters.submissionTimestamp,
            };
        }


        return where;
    };

}
