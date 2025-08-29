import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    CalculationRuleCreateModel,
    CalculationRuleUpdateModel,
    CalculationRuleSearchFilters,
} from '../../../domain.types/rules/calculation.rule.domain.types';
import { OperationType } from '../../../domain.types/enums/operation.enums';

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
            const settingsSchema = joi.object({
                DecimalPlaces: joi.number().integer().optional(),
                RoundingMethod: joi.string().optional(),
                AutoUpdate: joi.boolean().optional(),
                ShowFormula: joi.boolean().optional(),
                AllowManualOverride: joi.boolean().optional(),
                NumberFormat: joi.string().optional(),
            }).optional();

            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                OperationType: joi.string().valid(...Object.values(OperationType)).required(),
                BaseOperationId: joi.string().uuid().required(),
                OperationId: joi.string().uuid().optional(),
                LogicId: joi.string().uuid().optional(),
                Settings: settingsSchema,
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                OperationType: request.body.OperationType,
                BaseOperationId: request.body.BaseOperationId,
                OperationId: request.body.OperationId,
                LogicId: request.body.LogicId,
                Settings: request.body.Settings,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateCalculationRuleUpdateRequest = async (
        request: express.Request
    ): Promise<CalculationRuleUpdateModel> => {
        try {
            const settingsSchema = joi.object({
                DecimalPlaces: joi.number().integer().optional(),
                RoundingMethod: joi.string().optional(),
                AutoUpdate: joi.boolean().optional(),
                ShowFormula: joi.boolean().optional(),
                AllowManualOverride: joi.boolean().optional(),
                NumberFormat: joi.string().optional(),
            }).optional();

            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                OperationType: joi.string().valid(...Object.values(OperationType)).optional(),
                BaseOperationId: joi.string().uuid().optional(),
                OperationId: joi.string().uuid().optional(),
                LogicId: joi.string().uuid().optional(),
                Settings: settingsSchema,
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                OperationType: request.body.OperationType,
                BaseOperationId: request.body.BaseOperationId,
                OperationId: request.body.OperationId,
                LogicId: request.body.LogicId,
                Settings: request.body.Settings,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateRuleSearchRequest = async (
        request: express.Request
    ): Promise<CalculationRuleSearchFilters> => {
        try {
            const settingsSchema = joi.object({
                DecimalPlaces: joi.number().integer().optional(),
                RoundingMethod: joi.string().optional(),
                AutoUpdate: joi.boolean().optional(),
                ShowFormula: joi.boolean().optional(),
                AllowManualOverride: joi.boolean().optional(),
                NumberFormat: joi.string().optional(),
            }).optional();

            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                operationType: joi.string().valid(...Object.values(OperationType)).optional(),
                baseOperationId: joi.string().uuid().optional(),
                operationId: joi.string().uuid().optional(),
                logicId: joi.string().uuid().optional(),
                settings: settingsSchema,
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
        var baseOperationId = query.baseOperationId ? query.baseOperationId : null;
        if (baseOperationId != null) {
            filters['BaseOperationId'] = baseOperationId;
        }
        var operationId = query.operationId ? query.operationId : null;
        if (operationId != null) {
            filters['OperationId'] = operationId;
        }
        var logicId = query.logicId ? query.logicId : null;
        if (logicId != null) {
            filters['LogicId'] = logicId;
        }
        var settings = query.settings ? query.settings : null;
        if (settings != null) {
            filters['Settings'] = settings;
        }
        return filters;
    };

    //#endregion
}
