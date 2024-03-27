import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { FormSectionCreateModel, FormSectionUpdateModel } from '../../domain.types/forms.submission/form.section.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormSectionValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<FormSectionCreateModel> => {
        try {
            const schema = joi.object({
                ParentFormTemplateId: joi.string().uuid().required(),
                SectionIdentifier   : joi.string(),
                Title               : joi.string().required(),
                Description         : joi.string(),
                DisplayCode         : joi.string(),
                Sequence            : joi.string(),
                ParentSectionId     : joi.string().uuid(),
            });
            await schema.validateAsync(request.body);
            return {
                ParentFormTemplateId: request.body.ParentFormTemplateId,
                SectionIdentifier   : request.body.SectionIdentifier,
                Title               : request.body.Title,
                Description         : request.body.Description,
                DisplayCode         : request.body.DisplayCode,
                Sequence            : request.body.Sequence,
                ParentSectionId     : request.body.ParentSectionId
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<FormSectionUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                // TemplateId: joi.string().uuid().optional(),
                SectionIdentifier: joi.string().optional(),
                Title: joi.string().optional(),
                Description: joi.string().optional(),
                DisplayCode: joi.string().optional(),
                Sequence: joi.string().optional(),
                ParentSectionId: joi.string().uuid().optional()
            });
            await schema.validateAsync(request.body);
            return {
                SectionIdentifier: request.body.SectionIdentifier ?? null,
                Title: request.body.Title ?? null,
                Description: request.body.Description ?? null,
                DisplayCode: request.body.DisplayCode ?? null,
                Sequence: request.body.Sequence ?? null,
                ParentSectionId: request.body.ParentSectionId ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
