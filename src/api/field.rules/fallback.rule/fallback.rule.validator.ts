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
                Name: joi.string().max(100).optional(),
                Description: joi.string().max(500).optional(),
                OperationType: joi.string().valid(...Object.values(OperationType)).required(),
                OperationId: joi.string().uuid().required(),
                Action: joi.string().valid(...Object.values(FallbackActionType)).required(),
                ActionValue: joi.string().max(1000).optional(),
                ActionMessage: joi.string().max(500).optional(),
                ActionParameters: actionParametersSchema,
                ExecutionOrder: joi.number().integer().min(0).default(0).optional(),
                StopOnSuccess: joi.boolean().default(true).optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                OperationType: request.body.OperationType,
                OperationId: request.body.OperationId,
                Action: request.body.Action,
                ActionValue: request.body.ActionValue,
                ActionMessage: request.body.ActionMessage,
                ActionParameters: request.body.ActionParameters,
                ExecutionOrder: request.body.ExecutionOrder,
                StopOnSuccess: request.body.StopOnSuccess,
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
                Name: joi.string().max(100).optional(),
                Description: joi.string().max(500).optional(),
                OperationType: joi.string().valid(...Object.values(OperationType)).optional(),
                OperationId: joi.string().uuid().optional(),
                Action: joi.string().valid(...Object.values(FallbackActionType)).optional(),
                ActionValue: joi.string().max(1000).optional(),
                ActionMessage: joi.string().max(500).optional(),
                ActionParameters: actionParametersSchema,
                ExecutionOrder: joi.number().integer().min(0).optional(),
                StopOnSuccess: joi.boolean().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                OperationType: request.body.OperationType,
                OperationId: request.body.OperationId,
                Action: request.body.Action,
                ActionValue: request.body.ActionValue,
                ActionMessage: request.body.ActionMessage,
                ActionParameters: request.body.ActionParameters,
                ExecutionOrder: request.body.ExecutionOrder,
                StopOnSuccess: request.body.StopOnSuccess,
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
                operationId: joi.string().uuid().optional(),
                action: joi.string().valid(...Object.values(FallbackActionType)).optional(),
                executionOrder: joi.number().integer().min(0).optional(),
                stopOnSuccess: joi.boolean().optional(),
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
        var operationId = query.operationId ? query.operationId : null;
        if (operationId != null) {
            filters['OperationId'] = operationId;
        }
        var action = query.action ? query.action : null;
        if (action != null) {
            filters['Action'] = action;
        }
        var executionOrder = query.executionOrder ? query.executionOrder : null;
        if (executionOrder != null) {
            filters['ExecutionOrder'] = executionOrder;
        }
        var stopOnSuccess = query.stopOnSuccess ? query.stopOnSuccess : null;
        if (stopOnSuccess != null) {
            filters['StopOnSuccess'] = stopOnSuccess;
        }
        var operationType = query.operationType ? query.operationType : null;
        if (operationType != null) {
            filters['OperationType'] = operationType;
        }
        return filters;
    };

    //#endregion
}
