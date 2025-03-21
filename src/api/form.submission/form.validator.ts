import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { FormStatus, FormSubmissionCreateModel, FormSubmissionSearchFilters, FormSubmissionUpdateModel, FormType } from '../../domain.types/forms/form.submission.domain.types';
import { ParsedQs } from 'qs';
import * as crypto from "crypto";
import { TimeHelper } from '../../common/time.helper';
import { DurationType } from '../../miscellaneous/time.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<FormSubmissionCreateModel> => {
        try {
            const schema = joi.object({
                UserId: joi.string().uuid().optional(),
                FormTemplateId: joi.string().uuid().required(),
                FormCategory: joi.string().optional(),
            });

            await schema.validateAsync(request.body);
            
            const model = this.getFormSubmissionCreateModel(request);
            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<FormSubmissionUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                UserId: joi.string().uuid().optional(),
                Encrypted: joi.string().optional(),
                Unencrypted: joi.string().optional(),
                Link: joi.string().optional(),
                LinkQueryParams: joi.object().optional(),
                Status: joi.string().optional(),
                SubmittedAt: joi.date().optional(),
                
            });

            await schema.validateAsync(request.body);
            const model: FormSubmissionUpdateModel = this.getFormSubmissionUpdateModel(request);
            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<FormSubmissionSearchFilters> => {
        try {
            const schema = joi.object({
                formTemplateId: joi.string().uuid().optional(),
                userId: joi.string().uuid().optional(),
                encrypted: joi.string().optional(),
                status: joi.string().valid(...Object.values(FormStatus)).optional(),
                validTill: joi.date().optional(),
                submittedAt: joi.date().optional(),
                link: joi.string().optional(),
                itemsPerPage: joi.number().optional(),
                pageIndex: joi.number().optional(),
                orderBy: joi.string().optional(),
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

        const formTemplateId = query.formTemplateId ? query.formTemplateId : null;
        if (formTemplateId != null) {
            filters['FormTemplateId'] = formTemplateId;
        }

        const userId = query.userId ? query.userId : null;
        if (userId != null) {
            filters['UserId'] = userId;
        }

        const encrypted = query.encrypted ? query.encrypted : null;
        if (encrypted != null) {
            filters['Encrypted'] = encrypted;
        }

        const status = query.status ? query.status : null;
        if (status != null) {
            filters['Status'] = status;
        }

        var submittedAt = query.submittedAt ? query.submittedAt : null;
        if (submittedAt != null) {
            filters['SubmittedAt'] = submittedAt;
        }

        var validTill = query.validTill ? query.validTill : null;
        if (validTill != null) {
            filters['ValidTill'] = validTill;
        }

        var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : 25;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = Number(itemsPerPage);
        }
        var orderBy = query.orderBy ? query.orderBy : 'CreatedAt';
        if (orderBy != null) {
            filters['OrderBy'] = orderBy;
        }
        var order = query.order ? query.order : 'ASC';
        if (order != null) {
            filters['Order'] = order;
        }

        const pageIndex = query.pageIndex ? query.pageIndex : 1;
        if (pageIndex != null) {
            filters['PageIndex'] = pageIndex;
        }

        return filters;
    };

    private getFormSubmissionCreateModel = (request: express.Request): FormSubmissionCreateModel => {
        const model: FormSubmissionCreateModel = {
            FormTemplateId: request.body.FormTemplateId,
            UserId: request.body.UserId ?? null,
            Status: request.body.Status ?? FormStatus.LinkShared,
            Category: request.body.FormCategory as FormType ?? FormType.Survey,
            
        };

        const validTill = TimeHelper.addDuration(new Date(), 1, DurationType.Day);
        model.ValidTill = validTill;
        return model;
    };

    getFormSubmissionUpdateModel = (request) => {

        const model: FormSubmissionUpdateModel = {};
        if (request.body.UserId) {
            model.UserId = request.body.UserId;
        }

        if (request.body.Encrypted) {
            model.Encrypted = request.body.Encrypted;
        }

        if (request.body.Unencrypted) {
            model.Unencrypted = request.body.Unencrypted;
        }

        if (request.body.Link) {
            model.Link = request.body.Link;
        }

        if (request.body.QueryParams) {
            model.LinkQueryParams = JSON.stringify(request.body.QueryParams);
        }

        if (request.body.Status) {
            model.Status = request.body.Status;
        }
  
        if(request.body.SubmittedAt){
            model.SubmittedAt = request.body.SubmittedAt
        }
        return model;
    }

}
