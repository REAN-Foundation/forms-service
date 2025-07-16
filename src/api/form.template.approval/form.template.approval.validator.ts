import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/handlers/error.handler';
import BaseValidator from '../base.validator';
import {
    FormTemplateApprovalCreateModel,
    FormTemplateApprovalSearchFilters,
    FormTemplateApprovalUpdateModel,
} from '../../domain.types/forms/form.template.approval.domain.types';
import { ParsedQs } from 'qs';

export class FormTemplateApprovalValidator extends BaseValidator {
    public validateCreateRequest = async (
        request: express.Request
    ): Promise<FormTemplateApprovalCreateModel> => {
        try {
            const schema = joi.object({
                ApproverUserId: joi.string().uuid().required(),
                TemplateId: joi.string().uuid().required(),
                Approved: joi.boolean().required(),
                ReviewComments: joi.string().max(512).optional(),
            });
            await schema.validateAsync(request.body);
            return {
                ApproverUserId: request.body.ApproverUserId,
                TemplateId: request.body.TemplateId,
                Approved: request.body.Approved,
                ReviewComments: request.body.ReviewComments,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (
        request: express.Request
    ): Promise<FormTemplateApprovalUpdateModel> => {
        try {
            const schema = joi.object({
                ApproverUserId: joi.string().uuid().optional(),
                TemplateId: joi.string().uuid().optional(),
                Approved: joi.boolean().optional(),
                ReviewComments: joi.string().max(512).optional(),
            });
            await schema.validateAsync(request.body);
            return {
                ApproverUserId: request.body.ApproverUserId ?? null,
                TemplateId: request.body.TemplateId ?? null,
                Approved: request.body.Approved ?? null,
                ReviewComments: request.body.ReviewComments ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (
        request: express.Request
    ): Promise<FormTemplateApprovalSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                approverUserId: joi.string().uuid().optional(),
                templateId: joi.string().uuid().optional(),
                approved: joi.boolean().optional(),
                itemsPerPage: joi.number().optional(),
                pageIndex: joi.number().optional(),
                orderBy: joi.string().optional(),
                order: joi.string().optional(),
            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (
        query: ParsedQs
    ): FormTemplateApprovalSearchFilters => {
        const filters: any = {};

        const id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }

        const approverUserId = query.approverUserId
            ? query.approverUserId
            : null;
        if (approverUserId != null) {
            filters['ApproverUserId'] = approverUserId;
        }

        const templateId = query.templateId ? query.templateId : null;
        if (templateId != null) {
            filters['TemplateId'] = templateId;
        }

        const approved = query.approved !== undefined ? query.approved : null;
        if (approved != null) {
            filters['Approved'] = approved === 'true';
        }

        const itemsPerPage = query.itemsPerPage ? query.itemsPerPage : 25;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = Number(itemsPerPage);
        }

        const orderBy = query.orderBy ? query.orderBy : 'CreatedAt';
        if (orderBy != null) {
            filters['OrderBy'] = orderBy;
        }

        const order = query.order ? query.order : 'ASC';
        if (order != null) {
            filters['Order'] = order;
        }

        const pageIndex = query.pageIndex ? query.pageIndex : 0;
        if (pageIndex != null) {
            filters['PageIndex'] = pageIndex;
        }

        return filters;
    };
}
