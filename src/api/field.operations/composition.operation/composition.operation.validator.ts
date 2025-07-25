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
} from '../../../domain.types/enums/operation.enums';

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
                Children: joi.string().required(), // JSON string of operation IDs
            });
            await schema.validateAsync(request.body);

            // Validate Children JSON structure
            const childrenValidation = this.validateChildrenArray(request.body.Children);
            if (childrenValidation.error) {
                throw new Error(`Invalid Children structure: ${childrenValidation.error.message}`);
            }

            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.Composition,
                Operator: request.body.Operator,
                Children: request.body.Children,
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
                Children: joi.string().optional(), // JSON string of operation IDs
            });
            await schema.validateAsync(request.body);

            // Validate Children JSON structure if provided
            if (request.body.Children) {
                const childrenValidation = this.validateChildrenArray(request.body.Children);
                if (childrenValidation.error) {
                    throw new Error(`Invalid Children structure: ${childrenValidation.error.message}`);
                }
            }

            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: request.body.Type,
                Operator: request.body.Operator,
                Children: request.body.Children,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateCompositionOperationSearchRequest = async (
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
                children: joi.string().optional(),
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

    // Helper method to validate children array (operation IDs)
    private validateChildrenArray = (childrenString: string): { error?: Error; value?: any } => {
        try {
            const children = JSON.parse(childrenString);
            const childrenArraySchema = joi.array().items(joi.string().uuid());
            const result = childrenArraySchema.validate(children);
            return { error: result.error, value: result.value };
        } catch (error) {
            return { error: new Error('Invalid JSON format for children') };
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
            filters['Name'] = name;
        }

        const description = query.description ? query.description : null;
        if (description != null) {
            filters['Description'] = description;
        }

        const operator = query.operator ? query.operator : null;
        if (operator != null) {
            filters['Operator'] = operator;
        }

        const children = query.children ? query.children : null;
        if (children != null) {
            filters['Children'] = children;
        }

        const type = query.type ? query.type : null;
        if (type != null) {
            filters['Type'] = type;
        }

        return filters;
    };
}
