import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    CompositionOperationCreateModel,
    CompositionOperationUpdateModel,
    CompositionOperationSearchFilters,
} from '../../../domain.types/operations/composition.operation.domain.types';
import {
    CompositionOperatorType,
    OperationType,
} from '../../../domain.types/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CompositionOperationValidator extends BaseValidator {
    //#region member variables and constructors

    public validateCompositionOperationCreateRequest = async (
        request: express.Request
    ): Promise<CompositionOperationCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi.string().valid(OperationType.Composition).optional(),
                Operator: joi
                    .string()
                    .valid(...Object.values(CompositionOperatorType))
                    .required(),
                Operands: joi.string().required(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.Composition, // Always set to Composition for this operation type
                Operator: request.body.Operator,
                Operands: request.body.Operands,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateCompositionOperationUpdateRequest = async (
        request: express.Request
    ): Promise<CompositionOperationUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi.string().valid(OperationType.Composition).optional(),
                Operator: joi
                    .string()
                    .valid(...Object.values(CompositionOperatorType))
                    .optional(),
                Operands: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.Composition, // Always set to Composition for this operation type
                Operator: request.body.Operator,
                Operands: request.body.Operands,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateOperationSearchRequest = async (
        request: express.Request
    ): Promise<CompositionOperationSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                operator: joi
                    .string()
                    .valid(...Object.values(CompositionOperatorType))
                    .optional(),
                type: joi.string().valid(OperationType.Composition).optional(),
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

    private getSearchFilters = (query: any): CompositionOperationSearchFilters => {
        var filters: any = {};

        const id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }

        const name = query.name ? query.name : null;
        if (name != null) {
            filters['name'] = name;
        }

        const description = query.description ? query.description : null;
        if (description != null) {
            filters['description'] = description;
        }

        const operator = query.operator ? query.operator : null;
        if (operator != null) {
            filters['operator'] = operator;
        }

        const type = query.type ? query.type : null;
        if (type != null) {
            filters['type'] = type;
        }

        return filters;
    };

    //#endregion
}
