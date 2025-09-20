import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    FallbackRuleCreateModel,
    FallbackRuleUpdateModel,
    FallbackRuleSearchFilters,
    FallbackActionType,
} from '../../../domain.types/rules/fallback.rule.domain.types';
import { OperationType } from '../../../domain.types/enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FallbackRuleValidator extends BaseValidator {
    //#region member variables and constructors

    //#endregion

    // Fallback Rule validation
    public validateFallbackRuleCreateRequest = async (
        request: express.Request
    ): Promise<FallbackRuleCreateModel> => {
        try {
            const actionParametersSchema = joi.object({
                timeout: joi.number().integer().min(0).optional(),
                maxRetries: joi.number().integer().min(0).optional(),
                redirectUrl: joi.string().uri().optional(),
                customHandler: joi.string().optional(),
                fieldValue: joi.any().optional(),
                fieldState: joi.string().optional(),
                messageType: joi.string().valid('info', 'warning', 'error', 'success').optional(),
                showDuration: joi.number().integer().min(0).optional(),
                validationRules: joi.array().optional(),
            }).optional();

            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                OperationType: joi.string().valid(...Object.values(OperationType)).required(),
                Priority: joi.number().integer().min(0).optional(),
                IsActive: joi.boolean().optional(),
                BaseOperationId: joi.string().uuid().required(),
                Action: joi.string().valid(...Object.values(FallbackActionType)).required(),
                ActionMessage: joi.string().optional(),
                ActionParameters: actionParametersSchema,
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                OperationType: request.body.OperationType,
                Priority: request.body.Priority,
                IsActive: request.body.IsActive,
                BaseOperationId: request.body.BaseOperationId,
                Action: request.body.Action,
                ActionMessage: request.body.ActionMessage,
                ActionParameters: request.body.ActionParameters,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateFallbackRuleUpdateRequest = async (
        request: express.Request
    ): Promise<FallbackRuleUpdateModel> => {
        try {
            const actionParametersSchema = joi.object({
                timeout: joi.number().integer().min(0).optional(),
                maxRetries: joi.number().integer().min(0).optional(),
                redirectUrl: joi.string().uri().optional(),
                customHandler: joi.string().optional(),
                fieldValue: joi.any().optional(),
                fieldState: joi.string().optional(),
                messageType: joi.string().valid('info', 'warning', 'error', 'success').optional(),
                showDuration: joi.number().integer().min(0).optional(),
                validationRules: joi.array().optional(),
            }).optional();

            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                OperationType: joi.string().valid(...Object.values(OperationType)).optional(),
                Priority: joi.number().integer().min(0).optional(),
                IsActive: joi.boolean().optional(),
                BaseOperationId: joi.string().uuid().optional(),
                Action: joi.string().valid(...Object.values(FallbackActionType)).optional(),
                ActionMessage: joi.string().optional(),
                ActionParameters: actionParametersSchema,
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                OperationType: request.body.OperationType,
                Priority: request.body.Priority,
                IsActive: request.body.IsActive,
                BaseOperationId: request.body.BaseOperationId,
                Action: request.body.Action,
                ActionMessage: request.body.ActionMessage,
                ActionParameters: request.body.ActionParameters,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateRuleSearchRequest = async (
        request: express.Request
    ): Promise<FallbackRuleSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                priority: joi.number().integer().min(0).optional(),
                isActive: joi.boolean().optional(),
                baseOperationId: joi.string().uuid().optional(),
                action: joi.string().valid(...Object.values(FallbackActionType)).optional(),
                operationType: joi.string().valid(...Object.values(OperationType)).optional(),
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

    private getSearchFilters = (query: any): FallbackRuleSearchFilters => {
        var filters: any = {};

        var id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }
        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['Description'] = description;
        }
        var priority = query.priority ? query.priority : null;
        if (priority != null) {
            filters['Priority'] = priority;
        }
        var isActive = query.isActive ? query.isActive : null;
        if (isActive != null) {
            filters['IsActive'] = isActive;
        }
        var baseOperationId = query.baseOperationId ? query.baseOperationId : null;
        if (baseOperationId != null) {
            filters['BaseOperationId'] = baseOperationId;
        }
        var action = query.action ? query.action : null;
        if (action != null) {
            filters['Action'] = action;
        }
        var operationType = query.operationType ? query.operationType : null;
        if (operationType != null) {
            filters['OperationType'] = operationType;
        }
        return filters;
    };

    //#endregion
}
