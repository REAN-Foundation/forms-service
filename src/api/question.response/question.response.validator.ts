import joi from "joi";
import express from "express";
import { ErrorHandler } from "../../common/error.handler";
import BaseValidator from "../base.validator";
import {
    QuestionResponseCreateModel,
    QuestionResponseSearchFilters,
    QuestionResponseUpdateModel,
} from "../../domain.types/forms/response.domain.types";
import { ParsedQs } from 'qs';
///////////////////////////////////////////////////////////////////////////////////////////////

export class QuestionResponseValidator extends BaseValidator {
    public validateCreateRequest = async (
        request: express.Request
    ): Promise<QuestionResponseCreateModel> => {
        try {
            const schema = joi.object({
                FormSubmissionId: joi.string().uuid().required(),
                QuestionId: joi.string().uuid().required(),
                ResponseType: joi.string(),
                IntegerValue: joi.number().optional(),
                FloatValue: joi.number().optional(),
                BooleanValue: joi.boolean().optional(),
                DateTimeValue: joi.date().optional(),
                Url: joi.string().optional(),
                FileResourceId: joi.string().optional(),
                TextValue: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                FormSubmissionId: request.body.FormSubmissionId,
                QuestionId: request.body.QuestionId,
                ResponseType: request.body.ResponseType,
                IntegerValue: request.body.IntegerValue ?? null,
                FloatValue: request.body.FloatValue ?? null,
                BooleanValue: request.body.BooleanValue ?? null,
                DateTimeValue: new Date(request.body.DateTimeValue) ?? null,
                Url: request.body.Url ?? null,
                FileResourceId: request.body.FileResourceId ?? null,
                TextValue: request.body.TextValue ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (
        request: express.Request
    ): Promise<QuestionResponseUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                ResponseType: joi.string().optional(),
                IntegerValue: joi.number().optional(),
                FloatValue: joi.number().optional(),
                BooleanValue: joi.boolean().optional(),
                DateTimeValue: joi.date().optional(),
                Url: joi.string().optional(),
                FileResourceId: joi.string().optional(),
                TextValue: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                ResponseType: request.body.ResponseType ?? null,
                IntegerValue: request.body.IntegerValue ?? null,
                FloatValue: request.body.FloatValue ?? null,
                BooleanValue: request.body.BooleanValue ?? null,
                DateTimeValue: new Date(request.body.DateTimeValue) ?? null,
                Url: request.body.Url ?? null,
                FileResourceId: request.body.FileResourceId ?? null,
                TextValue: request.body.TextValue ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateResponseRequest = async (
        request: express.Request
    ): Promise<any | undefined> => {
        try {
            const schema = joi.object({
                FormSubmissionId: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                FormSubmissionId: request.body.FormSubmissionId ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };


    public validateSearchRequest = async (request: express.Request): Promise<QuestionResponseSearchFilters> => {
        try {
            const schema = joi.object({
                formSubmissionId: joi.string().uuid().optional(),
                questionId: joi.string().uuid().optional(),
                responseType: joi.string().optional(),
                integerValue: joi.number().optional(),
                floatValue: joi.string().optional(),
                booleanValue: joi.boolean().optional(),
                url: joi.string().optional(),
                fileResourceId : joi.string().optional(),
                textValue:joi.string().optional()
            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: ParsedQs): QuestionResponseSearchFilters => {
        var filters = {};

        var formSubmissionId = query.formSubmissionId ? query.formSubmissionId : null;
        if (formSubmissionId != null) {
            filters['formSubmissionId'] = formSubmissionId;
        }
        var questionId = query.questionId ? query.questionId : null;
        if (questionId != null) {
            filters['questionId'] = questionId;
        }
        var responseType = query.responseType ? query.responseType : null;
        if (responseType != null) {
            filters['responseType'] = responseType;
        }
        var integerValue = query.integerValue ? query.integerValue : null;
        if (integerValue != null) {
            filters['integerValue'] = integerValue;
        }

        var floatValue = query.floatValue ? query.floatValue : null;
        if (floatValue != null) {
            filters['floatValue'] = floatValue;
        }
        var booleanValue = query.booleanValue ? query.booleanValue : null;
        if (booleanValue != null) {
            filters['booleanValue'] = booleanValue;
        }
        var url = query.url ? query.url : null;
        if (url != null) {
            filters['url'] = url;
        }
        var fileResourceId = query.fileResourceId ? query.fileResourceId : null;
        if (fileResourceId != null) {
            filters['fileResourceId'] = fileResourceId;
        }
        var textValue = query.textValue ? query.textValue : null;
        if (textValue != null) {
            filters['textValue'] = textValue;
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
