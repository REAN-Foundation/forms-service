import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    LogicalOperationCreateModel,
    LogicalOperationResponseDto,
    LogicalOperationUpdateModel,
    LogicalOperationSearchFilters,
} from '../../../domain.types/operations/logical.operation.domain.types';
import {
    LogicalOperatorType,
    OperationType,
} from '../../../domain.types/enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class LogicalOperationValidator extends BaseValidator {
    //#region member variables and constructors

    public validateLogicalOperationCreateRequest = async (
        request: express.Request
    ): Promise<LogicalOperationCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi.string().valid(OperationType.Logical).optional(),
                Operator: joi
                    .string()
                    .valid(...Object.values(LogicalOperatorType))
                    .required(),
                Operands: joi.string().required(),
                ValueDefinition: joi.string().optional(),
            });
            await schema.validateAsync(request.body);

            // Validate Operands JSON structure
            const operandsValidation = this.validateSerializedOperands(request.body.Operands);
            if (operandsValidation.error) {
                throw new Error(`Invalid Operands structure: ${operandsValidation.error.message}`);
            }

            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.Logical,
                Operator: request.body.Operator,
                Operands: request.body.Operands,
                ValueDefinition: request.body.ValueDefinition,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateLogicalOperationUpdateRequest = async (
        request: express.Request
    ): Promise<LogicalOperationUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi.string().valid(OperationType.Logical).optional(),
                Operator: joi
                    .string()
                    .valid(...Object.values(LogicalOperatorType))
                    .optional(),
                Operands: joi.string().optional(),
                ValueDefinition: joi.string().optional(),
            });
            await schema.validateAsync(request.body);

            // Validate Operands JSON structure if provided
            if (request.body.Operands) {
                const operandsValidation = this.validateSerializedOperands(request.body.Operands);
                if (operandsValidation.error) {
                    throw new Error(`Invalid Operands structure: ${operandsValidation.error.message}`);
                }
            }

            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: request.body.Type,
                Operator: request.body.Operator,
                Operands: request.body.Operands,
                ValueDefinition: request.body.ValueDefinition,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateLogicalOperationSearchRequest = async (
        request: express.Request
    ): Promise<LogicalOperationSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                operator: joi
                    .string()
                    .valid(...Object.values(LogicalOperatorType))
                    .optional(),
                operands: joi.string().optional(),
                valueDefinition: joi.string().optional(),
                type: joi.string().valid(OperationType.Logical).optional(),
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

    private getSearchFilters = (query: any): LogicalOperationSearchFilters => {
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

        const operands = query.operands ? query.operands : null;
        if (operands != null) {
            filters['Operands'] = operands;
        }

        const valueDefinition = query.valueDefinition ? query.valueDefinition : null;
        if (valueDefinition != null) {
            filters['ValueDefinition'] = valueDefinition;
        }

        const type = query.type ? query.type : null;
        if (type != null) {
            filters['Type'] = type;
        }

        return filters;
    };
}
