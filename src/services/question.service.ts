import { Prisma, PrismaClient, QueryResponseType } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { QuestionMapper } from "../mappers/question.mapper";
import { QuestionCreateModel, QuestionOption, QuestionSearchFilters, QuestionSearchResponseDto, QuestionUpdateModel } from "../domain.types/forms/question.domain.types";
import { ErrorHandler } from "../common/error.handler";


export class QuestionService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    // allQuestions = async (): Promise<any> => {
    //     const response = await this.prisma.question.findMany({
    //         include: {
    //             ParentFormTemplate: true,
    //             ParentFormSection: true
    //         },
    //         where: {
    //             DeletedAt: null
    //         }
    //     });
    //     return QuestionMapper.toArrayDto(response);
    // };

    // create = async (model: QuestionCreateModel) => {

    //     const jsonData: Prisma.JsonValue = {
    //         Sequence: model.Options.Sequence,
    //         Option: model.Options.Data,
    //         ImageUrl: model.Options.ImageUrl,
    //     } as Prisma.JsonObject;

    //     const response = await this.prisma.question.create({
    //         data: {
    //             ParentFormTemplate: {
    //                 connect: { id: model.ParentTemplateId }
    //             },
    //             ParentFormSection: {
    //                 connect: { id: model.ParentSectionId }
    //             },
    //             Title: model.Title,
    //             Description: model.Description,
    //             DisplayCode: model.DisplayCode,
    //             ResponseType: model.ResponseType as QueryResponseType,
    //             Score: model.Score,
    //             CorrectAnswer: model.CorrectAnswer,
    //             Hint: model.Hint,
    //             Sequence: model.Sequence,
    //             Options: jsonData,
    //             QuestionImageUrl: model.QuestionImageUrl,
    //             RangeMax: model.RangeMax,
    //             RangeMin: model.RangeMin,
    //             CreatedAt: new Date(),
    //             // UpdatedAt: new Date(),
    //             // DeletedAt: null,
    //         },
    //         include: {
    //             ParentFormTemplate: true,
    //             ParentFormSection: true
    //         }
    //     });
    //     return QuestionMapper.toDto(response);

    // };

    create = async (model: QuestionCreateModel) => {
        let jsonData: Prisma.JsonValue | undefined;

        if (model.Options && model.Options.length > 0) {
            jsonData = model.Options.map((option) => ({
                Text: option.Text,
                Sequence: option.Sequence,
                ImageUrl: option.ImageUrl,
            })) as Prisma.JsonArray;
        }

        const response = await this.prisma.question.create({
            data: {
                ParentFormTemplate: {
                    connect: { id: model.ParentTemplateId },
                },
                ParentFormSection: {
                    connect: { id: model.ParentSectionId },
                },
                Title: model.Title,
                Description: model.Description,
                DisplayCode: model.DisplayCode,
                ResponseType: model.ResponseType as QueryResponseType,
                Score: model.Score,
                CorrectAnswer: model.CorrectAnswer,
                Hint: model.Hint,
                Sequence: model.Sequence,
                Options: jsonData, // Only assign if jsonData is defined
                QuestionImageUrl: model.QuestionImageUrl,
                RangeMax: model.RangeMax,
                RangeMin: model.RangeMin,
                CreatedAt: new Date(),
                // UpdatedAt: new Date(),
                // DeletedAt: null, 
            },
            include: {
                ParentFormTemplate: true,
                ParentFormSection: true,
            },
        });

        // Convert response to DTO
        return QuestionMapper.toDto(response);
    };

    update = async (id: string, model: QuestionUpdateModel) => {
        let jsonData: Prisma.JsonValue | undefined;

        if (model.Options && model.Options.length > 0) {
            jsonData = model.Options.map((option) => ({
                Text: option.Text,
                Sequence: option.Sequence,
                ImageUrl: option.ImageUrl,
            })) as Prisma.JsonArray;
        }
        const response = await this.prisma.question.update({
            data: {
                Title: model.Title,
                Description: model.Description,
                // DisplayCode: model.DisplayCode,
                // ResponseType: model.ResponseType as QueryResponseType,
                Score: model.Score,
                CorrectAnswer: model.CorrectAnswer,
                Hint: model.Hint,
                Options: jsonData, // Only assign if jsonData is defined
                QuestionImageUrl: model.QuestionImageUrl,
                RangeMax: model.RangeMax,
                RangeMin: model.RangeMin,
                UpdatedAt: new Date()
            },
            include: {
                ParentFormSection: true,
                ParentFormTemplate: true
            },
            where: {
                id: id,
                DeletedAt: null
            }
        });
        return QuestionMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.question.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
            include: {
                ParentFormSection: true,
                ParentFormTemplate: true
            },
        });
        return QuestionMapper.toDto(response);
    };

    getByTemplateId = async (id: string) => {
        const response = await this.prisma.question.findMany({
            where: {
                ParentTemplateId: id,
                DeletedAt: null
            },
            include: {
                ParentFormSection: true,
                ParentFormTemplate: true
            },
        });
        return QuestionMapper.toArrayDto(response);
    };

    delete = async (id: string) => {
        const response = await this.prisma.question.update({
            where: {
                id: id,
                DeletedAt: null
            },
            data: {
                DeletedAt: new Date()
            },
            include: {
                ParentFormSection: true,
                ParentFormTemplate: true
            },
        });
        return QuestionMapper.toDto(response);
    };

    protected addSortingAndPagination = (
        search: Prisma.QuestionFindManyArgs,
        filters: QuestionSearchFilters
    ) => {
        // Sorting
        let orderByColumn: keyof typeof Prisma.QuestionScalarFieldEnum = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy as keyof typeof Prisma.QuestionScalarFieldEnum;
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

    public search = async (filters: QuestionSearchFilters) => {
        try {
            const { search: prismaSearch, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination({}, filters);

            const list = await this.prisma.question.findMany({
                where: prismaSearch.where,
                include: {
                    ParentFormSection: true,
                    ParentFormTemplate: true
                },
                take: limit,
                skip: (pageIndex - 1) * limit,
                orderBy: {
                    [orderByColumn]: order === 'desc' ? 'desc' : 'asc',
                },
            });

            const count = await this.prisma.question.count({
                where: prismaSearch.where,
            });

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'desc' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => QuestionMapper.toDto(x)),
            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    private getSearchModel = (filters: QuestionSearchFilters): Prisma.QuestionWhereInput => {
        const where: Prisma.QuestionWhereInput = { DeletedAt: null };

        if (filters.id) {
            where.id = {
                equals: filters.id,
            };
        }
        if (filters.parentTemplateId) {
            where.ParentTemplateId = {
                equals: filters.parentTemplateId,
            };
        }
        if (filters.parentSectionId) {
            where.ParentSectionId = {
                equals: filters.parentSectionId,
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

        if (filters.displayCode) {
            where.DisplayCode = {
                equals: filters.displayCode,
            };
        }

        if (filters.responseType) {
            where.ResponseType = {
                equals: filters.responseType,
            };
        }

        if (filters.score) {
            where.Score = {
                equals: filters.score,
            };
        }
        if (filters.hint) {
            where.Hint = {
                equals: filters.hint,
            };
        }
        // if (filters.options) {
        //     where.Options = {
        //         equals: filters.options,
        //     };
        // }
        if (filters.questionImageUrl) {
            where.QuestionImageUrl = {
                equals: filters.questionImageUrl,
            };
        }
        if (filters.rangeMin) {
            where.RangeMin = {
                equals: filters.rangeMin,
            };
        }
        if (filters.rangeMax) {
            where.RangeMax = {
                equals: filters.rangeMax,
            };
        }
        if (filters.correctAnswer) {
            where.CorrectAnswer = {
                equals: filters.correctAnswer,
            };
        }

        return where;
    };

}
