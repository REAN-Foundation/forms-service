import { Prisma, PrismaClient, QueryResponseType } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { ResponseMapper } from "../mappers/question.response.mapper";
import { QuestionResponseCreateModel, QuestionResponseResponseDto, QuestionResponseSearchFilters, QuestionResponseSearchResponseDto, QuestionResponseUpdateModel } from "../domain.types/forms/response.domain.types";
import { QuestionMapper } from "../mappers/question.mapper";
import { createObjectCsvWriter } from 'csv-writer';
import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { ErrorHandler } from "../common/error.handler";


export class ResponseService {
    prisma: PrismaClient = null;
    private exportDirectory = path.join(__dirname, '../exports');

    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
        if (!fs.existsSync(this.exportDirectory)) {
            fs.mkdirSync(this.exportDirectory);
        }
    }

    // allResponses = async (): Promise<any> => {
    //     const response = await this.prisma.questionResponse.findMany({
    //         include: {
    //             FormSubmission: true,
    //             Question: true
    //         },
    //         where: {
    //             DeletedAt: null
    //         }
    //     });
    //     return ResponseMapper.toArrayDto(response);
    // };

    create = async (model: QuestionResponseCreateModel) => {
        const response = await this.prisma.questionResponse.create({
            data: {
                Question: {
                    connect: { id: model.QuestionId }
                },
                FormSubmission: {
                    connect: { id: model.FormSubmissionId }
                },
                ResponseType: model.ResponseType as QueryResponseType,
                IntegerValue: model.IntegerValue,
                FloatValue: model.FloatValue,
                BooleanValue: model.BooleanValue,
                DateTimeValue: model.DateTimeValue,
                Url: model.Url,
                FileResourceId: model.FileResourceId,
                TextValue: model.TextValue,
                SubmissionTimestamp: null,
                LastSaveTimestamp: new Date(),
                // DeletedAt          : null,
            },
            include: {
                FormSubmission: true,
                Question: true
            }
        });
        return ResponseMapper.toDto(response);
    };

    save = async (model: any) => {
        const response = await this.prisma.questionResponse.create({
            data: {
                Question: {
                    connect: { id: model.QuestionId }
                },
                FormSubmission: {
                    connect: { id: model.FormSubmissionId }
                },
                ResponseType: model.ResponseType as QueryResponseType,
                FloatValue: model.FloatValue,
                IntegerValue: model.IntegerValue,
                BooleanValue: model.BooleanValue,
                DateTimeValue: model.DateTimeValue,
                Url: model.Url,
                TextValue: model.TextValue,
                SubmissionTimestamp: null,
                LastSaveTimestamp: new Date(),
            },
            include: {
                FormSubmission: true,
                Question: true
            }
        });
        return ResponseMapper.toDto(response);
    };

    update = async (id: string, model: QuestionResponseUpdateModel) => {
        const record = await this.prisma.questionResponse.findUnique({
            where: {
                id: id,
                DeletedAt: null
            }
        });
        const response = await this.prisma.questionResponse.update({
            data: {
                ResponseType: model.ResponseType as QueryResponseType ?? record.ResponseType,
                IntegerValue: model.IntegerValue ?? record.IntegerValue,
                FloatValue: model.FloatValue ?? record.FloatValue,
                BooleanValue: model.BooleanValue ?? record.BooleanValue,
                DateTimeValue: model.DateTimeValue ?? record.DateTimeValue,
                Url: model.Url ?? record.Url,
                FileResourceId: model.FileResourceId ?? record.FileResourceId,
                TextValue: model.TextValue ?? record.TextValue,
                LastSaveTimestamp: new Date(),
                UpdatedAt: new Date()
            },
            include: {
                FormSubmission: true,
                Question: true
            },
            where: {
                id: id,
                DeletedAt: null
            },
        });
        return ResponseMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.questionResponse.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
            include: {
                FormSubmission: true,
                Question: true
            }
        });
        return ResponseMapper.toDto(response);
    };

    getQuestionById = async (id: string) => {
        const response = await this.prisma.question.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
            include: {
                ParentFormSection: true,
                ParentFormTemplate: true
            }
        });
        return QuestionMapper.toDto(response);
    };

    delete = async (id: string) => {
        const response = await this.prisma.questionResponse.update({
            where: {
                id: id,
            },
            data: {
                DeletedAt: new Date()
            },
            include: {
                FormSubmission: true,
                Question: true
            }
        });
        return ResponseMapper.toDto(response);
    };

    getAll = async () => {
        const responses = await this.prisma.questionResponse.findMany({
            where: {
                DeletedAt: null,
            },
            include: {
                FormSubmission: true,
                Question: true,
            },
        });

        return responses.map(ResponseMapper.toDto);
    };

    exportCsv = async (): Promise<string> => {
        const data = await this.getAll();
        const csvPath = path.join(__dirname, '../../../storage/data.csv');
        const csvWriter = createObjectCsvWriter({
            path: csvPath,
            header: [
                { id: 'id', title: 'ID' },
                { id: 'FormSubmission.id', title: 'Submission ID' },
                { id: 'FormSubmission.TemplateId', title: 'Template ID' },
                { id: 'FormSubmission.FormUrl', title: 'Form URL' },
                { id: 'FormSubmission.UserId', title: 'User ID' },
                { id: 'FormSubmission.Status', title: 'Status' },
                { id: 'FormSubmission.SubmissionTimestamp', title: 'Submission Timestamp' },
                { id: 'FormSubmission.CreatedAt', title: 'Created At' },
                { id: 'Question.id', title: 'Question ID' },
                { id: 'Question.Title', title: 'Question Title' },
                { id: 'Question.Description', title: 'Question Description' },
                { id: 'Question.DisplayCode', title: 'Display Code' },
                { id: 'Question.ResponseType', title: 'Response Type' },
                { id: 'Question.Score', title: 'Score' },
                { id: 'Question.CorrectAnswer', title: 'Correct Answer' },
                { id: 'Question.Hint', title: 'Hint' },
                { id: 'Question.TemplateId', title: 'Question Template ID' },
                { id: 'Question.SectionId', title: 'Question Section ID' },
                { id: 'Question.CreatedAt', title: 'Question Created At' },
                { id: 'Question.UpdatedAt', title: 'Question Updated At' },
                { id: 'ResponseType', title: 'Query Response Type' },
                { id: 'IntegerValue', title: 'Integer Value' },
                { id: 'FloatValue', title: 'Float Value' },
                { id: 'BooleanValue', title: 'Boolean Value' },
                { id: 'DateTimeValue', title: 'Date Time Value' },
                { id: 'Url', title: 'URL' },
                { id: 'FileResourceId', title: 'File Resource ID' },
                { id: 'TextValue', title: 'Text Value' },
                { id: 'SubmissionTimestamp', title: 'Submission Timestamp' },
                { id: 'LastSaveTimestamp', title: 'Last Save Timestamp' }
            ]
        });
        await csvWriter.writeRecords(data);
        return csvPath;
    };

    exportPdf = async (): Promise<string> => {
        const data = await this.getAll();
        const pdfPath = path.join(__dirname, '../../../storage/data.pdf');
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(pdfPath));

        doc.text('ID\tSubmission ID\tTemplate ID\tForm URL\tUser ID\tStatus\tSubmission Timestamp\tCreated At\t' +
            'Question ID\tQuestion Title\tQuestion Description\tDisplay Code\tResponse Type\tScore\t' +
            'Correct Answer\tHint\tQuestion Template ID\tQuestion Section ID\tQuestion Created At\t' +
            'Question Updated At\tQuery Response Type\tInteger Value\tFloat Value\tBoolean Value\t' +
            'Date Time Value\tURL\tFile Resource ID\tText Value\tSubmission Timestamp\tLast Save Timestamp');

        data.forEach(row => {
            doc.text(`${row.id}\t${row.FormSubmission.id}\t${row.FormSubmission.TemplateId}\t${row.FormSubmission.FormUrl}\t${row.FormSubmission.UserId}\t${row.FormSubmission.Status}\t${row.FormSubmission.SubmissionTimestamp}\t${row.FormSubmission.CreatedAt}\t` +
                `${row.Question.id}\t${row.Question.Title}\t${row.Question.Description}\t${row.Question.DisplayCode}\t${row.Question.ResponseType}\t${row.Question.Score}\t${row.Question.CorrectAnswer}\t${row.Question.Hint}\t` +
                `${row.Question.TemplateId}\t${row.Question.SectionId}\t${row.Question.CreatedAt}\t${row.Question.UpdatedAt}\t${row.ResponseType}\t${row.IntegerValue}\t${row.FloatValue}\t${row.BooleanValue}\t` +
                `${row.DateTimeValue}\t${row.Url}\t${row.FileResourceId}\t${row.TextValue}\t${row.SubmissionTimestamp}\t${row.LastSaveTimestamp}`);
        });

        doc.end();
        return pdfPath;
    };



    protected addSortingAndPagination = (
        search: Prisma.QuestionResponseFindManyArgs,
        filters: QuestionResponseSearchFilters
    ) => {
        // Sorting
        let orderByColumn: keyof typeof Prisma.QuestionResponseScalarFieldEnum = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy as keyof typeof Prisma.QuestionResponseScalarFieldEnum;
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







    public search = async (filters: QuestionResponseSearchFilters) => {
        try {
            const { search: prismaSearch, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination({}, filters);

            const list = await this.prisma.questionResponse.findMany({
                where: prismaSearch.where,
                include: {
                    FormSubmission: true,
                    Question: true,
                },
                take: limit,
                skip: (pageIndex - 1) * limit,
                orderBy: {
                    [orderByColumn]: order === 'desc' ? 'desc' : 'asc',
                },
            });

            const count = await this.prisma.questionResponse.count({
                where: prismaSearch.where,
            });

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'desc' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => ResponseMapper.toDto(x)),
            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };





    private getSearchModel = (filters: QuestionResponseSearchFilters): Prisma.QuestionResponseWhereInput => {
        const where: Prisma.QuestionResponseWhereInput = {
            DeletedAt: null
        };

        if (filters.formSubmissionId) {
            where.FormSubmissionId = {
                equals: filters.formSubmissionId,
            };
        }

        if (filters.questionId) {
            where.QuestionId = {
                equals: filters.questionId,
            };
        }

        if (filters.responseType) {
            where.ResponseType = {
                equals: filters.responseType,
            };
        }

        if (filters.integerValue) {
            where.IntegerValue = {
                equals: filters.integerValue,
            };
        }

        if (filters.floatValue) {
            where.FloatValue = {
                equals: filters.floatValue,
            };
        }

        if (filters.booleanValue) {
            where.BooleanValue = {
                equals: filters.booleanValue,
            };
        }
        if (filters.url) {
            where.Url = {
                equals: filters.url,
            };
        }
        if (filters.fileResourceId) {
            where.FileResourceId = {
                equals: filters.fileResourceId,
            };
        }
        if (filters.textValue) {
            where.TextValue = {
                equals: filters.textValue,
            };
        }

        return where;
    };

}
