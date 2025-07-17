import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/res.handlers/error.handler';
import BaseValidator from '../../base.validator';
import {
    FunctionExpressionOperationCreateModel,
    FunctionExpressionOperationUpdateModel,
    OperationSearchFilters,
} from '../../../domain.types/forms/operation.domain.types';
import { OperationType } from '../../../domain.types/forms/operation.enums';

export class FunctionExpressionOperationValidator extends BaseValidator {
    // Function Expression Operation validation
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
    ): Promise<OperationSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                PageIndex: joi.number().integer().min(0).optional(),
                ItemsPerPage: joi.number().integer().min(1).max(100).optional(),
                OrderBy: joi.string().optional(),
                Order: joi.string().valid('ASC', 'DESC').optional(),
            });
            await schema.validateAsync(request.query);
            return {
                id: request.query.id as string,
                name: request.query.name as string,
                description: request.query.description as string,
                PageIndex: request.query.PageIndex
                    ? parseInt(request.query.PageIndex as string)
                    : 0,
                ItemsPerPage: request.query.ItemsPerPage
                    ? parseInt(request.query.ItemsPerPage as string)
                    : 10,
                OrderBy: request.query.OrderBy as string,
                Order: request.query.Order as 'ASC' | 'DESC',
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
