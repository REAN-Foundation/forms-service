import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { FormSubmissionCreateModel, FormSubmissionSearchFilters, FormSubmissionUpdateModel } from '../../domain.types/forms/form.submission.domain.types';
// import { IformCreateDto, IformUpdateDto } from '../../domain.types/forms/form.domain.types';
import { ParsedQs } from 'qs';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<FormSubmissionCreateModel> => {
        try {
            const schema = joi.object({
                FormTemplateId: joi.string().uuid().required(),
                FormUrl: joi.string(),
                // AnsweredByUserId: joi.string().uuid(),
                // Status: joi.string(),
                // SubmissionTimestamp: joi.date(),

            });
            await schema.validateAsync(request.body);
            return {
                FormTemplateId: request.body.FormTemplateId,
                FormUrl: request.body.FormUrl,
                AnsweredByUserId: request.body.AnsweredByUserId,
                Status: request.body.Status,

            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<FormSubmissionUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                Status: joi.string().optional(),
                AnsweredByUserId: joi.string(),
            });
            await schema.validateAsync(request.body);
            return {
                Status: request.body.Status ?? null,
                AnsweredByUserId: request.body.AnsweredByUserId ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<FormSubmissionSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                formTemplateId: joi.string().uuid().optional(),
                formUrl: joi.string().optional(),
                answeredByUserId: joi.string().uuid().optional(),
                status: joi.string().optional(),
                submissionTimestamp: joi.date().optional(),
            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: ParsedQs): FormSubmissionSearchFilters => {
        var filters: any = {};

        var id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }

        var formTemplateId = query.formTemplateId ? query.formTemplateId : null;
        if (formTemplateId != null) {
            filters['formTemplateId'] = formTemplateId;
        }
        var formUrl = query.formUrl ? query.formUrl : null;
        if (formUrl != null) {
            filters['formUrl'] = formUrl;
        }
        var answeredByUserId = query.answeredByUserId ? query.answeredByUserId : null;
        if (answeredByUserId != null) {
            filters['answeredByUserId'] = answeredByUserId;
        }
        var status = query.status ? query.status : null;
        if (status != null) {
            filters['status'] = status;
        }

        var submissionTimestamp = query.submissionTimestamp ? query.submissionTimestamp : null;
        if (submissionTimestamp != null) {
            filters['submissionTimestamp'] = submissionTimestamp;
        }

        var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : 25;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = itemsPerPage;
        }
        var orderBy = query.orderBy ? query.orderBy : 'CreatedAt';
        if (orderBy != null) {
            filters['OrderBy'] = orderBy;
        }
        var order = query.order ? query.order : 'ASC';
        if (order != null) {
            filters['Order'] = order;
        }
        return filters;
    };
}
