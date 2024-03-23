import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { UserCreateModel, UserUpdateModel } from '../../domain.types/forms/user.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<UserCreateModel> => {
        try {
            const schema = joi.object({
                FirstName  : joi.string(),
                LastName   : joi.string(),
                CountryCode: joi.number(),
                Phone      : joi.string(),
                Email      : joi.string().email(),
                Username   : joi.string().required(),
                Password   : joi.string().required()
            });
            await schema.validateAsync(request.body);
            return {
                FirstName  : request.body.FirstName,
                LastName   : request.body.LastName,
                CountryCode: request.body.CountryCode,
                Phone      : request.body.Phone,
                Email      : request.body.Email,
                Username   : request.body.Username,
                Password   : request.body.Password,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<UserUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                FirstName  : joi.string().optional(),
                LastName   : joi.string().optional(),
                CountryCode: joi.number().optional(),
                Phone      : joi.string().optional(),
                Email      : joi.string().email().optional(),
                Username   : joi.string().optional(),
                Password   : joi.string().optional()
            });
            await schema.validateAsync(request.body);
            return {
                FirstName  : request.body.FirstName ?? null,
                LastName   : request.body.LastName ?? null,
                CountryCode: request.body.CountryCode ?? null,
                Phone      : request.body.Phone ?? null,
                Email      : request.body.Email ?? null,
                Username   : request.body.Username ?? null,
                Password   : request.body.Password ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
