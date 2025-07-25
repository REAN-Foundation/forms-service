import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    MathematicalOperationCreateModel,
    MathematicalOperationResponseDto,
    MathematicalOperationUpdateModel,
    MathematicalOperationSearchFilters,
} from '../../../domain.types/operations/mathematical.operation.domain.types';
import {
    MathematicalOperatorType,
    OperationType,
} from '../../../domain.types/enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class MathematicalOperationValidator extends BaseValidator {
    //#region member variables and constructors

    public validateMathematicalOperationCreateRequest = async (
        request: express.Request
    ): Promise<MathematicalOperationCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi.string().valid(OperationType.Mathematical).optional(),
                Operator: joi
                    .string()
                    .valid(...Object.values(MathematicalOperatorType))
                    .required(),
                Operands: joi.string().required(),
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
                Type: OperationType.Mathematical,
                Operator: request.body.Operator,
                Operands: request.body.Operands,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateMathematicalOperationUpdateRequest = async (
        request: express.Request
    ): Promise<MathematicalOperationUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi.string().valid(OperationType.Mathematical).optional(),
                Operator: joi
                    .string()
                    .valid(...Object.values(MathematicalOperatorType))
                    .optional(),
                Operands: joi.string().optional(),
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
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateMathematicalOperationSearchRequest = async (
        request: express.Request
    ): Promise<MathematicalOperationSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                operator: joi
                    .string()
                    .valid(...Object.values(MathematicalOperatorType))
                    .optional(),
                operands: joi.string().optional(),
                type: joi.string().valid(OperationType.Mathematical).optional(),
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

    private getSearchFilters = (query: any): MathematicalOperationSearchFilters => {
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

        const type = query.type ? query.type : null;
        if (type != null) {
            filters['Type'] = type;
        }

        return filters;
    };
}
