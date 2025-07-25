import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    FunctionExpressionOperationCreateModel,
    FunctionExpressionOperationResponseDto,
    FunctionExpressionOperationUpdateModel,
    FunctionExpressionOperationSearchFilters,
} from '../../../domain.types/operations/function.expression.operation.domain.types';
import { OperationType } from '../../../domain.types/enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FunctionExpressionOperationValidator extends BaseValidator {
    //#region member variables and constructors

    public validateFunctionExpressionOperationCreateRequest = async (
        request: express.Request
    ): Promise<FunctionExpressionOperationCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi
                    .string()
                    .valid(OperationType.FunctionExpression)
                    .optional(),
                Expression: joi.string().required(),
                Variables: joi.string().required(),
            });
            await schema.validateAsync(request.body);

            // Validate Variables JSON structure
            const variablesValidation = this.validateVariables(request.body.Variables);
            if (variablesValidation.error) {
                throw new Error(`Invalid Variables structure: ${variablesValidation.error.message}`);
            }

            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.FunctionExpression,
                Expression: request.body.Expression,
                Variables: request.body.Variables,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateFunctionExpressionOperationUpdateRequest = async (
        request: express.Request
    ): Promise<FunctionExpressionOperationUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi
                    .string()
                    .valid(OperationType.FunctionExpression)
                    .optional(),
                Expression: joi.string().optional(),
                Variables: joi.string().optional(),
            });
            await schema.validateAsync(request.body);

            // Validate Variables JSON structure if provided
            if (request.body.Variables) {
                const variablesValidation = this.validateVariables(request.body.Variables);
                if (variablesValidation.error) {
                    throw new Error(`Invalid Variables structure: ${variablesValidation.error.message}`);
                }
            }

            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: request.body.Type,
                Expression: request.body.Expression,
                Variables: request.body.Variables,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateFunctionExpressionOperationSearchRequest = async (
        request: express.Request
    ): Promise<FunctionExpressionOperationSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                expression: joi.string().optional(),
                variables: joi.string().optional(),
                type: joi.string().valid(OperationType.FunctionExpression).optional(),
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

    private getSearchFilters = (query: any): FunctionExpressionOperationSearchFilters => {
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

        const expression = query.expression ? query.expression : null;
        if (expression != null) {
            filters['Expression'] = expression;
        }

        const variables = query.variables ? query.variables : null;
        if (variables != null) {
            filters['Variables'] = variables;
        }

        const type = query.type ? query.type : null;
        if (type != null) {
            filters['Type'] = type;
        }

        return filters;
    };
}
