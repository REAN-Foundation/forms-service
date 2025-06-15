import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/handlers/error.handler';
import BaseValidator from '../base.validator';
import { UserCreateModel, UserSearchFilters, UserUpdateModel } from '../../domain.types/forms/user.domain.types';
import { ParsedQs } from 'qs';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<UserCreateModel> => {
        try {
            const schema = joi.object({
                FirstName: joi.string(),
                LastName: joi.string(),
                CountryCode: joi.number(),
                Phone: joi.string(),
                Email: joi.string().email(),
                Username: joi.string().required(),
                Password: joi.string().required()
            });
            await schema.validateAsync(request.body);
            return {
                FirstName: request.body.FirstName,
                LastName: request.body.LastName,
                CountryCode: request.body.CountryCode,
                Phone: request.body.Phone,
                Email: request.body.Email,
                Username: request.body.Username,
                Password: request.body.Password,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<UserUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                FirstName: joi.string().optional(),
                LastName: joi.string().optional(),
                CountryCode: joi.number().optional(),
                Phone: joi.string().optional(),
                Email: joi.string().email().optional(),
                Username: joi.string().optional(),
                Password: joi.string().optional()
            });
            await schema.validateAsync(request.body);
            return {
                FirstName: request.body.FirstName ?? null,
                LastName: request.body.LastName ?? null,
                CountryCode: request.body.CountryCode ?? null,
                Phone: request.body.Phone ?? null,
                Email: request.body.Email ?? null,
                Username: request.body.Username ?? null,
                Password: request.body.Password ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<UserSearchFilters> => {
        try {
            const schema = joi.object({
                firstName: joi.string().optional(),
                lastName: joi.string().optional(),
                countryCode: joi.number().optional(),
                phone: joi.string().optional(),
                email: joi.string().optional(),
                username: joi.string().optional(),
                password: joi.string().optional(),
            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: ParsedQs): UserSearchFilters => {
        var filters:any = {};

        var firstName = query.firstName ? query.firstName : null;
        if (firstName != null) {
            filters['firstName'] = firstName;
        }
        var lastName = query.lastName ? query.lastName : null;
        if (lastName != null) {
            filters['lastName'] = lastName;
        }
        var countryCode = query.countryCode ? query.countryCode : null;
        if (countryCode != null) {
            filters['countryCode'] = countryCode;
        }
        var phone = query.phone ? query.phone : null;
        if (phone != null) {
            filters['phone'] = phone;
        }

        var email = query.email ? query.email : null;
        if (email != null) {
            filters['mail'] = email;
        }
        var username = query.username ? query.username : null;
        if (username != null) {
            filters['username'] = username;
        }
        var password = query.password ? query.password : null;
        if (password != null) {
            filters['password'] = password;
        }

        var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : 25;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = itemsPerPage;
        }
        var orderBy = query.orderBy ? query.orderBy : 'CreatedAt';
        if (orderBy != null) {
            filters['OrderBy'] = orderBy;
        }
        var order = query.order ? query.order : 'ASC';
        if (order != null) {
            filters['Order'] = order;
        }
        return filters;
    };
}
