import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/res.handlers/error.handler';
import BaseValidator from '../../base.validator';
import {
    SkipLogicCreateModel,
    SkipLogicUpdateModel,
    LogicSearchFilters,
} from '../../../domain.types/forms/logic.domain.types';
import { LogicType } from '../../../domain.types/forms/logic.enums';

export class SkipLogicValidator extends BaseValidator {
    // Skip Logic validation
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

    public validateLogicSearchRequest = async (
        request: express.Request
    ): Promise<LogicSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                type: joi.string().valid(LogicType.Skip).optional(),
                fieldId: joi.string().uuid().optional(),
                enabled: joi.boolean().optional(),
                defaultSkip: joi.boolean().optional(),
                PageIndex: joi.number().integer().min(0).optional(),
                ItemsPerPage: joi.number().integer().min(1).max(100).optional(),
                OrderBy: joi.string().optional(),
                Order: joi.string().valid('ASC', 'DESC').optional(),
            });
            await schema.validateAsync(request.query);
            return {
                id: request.query.id as string,
                type: request.query.type as LogicType,
                fieldId: request.query.fieldId as string,
                enabled:
                    request.query.enabled === 'true'
                        ? true
                        : request.query.enabled === 'false'
                          ? false
                          : undefined,
                defaultSkip:
                    request.query.defaultSkip === 'true'
                        ? true
                        : request.query.defaultSkip === 'false'
                          ? false
                          : undefined,
                PageIndex: request.query.PageIndex
                    ? parseInt(request.query.PageIndex as string)
                    : 0,
                ItemsPerPage: request.query.ItemsPerPage
                    ? parseInt(request.query.ItemsPerPage as string)
                    : 10,
                OrderBy: request.query.OrderBy as string,
                Order: request.query.Order as 'ASC' | 'DESC',
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
