import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { QuestionCreateModel, QuestionUpdateModel } from '../../domain.types/forms/question.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class QuestionValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<QuestionCreateModel> => {
        try {
            const schema = joi.object({
                TemplateId: joi.string().uuid().required(),
                SectionId: joi.string().uuid().required(),
                Title: joi.string(),
                Description: joi.string().optional(),
                DisplayCode: joi.string(),
                ResponseType: joi.string(),
                Score: joi.number(),
                CorrectAnswer: joi.string(),
                Hint: joi.string()
            });
            await schema.validateAsync(request.body);
            return {
                TemplateId: request.body.TemplateId,
                SectionId: request.body.SectionId,
                Title: request.body.Title,
                Description: request.body.Description,
                DisplayCode: request.body.DisplayCode,
                ResponseType: request.body.ResponseType,
                Score: request.body.Score,
                CorrectAnswer: request.body.CorrectAnswer,
                Hint: request.body.Hint
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<QuestionUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                TemplateId: joi.string().uuid().optional(),
                SectionId: joi.string().uuid().optional(),
                Title: joi.string().optional(),
                Description: joi.string().optional(),
                DisplayCode: joi.string().optional(),
                ResponseType: joi.string().optional(),
                Score: joi.number().optional(),
                CorrectAnswer: joi.string().optional(),
                Hint: joi.string().optional()
            });
            await schema.validateAsync(request.body);
            return {
                TemplateId: request.body.TemplateId ?? null,
                SectionId: request.body.SectionId ?? null,
                Title: request.body.Title ?? null,
                Description: request.body.Description ?? null,
                DisplayCode: request.body.DisplayCode ?? null,
                ResponseType: request.body.ResponseType ?? null,
                Score: request.body.Score ?? null,
                CorrectAnswer: request.body.CorrectAnswer ?? null,
                Hint: request.body.Hint ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
