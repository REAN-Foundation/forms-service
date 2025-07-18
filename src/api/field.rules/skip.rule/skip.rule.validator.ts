import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    SkipRuleCreateModel,
    SkipRuleUpdateModel,
    SkipRuleSearchFilters,
} from '../../../domain.types/rules/skip.rule.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class SkipRuleValidator extends BaseValidator {
    //#region member variables and constructors

    //#endregion

    // Skip Rule validation
    public validateSkipRuleCreateRequest = async (
        request: express.Request
    ): Promise<SkipRuleCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Priority: joi.number().integer().min(0).optional(),
                IsActive: joi.boolean().optional(),
                OperationId: joi.string().uuid().required(),
                SkipWhenTrue: joi.boolean().required(),
                LogicId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Priority: request.body.Priority ?? 0,
                IsActive: request.body.IsActive ?? true,
                OperationId: request.body.OperationId,
                SkipWhenTrue: request.body.SkipWhenTrue,
                LogicId: request.body.LogicId,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSkipRuleUpdateRequest = async (
        request: express.Request
    ): Promise<SkipRuleUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Priority: joi.number().integer().min(0).optional(),
                IsActive: joi.boolean().optional(),
                OperationId: joi.string().uuid().optional(),
                SkipWhenTrue: joi.boolean().optional(),
                LogicId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Priority: request.body.Priority,
                IsActive: request.body.IsActive,
                OperationId: request.body.OperationId,
                SkipWhenTrue: request.body.SkipWhenTrue,
                LogicId: request.body.LogicId,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateRuleSearchRequest = async (
        request: express.Request
    ): Promise<SkipRuleSearchFilters> => {
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

    private getSearchFilters = (query: any): SkipRuleSearchFilters => {
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
