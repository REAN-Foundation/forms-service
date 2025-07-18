import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    ValidationLogicCreateModel,
    ValidationLogicUpdateModel,
} from '../../../domain.types/logic/validation.logic.domain.types';
import { LogicType } from '../../../domain.types/logic.enums';
import { ValidationLogicSearchFilters } from '../../../domain.types/logic/validation.logic.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ValidationLogicValidator extends BaseValidator {
    //#region member variables and constructors

    public validateValidationLogicCreateRequest = async (
        request: express.Request
    ): Promise<ValidationLogicCreateModel> => {
        try {
            const schema = joi.object({
                Type: joi.string().valid(LogicType.Validation).required(),
                FieldId: joi.string().uuid().required(),
                Enabled: joi.boolean().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Type: request.body.Type,
                FieldId: request.body.FieldId,
                Enabled: request.body.Enabled ?? true,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateValidationLogicUpdateRequest = async (
        request: express.Request
    ): Promise<ValidationLogicUpdateModel> => {
        try {
            const schema = joi.object({
                Type: joi.string().valid(LogicType.Validation).optional(),
                FieldId: joi.string().uuid().optional(),
                Enabled: joi.boolean().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Type: request.body.Type,
                FieldId: request.body.FieldId,
                Enabled: request.body.Enabled,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateValidationLogicSearchRequest = async (
        request: express.Request
    ): Promise<ValidationLogicSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                type: joi.string().valid(LogicType.Validation).optional(),
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

    private getSearchFilters = (query: any): ValidationLogicSearchFilters => {
        var filters: any = {};

        const id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }

        const type = query.type ? query.type : null;
        if (type != null) {
            filters['type'] = type;
        }

        const fieldId = query.fieldId ? query.fieldId : null;
        if (fieldId != null) {
            filters['fieldId'] = fieldId;
        }

        const enabled = query.enabled ? query.enabled : null;
        if (enabled != null) {
            filters['enabled'] = enabled;
        }

        return filters;
    };

    //#endregion
}
