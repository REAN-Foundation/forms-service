import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { FormSubmissionCreateModel, FormSubmissionUpdateModel } from '../../domain.types/forms.submission/form.submission.domain.types';
// import { IformCreateDto, IformUpdateDto } from '../../domain.types/forms/form.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<FormSubmissionCreateModel> => {
        try {
            const schema = joi.object({
                FormTemplateId: joi.string().uuid().required(),
                // FormUrl: joi.string(),
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
                AnsweredByUserId:joi.string(),
            });
            await schema.validateAsync(request.body);
            return {
                Status: request.body.Status ?? null,
                AnsweredByUserId:request.body.AnsweredByUserId ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
