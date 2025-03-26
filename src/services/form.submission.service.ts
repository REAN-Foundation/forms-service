import { FormStatus, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { FormMapper } from "../mappers/form.submission.mapper"
import { FormSubmissionCreateModel, FormSubmissionSearchFilters, FormSubmissionUpdateModel } from "../domain.types/forms/form.submission.domain.types";
import { uuid } from "../domain.types/miscellaneous/system.types";
import { ErrorHandler } from "../common/error.handler";
import { autoInjectable } from "tsyringe";

///////////////////////////////////////////////////////////////////////////////////////////////
@autoInjectable()
export class FormService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    create = async (model: FormSubmissionCreateModel) => {
        const response = await this.prisma.formSubmission.create({
            data: {
                FormTemplate: {
                    connect: { id: model.FormTemplateId }
                },
                UserId: model.UserId,
                Status: model.Status,
                ValidTill: model.ValidTill,
            },
            include: {
                FormTemplate: true,
            }
        });

        return FormMapper.toDto(response);
    };

    update = async (id: string, model: FormSubmissionUpdateModel) => {

        const response = await this.prisma.formSubmission.update({
            where: {
                id: id,
                DeletedAt: null
            },
            data: model,
            include: {
                FormTemplate: true,

            },
        });
        return FormMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.formSubmission.findUnique({
            include: {
                FormTemplate: true,
            },
            where: {
                id: id,
                DeletedAt: null
            },
        });
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
            }
        });
        return FormMapper.toDto(response);
    };

    submit = async (id: uuid) => {
        const response = await this.prisma.formSubmission.update({
            where: {
                id: id,
                DeletedAt: null
            },
            data: {
                SubmittedAt: new Date(),
                Status: FormStatus.Submitted,
                UpdatedAt: new Date()
            },
            include: {
                FormTemplate: true,
            },
        });
        return FormMapper.toDto(response);
    };

    public search = async (filters: FormSubmissionSearchFilters) => {
        try {
            const search = this.getSearchModel(filters);

            const list = await this.prisma.formSubmission.findMany(search);

            const count = await this.prisma.formSubmission.count({
                where: search.where,
            });

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: filters.PageIndex,
                ItemsPerPage: filters.ItemsPerPage,
                Order: filters.Order,
                OrderedBy: filters.OrderBy,
                Items: list.map((x) => FormMapper.toDto(x)),
            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    private getSearchModel = (filters: FormSubmissionSearchFilters) => {
        const searchFilter = {
            where: {}
        }

        if (filters.FormTemplateId) {
            searchFilter.where["FormTemplateId"] = filters.FormTemplateId
        }

        if (filters.UserId) {
            searchFilter.where["UserId"] = filters.UserId
        }

        if (filters.Encrypted) {
            searchFilter.where["Encrypted"] = filters.Encrypted
        }

        if (filters.Status) {
            searchFilter.where["Status"] = filters.Status
        }

        if (filters.ValidTill) {
            searchFilter.where["ValidTill"] = filters.ValidTill
        }

        if (filters.SubmittedAt) {
            searchFilter.where["SubmittedAt"] = filters.SubmittedAt
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
