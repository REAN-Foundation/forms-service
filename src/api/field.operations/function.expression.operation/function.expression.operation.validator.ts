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
import { OperationType } from '../../../domain.types/operation.enums';
import { QueryResponseType } from '../../../domain.types/query.response.types';

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
                ResultDataType: joi.string().required(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.FunctionExpression, // Always set to FunctionExpression for this operation type
                Expression: request.body.Expression,
                Variables: request.body.Variables,
                ResultDataType: request.body.ResultDataType,
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
                ResultDataType: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.FunctionExpression, // Always set to FunctionExpression for this operation type
                Expression: request.body.Expression,
                Variables: request.body.Variables,
                ResultDataType: request.body.ResultDataType,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateOperationSearchRequest = async (
        request: express.Request
    ): Promise<FunctionExpressionOperationResponseDto> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                expression: joi.string().optional(),
                variables: joi.string().optional(),
                resultDataType: joi.string().valid(QueryResponseType).optional(),
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
            filters['name'] = name;
        }

        const description = query.description ? query.description : null;
        if (description != null) {
            filters['description'] = description;
        }

        const operator = query.operator ? query.operator : null;
        if (operator != null) {
            filters['operator'] = operator;
        }

        const expression = query.expression ? query.expression : null;
        if (expression != null) {
            filters['expression'] = expression;
        }

        const variables = query.variables ? query.variables : null;
        if (variables != null) {
            filters['variables'] = variables;
        }

        const resultDataType = query.resultDataType ? query.resultDataType : null;
        if (resultDataType != null) {
            filters['resultDataType'] = resultDataType;
        }

        const type = query.type ? query.type : null;
        if (type != null) {
            filters['type'] = type;
        }

        return filters;
    };
}
