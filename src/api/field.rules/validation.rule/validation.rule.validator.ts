import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import BaseValidator from '../../base.validator';
import {
    ValidationRuleCreateModel,
    ValidationRuleUpdateModel,
    RuleSearchFilters,
} from '../../../domain.types/forms/rule.domain.types';

export class ValidationRuleValidator extends BaseValidator {
    // Validation Rule validation
    public validateValidationRuleCreateRequest = async (
        request: express.Request
    ): Promise<ValidationRuleCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Priority: joi.number().integer().min(0).optional(),
                IsActive: joi.boolean().optional(),
                OperationId: joi.string().uuid().required(),
                ErrorWhenFalse: joi.boolean().required(),
                ErrorMessage: joi.string().required(),
                LogicId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Priority: request.body.Priority ?? 0,
                IsActive: request.body.IsActive ?? true,
                OperationId: request.body.OperationId,
                ErrorWhenFalse: request.body.ErrorWhenFalse,
                ErrorMessage: request.body.ErrorMessage,
                LogicId: request.body.LogicId,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateValidationRuleUpdateRequest = async (
        request: express.Request
    ): Promise<ValidationRuleUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Priority: joi.number().integer().min(0).optional(),
                IsActive: joi.boolean().optional(),
                OperationId: joi.string().uuid().optional(),
                ErrorWhenFalse: joi.boolean().optional(),
                ErrorMessage: joi.string().optional(),
                LogicId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Priority: request.body.Priority,
                IsActive: request.body.IsActive,
                OperationId: request.body.OperationId,
                ErrorWhenFalse: request.body.ErrorWhenFalse,
                ErrorMessage: request.body.ErrorMessage,
                LogicId: request.body.LogicId,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateRuleSearchRequest = async (
        request: express.Request
    ): Promise<RuleSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                priority: joi.number().integer().min(0).optional(),
                isActive: joi.boolean().optional(),
                operationId: joi.string().uuid().optional(),
                logicId: joi.string().uuid().optional(),
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
                priority: request.query.priority
                    ? parseInt(request.query.priority as string)
                    : undefined,
                isActive:
                    request.query.isActive === 'true'
                        ? true
                        : request.query.isActive === 'false'
                          ? false
                          : undefined,
                operationId: request.query.operationId as string,
                logicId: request.query.logicId as string,
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
