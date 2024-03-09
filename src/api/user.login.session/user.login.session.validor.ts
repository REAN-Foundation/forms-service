import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { UserLoginSessionCreateModel, UserLoginSessionUpdateModel } from '../../domain.types/forms/user.login.session.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserLoginSessionValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<UserLoginSessionCreateModel> => {
        try {
            const schema = joi.object({
                UserId: joi.string().uuid().required(),
                IsActiveSession:joi.boolean(),
                ValidTill:joi.date()
            });
            await schema.validateAsync(request.body);
            return {
                UserId: request.body.UserId,
                IsActiveSession:request.body.IsActiveSession,
                ValidTill:request.body.ValidTill               
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<UserLoginSessionUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                UserId: joi.string().uuid().optional()
            });
            await schema.validateAsync(request.body);
            return {
                UserId: request.body.UserId ?? null,
                IsActiveSession:request.body.IsActiveSession ?? null,
                ValidTill:request.body.ValidTill ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
