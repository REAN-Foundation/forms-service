import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    CalculationRuleCreateModel,
    CalculationRuleUpdateModel,
    CalculationRuleSearchFilters,
} from '../../../domain.types/rules/calculation.rule.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CalculationRuleValidator extends BaseValidator {
    //#region member variables and constructors

    //#region member variables and constructors

    //#endregion

    // Calculation Rule validation
    public validateCalculationRuleCreateRequest = async (
        request: express.Request
    ): Promise<CalculationRuleCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Priority: joi.number().integer().min(0).optional(),
                IsActive: joi.boolean().optional(),
                ConditionForOperationId: joi.string().uuid().optional(),
                OperationId: joi.string().uuid().required(),
                LogicId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Priority: request.body.Priority ?? 0,
                IsActive: request.body.IsActive ?? true,
                ConditionForOperationId: request.body.ConditionForOperationId,
                OperationId: request.body.OperationId,
                LogicId: request.body.LogicId,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateCalculationRuleUpdateRequest = async (
        request: express.Request
    ): Promise<CalculationRuleUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Priority: joi.number().integer().min(0).optional(),
                IsActive: joi.boolean().optional(),
                ConditionForOperationId: joi.string().uuid().optional(),
                OperationId: joi.string().uuid().optional(),
                LogicId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Priority: request.body.Priority,
                IsActive: request.body.IsActive,
                ConditionForOperationId: request.body.ConditionForOperationId,
                OperationId: request.body.OperationId,
                LogicId: request.body.LogicId,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateRuleSearchRequest = async (
        request: express.Request
    ): Promise<CalculationRuleSearchFilters> => {
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
                ...filters
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: any): CalculationRuleSearchFilters => {
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
