import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { FormCreateModel, FormUpdateModel } from '../../domain.types/forms/form.domain.types';
// import { IformCreateDto, IformUpdateDto } from '../../domain.types/forms/form.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<FormCreateModel> => {
        try {
            const schema = joi.object({
                FormTemplateId: joi.string().uuid().required(),
                FormUrl: joi.string(),
                AnsweredByUserId: joi.string().uuid(),
                Status: joi.string(),
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

    public validateUpdateRequest = async (request: express.Request): Promise<FormUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                FormTemplateId: joi.string().uuid().optional(),
                FormUrl: joi.string().optional(),
                AnsweredByUserId: joi.string().uuid().optional(),
                Status: joi.string().optional()
            });
            await schema.validateAsync(request.body);
            return {
                FormTemplateId: request.body.FormTemplateId ?? null,
                FormUrl: request.body.FormUrl ?? null,
                AnsweredByUserId: request.body.AnsweredByUserId ?? null,
                Status: request.body.Status ?? null,

            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
