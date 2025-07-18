import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    ValidationRuleCreateModel,
    ValidationRuleUpdateModel,
    ValidationRuleSearchFilters,
} from '../../../domain.types/rules/validation.rule.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ValidationRuleValidator extends BaseValidator {
    //#region member variables and constructors

    //#endregion

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
    ): Promise<ValidationRuleSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                priority: joi.number().integer().min(0).optional(),
                isActive: joi.boolean().optional(),
                operationId: joi.string().uuid().optional(),
                logicId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.query);
            const baseFilters = await this.validateBaseSearchFilters(request);
            const filters = this.getSearchFilters(request.query);
            return {
                ...baseFilters,
                ...filters,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: any): ValidationRuleSearchFilters => {
        var filters: any = {};

        var id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }
        var name = query.name ? query.name : null;
        if (name != null) {
            filters['name'] = name;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['description'] = description;
        }
        var priority = query.priority ? query.priority : null;
        if (priority != null) {
            filters['priority'] = priority;
        }
        var isActive = query.isActive ? query.isActive : null;
        if (isActive != null) {
            filters['isActive'] = isActive;
        }
        var operationId = query.operationId ? query.operationId : null;
        if (operationId != null) {
            filters['operationId'] = operationId;
        }
        var logicId = query.logicId ? query.logicId : null;
        if (logicId != null) {
            filters['logicId'] = logicId;
        }
        return filters;
    };

    //#endregion
}
