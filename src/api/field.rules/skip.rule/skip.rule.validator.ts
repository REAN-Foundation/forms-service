import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    SkipRuleCreateModel,
    SkipRuleUpdateModel,
    SkipRuleSearchFilters,
} from '../../../domain.types/rules/skip.rule.domain.types';
import { OperationType } from '../../../domain.types/enums/operation.enums';

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
                OperationType: joi.string().valid(...Object.values(OperationType)).required(),
                BaseOperationId: joi.string().uuid().required(),
                OperationId: joi.string().uuid().required(),
                SkipWhenTrue: joi.boolean().required(),
                LogicId: joi.string().uuid().optional(),
                FallbackRuleId: joi.string().uuid().optional(),
                BaseFallbackRuleId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Priority: request.body.Priority,
                IsActive: request.body.IsActive,
                OperationType: request.body.OperationType,
                BaseOperationId: request.body.BaseOperationId,
                OperationId: request.body.OperationId,
                SkipWhenTrue: request.body.SkipWhenTrue,
                LogicId: request.body.LogicId,
                FallbackRuleId: request.body.FallbackRuleId,
                BaseFallbackRuleId: request.body.BaseFallbackRuleId,
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
                OperationType: joi.string().valid(...Object.values(OperationType)).optional(),
                BaseOperationId: joi.string().uuid().optional(),
                OperationId: joi.string().uuid().optional(),
                SkipWhenTrue: joi.boolean().optional(),
                LogicId: joi.string().uuid().optional(),
                FallbackRuleId: joi.string().uuid().optional(),
                BaseFallbackRuleId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Priority: request.body.Priority,
                IsActive: request.body.IsActive,
                OperationType: request.body.OperationType,
                BaseOperationId: request.body.BaseOperationId,
                OperationId: request.body.OperationId,
                SkipWhenTrue: request.body.SkipWhenTrue,
                LogicId: request.body.LogicId,
                FallbackRuleId: request.body.FallbackRuleId,
                BaseFallbackRuleId: request.body.BaseFallbackRuleId,
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
                operationType: joi.string().valid(...Object.values(OperationType)).optional(),
                operationId: joi.string().uuid().optional(),
                logicId: joi.string().uuid().optional(),
                baseFallbackRuleId: joi.string().uuid().optional(),
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
            filters['Name'] = name;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['Description'] = description;
        }
        var operationType = query.operationType ? query.operationType : null;
        if (operationType != null) {
            filters['OperationType'] = operationType;
        }
        var operationId = query.operationId ? query.operationId : null;
        if (operationId != null) {
            filters['OperationId'] = operationId;
        }
        var logicId = query.logicId ? query.logicId : null;
        if (logicId != null) {
            filters['LogicId'] = logicId;
        }
        var baseFallbackRuleId = query.baseFallbackRuleId ? query.baseFallbackRuleId : null;
        if (baseFallbackRuleId != null) {
            filters['BaseFallbackRuleId'] = baseFallbackRuleId;
        }
        return filters;
    };
    //#endregion
}
