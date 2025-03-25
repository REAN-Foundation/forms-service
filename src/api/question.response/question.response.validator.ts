import joi from "joi";
import express from "express";
import { ErrorHandler } from "../../common/error.handler";
import BaseValidator from "../base.validator";
import {
    QuestionResponseCreateModel,
    QuestionResponseSaveModel,
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
                fileResourceId: joi.string().optional(),
                textValue: joi.string().optional()
            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSaveRequest = async (request: express.Request): Promise<QuestionResponseSaveModel> => {
        try {
            const schema = joi.object({
                QuestionResponses: joi.array().items(joi.object({
                    id: joi.string().uuid().optional().allow(null),
                    FormSubmissionId: joi.string().uuid().required(),
                    QuestionId: joi.string().uuid().required(),
                    ResponseType: joi.string().required(),
                    IntegerValue: joi.number().optional().allow(null),
                    FloatValue: joi.number().optional().allow(null),
                    BooleanValue: joi.string().optional().allow(null),  
                    DateTimeValue: joi.date().optional().allow(null),
                    Url: joi.string().optional().allow(null),
                    FileResourceId: joi.string().optional().allow(null),
                    TextValue: joi.string().optional().allow(null),
                })).min(0).required(),
            
                FormSubmissionKey: joi.string().length(64).required().messages({
                    'string.length': 'Invalid FormSubmissionKey, must be exactly 64 characters.',
                    'string.base': 'FormSubmissionKey must be a string.',
                    'any.required': 'FormSubmissionKey is required.'
                })
            });
            await schema.validateAsync(request.body);
            const model = this.getQuestionResponseSaveModel(request.body);
            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    private getQuestionResponseSaveModel = (body: any): QuestionResponseSaveModel => {
        const model: QuestionResponseSaveModel = {
            QuestionResponses: body.QuestionResponses,
            FormSubmissionKey: body.FormSubmissionKey
        };
        return model;
    }

    private getSearchFilters = (query: ParsedQs): QuestionResponseSearchFilters => {
        var filters: any = {};

        var formSubmissionId = query.formSubmissionId ? query.formSubmissionId : null;
        if (formSubmissionId != null) {
            filters['FormSubmissionId'] = formSubmissionId;
        }
        var questionId = query.questionId ? query.questionId : null;
        if (questionId != null) {
            filters['QuestionId'] = questionId;
        }
        var responseType = query.responseType ? query.responseType : null;
        if (responseType != null) {
            filters['ResponseType'] = responseType;
        }
        var integerValue = query.integerValue ? query.integerValue : null;
        if (integerValue != null) {
            filters['IntegerValue'] = integerValue;
        }

        var floatValue = query.floatValue ? query.floatValue : null;
        if (floatValue != null) {
            filters['FloatValue'] = floatValue;
        }
        var booleanValue = query.booleanValue ? query.booleanValue : null;
        if (booleanValue != null) {
            filters['BooleanValue'] = booleanValue;
        }
        var url = query.url ? query.url : null;
        if (url != null) {
            filters['Url'] = url;
        }
        var fileResourceId = query.fileResourceId ? query.fileResourceId : null;
        if (fileResourceId != null) {
            filters['FileResourceId'] = fileResourceId;
        }
        var textValue = query.textValue ? query.textValue : null;
        if (textValue != null) {
            filters['TextValue'] = textValue;
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

        const pageIndex = query.pageIndex ? query.pageIndex : 0;
        if (pageIndex != null) {
            filters['PageIndex'] = pageIndex;
        }

        return filters;
    };

}
