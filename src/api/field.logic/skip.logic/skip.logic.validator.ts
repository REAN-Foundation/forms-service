import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    SkipLogicCreateModel,
    SkipLogicUpdateModel,
} from '../../../domain.types/logic/skip.logic.domain.types';
import { LogicType } from '../../../domain.types/logic.enums';
import { SkipLogicSearchFilters } from '../../../domain.types/logic/skip.logic.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class SkipLogicValidator extends BaseValidator {
    //#region member variables and constructors

    public validateSkipLogicCreateRequest = async (
        request: express.Request
    ): Promise<SkipLogicCreateModel> => {
        try {
            const schema = joi.object({
                Type: joi.string().valid(LogicType.Skip).required(),
                FieldId: joi.string().uuid().required(),
                Enabled: joi.boolean().optional(),
                DefaultSkip: joi.boolean().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Type: request.body.Type,
                FieldId: request.body.FieldId,
                Enabled: request.body.Enabled ?? true,
                DefaultSkip: request.body.DefaultSkip ?? false,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSkipLogicUpdateRequest = async (
        request: express.Request
    ): Promise<SkipLogicUpdateModel> => {
        try {
            const schema = joi.object({
                Type: joi.string().valid(LogicType.Skip).optional(),
                FieldId: joi.string().uuid().optional(),
                Enabled: joi.boolean().optional(),
                DefaultSkip: joi.boolean().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Type: request.body.Type,
                FieldId: request.body.FieldId,
                Enabled: request.body.Enabled,
                DefaultSkip: request.body.DefaultSkip,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSkipLogicSearchRequest = async (
        request: express.Request
    ): Promise<SkipLogicSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                type: joi.string().valid(LogicType.Skip).optional(),
                fieldId: joi.string().uuid().optional(),
                enabled: joi.boolean().optional(),
                defaultSkip: joi.boolean().optional(),
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

    private getSearchFilters = (query: any): SkipLogicSearchFilters => {
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

        const defaultSkip = query.defaultSkip ? query.defaultSkip : null;
        if (defaultSkip != null) {
            filters['defaultSkip'] = defaultSkip;
        }

        return filters;
    };

    //#endregion
}
