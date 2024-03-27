import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { FormTemplateCreateModel, FormTemplateUpdateModel } from '../../domain.types/forms.submission/form.template.domain.types';
import { randomInt } from 'crypto';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormTemplateValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<FormTemplateCreateModel> => {
        try {
            const schema = joi.object({
                Title                  : joi.string().required(),
                Description            : joi.string().max(512).optional(),
                CurrentVersion         : joi.number(),
                Type                   : joi.string().required(),
                DisplayCode            : joi.string().max(64),
                OwnerUserId            : joi.string().uuid(),
                RootSectionId          : joi.string().uuid(),
                DefaultSectionNumbering: joi.boolean()
            });
            await schema.validateAsync(request.body);
            return {
                Title                  : request.body.Title,
                Description            : request.body.Description ?? null,
                CurrentVersion         : request.body.CurrentVersion ?? 1,
                Type                   : request.body.Type,
                DisplayCode            : request.body.DisplayCode ?? `FT-${randomInt(10000)}`,
                OwnerUserId            : request.body.OwnerUserId,
                RootSectionId          : request.body.RootSectionId,
                DefaultSectionNumbering: request.body.DefaultSectionNumbering ?? false,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<FormTemplateUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                Title                  : joi.string().optional(),
                Description            : joi.string().max(512).optional(),
                CurrentVersion         : joi.number().optional(),
                Type                   : joi.string().optional(),
                DisplayCode            : joi.string().max(64).optional(),
                OwnerUserId            : joi.string().uuid().optional(),
                RootSectionId          : joi.string().uuid().optional(),
                DefaultSectionNumbering: joi.boolean().optional()
            });
            await schema.validateAsync(request.body);
            return {
                Title                  : request.body.Title ?? null,
                Description            : request.body.Description ?? null,
                CurrentVersion         : request.body.CurrentVersion ?? null,
                Type                   : request.body.Type ?? null,
                DisplayCode            : request.body.DisplayCode ?? null,
                OwnerUserId            : request.body.OwnerUserId ?? null,
                RootSectionId          : request.body.RootSectionId ?? null,
                DefaultSectionNumbering: request.body.DefaultSectionNumbering ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}


