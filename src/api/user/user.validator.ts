import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import {
    UserCreateModel,
    UserSearchFilters,
    UserUpdateModel,
} from '../../domain.types/user.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserValidator extends BaseValidator {
    public validateCreateRequest = async (
        request: express.Request
    ): Promise<UserCreateModel> => {
        try {
            const schema = joi.object({
                FirstName: joi.string(),
                LastName: joi.string(),
                CountryCode: joi.number(),
                Phone: joi.string(),
                Email: joi.string().email(),
                Username: joi.string().required(),
                Password: joi.string().required(),
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

    public validateUpdateRequest = async (
        request: express.Request
    ): Promise<UserUpdateModel> => {
        try {
            const schema = joi.object({
                FirstName: joi.string().optional(),
                LastName: joi.string().optional(),
                CountryCode: joi.number().optional(),
                Phone: joi.string().optional(),
                Email: joi.string().email().optional(),
                Username: joi.string().optional(),
                Password: joi.string().optional(),
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

    public validateSearchRequest = async (
        request: express.Request
    ): Promise<UserSearchFilters> => {
        try {
            const schema = joi.object({
                firstName: joi.string().optional(),
                lastName: joi.string().optional(),
                countryCode: joi.number().optional(),
                phone: joi.string().optional(),
                email: joi.string().optional(),
                username: joi.string().optional(),
                password: joi.string().optional(),
                itemsPerPage: joi.number().optional(),
                orderBy: joi.string().optional(),
                order: joi.string().optional(),
            });
            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            const baseFilters = await this.validateBaseSearchFilters(request);
            return {
                ...baseFilters,
                ...filters
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: any): UserSearchFilters => {
        const filters: any = {};
        const firstName = query.firstName ? query.firstName : null;
        if (firstName != null) {
            filters['firstName'] = firstName;
        }
        const lastName = query.lastName ? query.lastName : null;
        if (lastName != null) {
            filters['lastName'] = lastName;
        }
        const countryCode = query.countryCode ? query.countryCode : null;
        if (countryCode != null) {
            filters['countryCode'] = countryCode;
        }
        const phone = query.phone ? query.phone : null;
        if (phone != null) {
            filters['phone'] = phone;
        }
        const email = query.email ? query.email : null;
        if (email != null) {
            filters['email'] = email;
        }
        const username = query.username ? query.username : null;
        if (username != null) {
            filters['username'] = username;
        }
        const password = query.password ? query.password : null;
        if (password != null) {
            filters['password'] = password;
        }
        const itemsPerPage = query.itemsPerPage ? query.itemsPerPage : 25;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = Number(itemsPerPage);
        }
        const orderBy = query.orderBy ? query.orderBy : 'CreatedAt';
        if (orderBy != null) {
            filters['OrderBy'] = orderBy;
        }
        const order = query.order ? query.order : 'ASC';
        if (order != null) {
            filters['Order'] = order;
        }
        return filters;
    };
}
