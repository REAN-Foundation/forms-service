import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    CalculationLogicCreateModel,
    CalculationLogicUpdateModel,
} from '../../../domain.types/logic/calculation.logic.domain.types';
import { LogicType } from '../../../domain.types/logic.enums';
import { CalculationLogicSearchFilters } from '../../../domain.types/logic/calculation.logic.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CalculationLogicValidator extends BaseValidator {
    //#region member variables and constructors

    public validateCalculationLogicCreateRequest = async (
        request: express.Request
    ): Promise<CalculationLogicCreateModel> => {
        try {
            const schema = joi.object({
                Type: joi.string().valid(LogicType.Calculation).required(),
                FieldId: joi.string().uuid().required(),
                Enabled: joi.boolean().optional(),
                FallbackValue: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Type: request.body.Type,
                FieldId: request.body.FieldId,
                Enabled: request.body.Enabled ?? true,
                FallbackValue: request.body.FallbackValue,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateCalculationLogicUpdateRequest = async (
        request: express.Request
    ): Promise<CalculationLogicUpdateModel> => {
        try {
            const schema = joi.object({
                Type: joi.string().valid(LogicType.Calculation).optional(),
                FieldId: joi.string().uuid().optional(),
                Enabled: joi.boolean().optional(),
                FallbackValue: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Type: request.body.Type,
                FieldId: request.body.FieldId,
                Enabled: request.body.Enabled,
                FallbackValue: request.body.FallbackValue,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateCalculationLogicSearchRequest = async (
        request: express.Request
    ): Promise<CalculationLogicSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                type: joi.string().valid(LogicType.Calculation).optional(),
                fieldId: joi.string().uuid().optional(),
                enabled: joi.boolean().optional(),
            });
            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            const baseFilters = await this.validateBaseSearchFilters(request);
            return {
                ...baseFilters,
                ...filters,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: any): CalculationLogicSearchFilters => {
        var filters: any = {};

        const type = query.type ? query.type : null;
        if (type != null) {
            filters['Type'] = type;
        }

        const fieldId = query.fieldId ? query.fieldId : null;
        if (fieldId != null) {
            filters['FieldId'] = fieldId;
        }

        const enabled = query.enabled ? query.enabled : null;
        if (enabled != null) {
            filters['Enabled'] = enabled;
        }

        return filters;
    };

    //#endregion
}
