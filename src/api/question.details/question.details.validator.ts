import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { QuestionDetailsCreateModel, QuestionDetailsUpdateModel } from '../../domain.types/forms/question.details.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class QuestionDetailsValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<QuestionDetailsCreateModel> => {
        try {
            const schema = joi.object({
                QuestionId: joi.string().uuid().required(),
                Option: joi.string(),
                OptionSequence: joi.number(),
                FileResourceId: joi.string().uuid(),
                QuestionImageUrl: joi.string(),
                RangeMin: joi.number(),
                RangeMax: joi.number()
            });
            await schema.validateAsync(request.body);
            return {
                QuestionId: request.body.QuestionId,
                Option: request.body.Option,
                OptionSequence: request.body.OptionSequence,
                FileResourceId: request.body.FileResourceId,
                QuestionImageUrl:request.body.QuestionImageUrl,
                RangeMin:request.body.RangeMin,
                RangeMax:request.body.RangeMax
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<QuestionDetailsUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                QuestionId: joi.string().uuid().optional(),
                Option: joi.string().optional(),
                OptionSequence: joi.number().optional(),
                FileResourceId: joi.string().uuid().optional(),
                QuestionImageUrl: joi.string().optional(),
                RangeMin: joi.number().optional(),
                RangeMax: joi.number().optional()
            });
            await schema.validateAsync(request.body);
            return {
                QuestionId: request.body.QuestionId ?? null,
                Option: request.body.Option ?? null,
                OptionSequence: request.body.OptionSequence ?? null,
                FileResourceId: request.body.FileResourceId ?? null,
                QuestionImageUrl:request.body.QuestionImageUrl ?? null,
                RangeMin:request.body.RangeMin ?? null,
                RangeMax:request.body.RangeMax ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
