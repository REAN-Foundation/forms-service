import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    ValidationRuleCreateModel,
    ValidationRuleUpdateModel,
    ValidationRuleSearchFilters,
} from '../../../domain.types/rules/validation.rule.domain.types';
import { OperationType } from '../../../domain.types/enums/operation.enums';

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
                OperationType: joi.string().valid(...Object.values(OperationType)).required(),
                BaseOperationId: joi.string().uuid().required(),
                OperationId: joi.string().uuid().required(),
                ErrorWhenFalse: joi.boolean().required(),
                ErrorMessage: joi.string().required(),
                LogicId: joi.string().uuid().optional(),
                FallbackRuleId: joi.string().uuid().optional(),
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
                ErrorWhenFalse: request.body.ErrorWhenFalse,
                ErrorMessage: request.body.ErrorMessage,
                LogicId: request.body.LogicId,
                FallbackRuleId: request.body.FallbackRuleId,
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
                OperationType: joi.string().valid(...Object.values(OperationType)).optional(),
                BaseOperationId: joi.string().uuid().optional(),
                OperationId: joi.string().uuid().optional(),
                ErrorWhenFalse: joi.boolean().optional(),
                ErrorMessage: joi.string().optional(),
                LogicId: joi.string().uuid().optional(),
                FallbackRuleId: joi.string().uuid().optional(),
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
                ErrorWhenFalse: request.body.ErrorWhenFalse,
                ErrorMessage: request.body.ErrorMessage,
                LogicId: request.body.LogicId,
                FallbackRuleId: request.body.FallbackRuleId,
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
                operationType: joi.string().valid(...Object.values(OperationType)).optional(),
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
        return filters;
    };

    //#endregion
}
