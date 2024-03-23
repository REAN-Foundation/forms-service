import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { QuestionResponseCreateModel, QuestionResponseUpdateModel } from '../../domain.types/forms/response.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class QuestionResponseValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<QuestionResponseCreateModel> => {
        try {
            const schema = joi.object({
                FormSubmissionId: joi.string().uuid().required(),
                QuestionId      : joi.string().uuid().required(),
                ResponseType    : joi.string(),
                IntegerValue    : joi.number(),
                FloatValue      : joi.number(),
                BooleanValue    : joi.boolean(),
                DateTimeValue   : joi.date(),
                Url             : joi.string(),
                FileResourceId  : joi.string(),
                TextValue       : joi.string(),
            });
            await schema.validateAsync(request.body);
            return {
                FormSubmissionId: request.body.FormId,
                QuestionId      : request.body.QuestionId,
                ResponseType    : request.body.ResponseType,
                IntegerValue    : request.body.IntegerValue ?? null,
                FloatValue      : request.body.FloatValue ?? null,
                BooleanValue    : request.body.BooleanValue ?? null,
                DateTimeValue   : new Date(request.body.DateTimeValue) ?? null,
                Url             : request.body.Url ?? null,
                FileResourceId  : request.body.FileResourceId ?? null,
                TextValue       : request.body.TextValue ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<QuestionResponseUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                ResponseType  : joi.string().optional(),
                IntegerValue  : joi.number().optional(),
                FloatValue    : joi.number().optional(),
                BooleanValue  : joi.boolean().optional(),
                DateTimeValue : joi.date().optional(),
                Url           : joi.string().optional(),
                FileResourceId: joi.string().optional(),
                TextValue     : joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                ResponseType  : request.body.ResponseType ?? null,
                IntegerValue  : request.body.IntegerValue ?? null,
                FloatValue    : request.body.FloatValue ?? null,
                BooleanValue  : request.body.BooleanValue ?? null,
                DateTimeValue : new Date(request.body.DateTimeValue) ?? null,
                Url           : request.body.Url ?? null,
                FileResourceId: request.body.FileResourceId ?? null,
                TextValue     : request.body.TextValue ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
