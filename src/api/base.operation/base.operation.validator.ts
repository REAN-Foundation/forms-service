import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import {
    BaseOperationCreateModel,
    BaseOperationUpdateModel,
    BaseOperationSearchFilters,
} from '../../domain.types/operations/base.operation.domain.types';
import { OperationType } from '../../domain.types/enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class BaseOperationValidator extends BaseValidator {
    //#region member variables and constructors

    public validateBaseOperationCreateRequest = async (
        request: express.Request
    ): Promise<BaseOperationCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi
                    .string()
                    .valid(...Object.values(OperationType))
                    .required(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: request.body.Type,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateBaseOperationUpdateRequest = async (
        request: express.Request
    ): Promise<BaseOperationUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi
                    .string()
                    .valid(...Object.values(OperationType))
                    .optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: request.body.Type,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateBaseOperationSearchRequest = async (
        request: express.Request
    ): Promise<BaseOperationSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                type: joi
                    .string()
                    .valid(...Object.values(OperationType))
                    .optional(),
            });
            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            const baseFilters = await this.validateBaseSearchFilters(request);
            return {
                ...baseFilters,
                ...filters,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: any): BaseOperationSearchFilters => {
        var filters: any = {};

        const id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }

        const name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }

        const description = query.description ? query.description : null;
        if (description != null) {
            filters['Description'] = description;
        }

        const type = query.type ? query.type : null;
        if (type != null) {
            filters['Type'] = type;
        }

        return filters;
    };
} 