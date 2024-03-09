import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { ResponseCreateModel, ResponseUpdateModel } from '../../domain.types/forms/response.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ResponseValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<ResponseCreateModel> => {
        try {
            const schema = joi.object({
                FormId: joi.string().uuid().required(),
                FormTemplateId: joi.string().uuid().required(),
                QuestionId: joi.string().uuid().required(),
                ResponseType: joi.string(),
                IntegerValue: joi.number(),
                FloatValue: joi.number(),
                BooleanValue: joi.boolean(),
                DateTimeValue: joi.date(),
                Url: joi.string(),
                FileResourceId: joi.string(),
                TextValue: joi.string(),
                SubmissionTimestamp: joi.date(),
                LastSaveTimestamp: joi.string(),
                // CreatedAt: joi.string()
            });
            await schema.validateAsync(request.body);
            return {
                FormId: request.body.FormId,
                FormTemplateId: request.body.FormTemplateId,
                QuestionId: request.body.QuestionId,
                ResponseType: request.body.ResponseType,
                IntegerValue: request.body.IntegerValue,
                FloatValue: request.body.FloatValue,
                BooleanValue: request.body.BooleanValue,
                DateTimeValue: new Date(request.body.DateTimeValue),
                Url: request.body.Url,
                FileResourceId: request.body.FileResourceId,
                TextValue: request.body.TextValue,
                SubmissionTimestamp: new Date(request.body.SubmissionTimestamp),
                LastSaveTimestamp: new Date(request.body.LastSaveTimestamp)
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<ResponseUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                FormId: joi.string().uuid().optional(),
                FormTemplateId: joi.string().uuid().optional(),
                QuestionId: joi.string().uuid().optional(),
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
                FormId: request.body.FormId ?? null,
                FormTemplateId: request.body.FormTemplateId ?? null,
                QuestionId: request.body.QuestionId ?? null,
                ResponseType: request.body.ResponseType ?? null,
                IntegerValue: request.body.IntegerValue ?? null,
                FloatValue: request.body.FloatValue ?? null,
                BooleanValue: request.body.BooleanValue ?? null,
                DateTimeValue: request.body.DateTimeValue ?? null,
                Url: request.body.Url ?? null,
                FileResourceId: request.body.FileResourceId ?? null,
                TextValue: request.body.TextValue ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
