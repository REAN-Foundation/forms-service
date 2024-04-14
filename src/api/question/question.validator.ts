import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { QuestionCreateModel, QuestionUpdateModel } from '../../domain.types/forms.submission/question.domain.types';
import { generateDisplayCode } from '../../domain.types/miscellaneous/display.code';

///////////////////////////////////////////////////////////////////////////////////////////////

export class QuestionValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<QuestionCreateModel> => {
        try {
            const schema = joi.object({
                ParentTemplateId: joi.string().uuid().required(),
                ParentSectionId : joi.string().uuid().required(),
                Title           : joi.string(),
                Description     : joi.string().optional(),
                DisplayCode     : joi.string().optional(),
                ResponseType    : joi.string().required(),
                Score           : joi.number().optional(),
                CorrectAnswer   : joi.string().optional(),
                Hint            : joi.string().optional(),
                Options          : joi.string().optional(),
                // FileResourceId  : joi.string().uuid(),
                QuestionImageUrl: joi.string().optional(),
                RangeMin        : joi.number().optional(),
                RangeMax        : joi.number().optional()
            });
            await schema.validateAsync(request.body);
            return {
                ParentTemplateId: request.body.ParentTemplateId,
                ParentSectionId : request.body.ParentSectionId,
                Title           : request.body.Title,
                Description     : request.body.Description,
                DisplayCode     : request.body.DisplayCode ?? generateDisplayCode(25,'QUESTION_#'),
                ResponseType    : request.body.ResponseType,
                Score           : request.body.Score,
                CorrectAnswer   : request.body.CorrectAnswer,
                Hint            : request.body.Hint,
                Options         : request.body.Options,
                // FileResourceId  : request.body.FileResourceId,
                QuestionImageUrl: request.body.QuestionImageUrl,
                RangeMin        : request.body.RangeMin,
                RangeMax        : request.body.RangeMax
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<QuestionUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                Title           : joi.string().optional(),
                Description     : joi.string().optional(),
                DisplayCode     : joi.string().optional(),
                ResponseType    : joi.string().optional(),
                Score           : joi.number().optional(),
                CorrectAnswer   : joi.string().optional(),
                Hint            : joi.string().optional(),
                Option          : joi.string().optional(),
                // FileResourceId  : joi.string().uuid().optional(),
                QuestionImageUrl: joi.string().optional(),
                RangeMin        : joi.number().optional(),
                RangeMax        : joi.number().optional()
            });
            await schema.validateAsync(request.body);
            return {
                Title           : request.body.Title ?? null,
                Description     : request.body.Description ?? null,
                DisplayCode     : request.body.DisplayCode ?? null,
                ResponseType    : request.body.ResponseType ?? null,
                Score           : request.body.Score ?? null,
                CorrectAnswer   : request.body.CorrectAnswer ?? null,
                Hint            : request.body.Hint ?? null,
                Options         : request.body.Options ?? null,
                // FileResourceId  : request.body.FileResourceId ?? null,
                QuestionImageUrl: request.body.QuestionImageUrl ?? null,
                RangeMin        : request.body.RangeMin ?? null,
                RangeMax        : request.body.RangeMax ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
