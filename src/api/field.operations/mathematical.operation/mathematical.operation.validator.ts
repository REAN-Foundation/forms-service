import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/res.handlers/error.handler';
import BaseValidator from '../../base.validator';
import {
    MathematicalOperationCreateModel,
    MathematicalOperationUpdateModel,
    OperationSearchFilters,
} from '../../../domain.types/forms/operation.domain.types';
import {
    MathematicalOperatorType,
    OperationType,
} from '../../../domain.types/forms/operation.enums';

export class MathematicalOperationValidator extends BaseValidator {
    // Mathematical Operation validation
    public validateMathematicalOperationCreateRequest = async (
        request: express.Request
    ): Promise<MathematicalOperationCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Operator: joi
                    .string()
                    .valid(...Object.values(MathematicalOperatorType))
                    .required(),
                Operands: joi.string().required(),
                ResultDataType: joi.string().required(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.Mathematical, // Always set to Mathematical for this operation type
                Operator: request.body.Operator,
                Operands: request.body.Operands,
                ResultDataType: request.body.ResultDataType,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateMathematicalOperationUpdateRequest = async (
        request: express.Request
    ): Promise<MathematicalOperationUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Operator: joi
                    .string()
                    .valid(...Object.values(MathematicalOperatorType))
                    .optional(),
                Operands: joi.string().optional(),
                ResultDataType: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Operator: request.body.Operator,
                Operands: request.body.Operands,
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
                operator: joi
                    .string()
                    .valid(...Object.values(MathematicalOperatorType))
                    .optional(),
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
                operator: request.query.operator as MathematicalOperatorType,
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
