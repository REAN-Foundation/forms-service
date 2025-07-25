import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import BaseValidator from '../../base.validator';
import {
    IterateOperationCreateModel,
    IterateOperationResponseDto,
    IterateOperationUpdateModel,
    IterateOperationSearchFilters,
} from '../../../domain.types/operations/iterate.operation.domain.types';
import { OperationType } from '../../../domain.types/enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class IterateOperationValidator extends BaseValidator {
    //#region member variables and constructors

    public validateIterateOperationCreateRequest = async (
        request: express.Request
    ): Promise<IterateOperationCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Type: joi.string().valid(OperationType.Iterate).optional(),
                Description: joi.string().optional(),
                ItemAlias: joi.string().required(),
                OperationId: joi.string().uuid().required(),
                ArrayOperand: joi.string().optional(), // JSON serialized Operand
            });
            await schema.validateAsync(request.body);

            // Validate ArrayOperand JSON structure if provided
            if (request.body.ArrayOperand) {
                const arrayOperandValidation = this.validateSerializedOperand(request.body.ArrayOperand);
                if (arrayOperandValidation.error) {
                    throw new Error(`Invalid ArrayOperand structure: ${arrayOperandValidation.error.message}`);
                }
            }

            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.Iterate,
                ItemAlias: request.body.ItemAlias,
                OperationId: request.body.OperationId,
                ArrayOperand: request.body.ArrayOperand,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateIterateOperationUpdateRequest = async (
        request: express.Request
    ): Promise<IterateOperationUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Type: joi.string().valid(OperationType.Iterate).optional(),
                Description: joi.string().optional(),
                ItemAlias: joi.string().optional(),
                OperationId: joi.string().uuid().optional(),
                ArrayOperand: joi.string().optional(), // JSON serialized Operand
            });
            await schema.validateAsync(request.body);

            // Validate ArrayOperand JSON structure if provided
            if (request.body.ArrayOperand) {
                const arrayOperandValidation = this.validateSerializedOperand(request.body.ArrayOperand);
                if (arrayOperandValidation.error) {
                    throw new Error(`Invalid ArrayOperand structure: ${arrayOperandValidation.error.message}`);
                }
            }

            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: request.body.Type,
                ItemAlias: request.body.ItemAlias,
                OperationId: request.body.OperationId,
                ArrayOperand: request.body.ArrayOperand,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateIterateOperationSearchRequest = async (
        request: express.Request
    ): Promise<IterateOperationSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                itemAlias: joi.string().optional(),
                operationId: joi.string().uuid().optional(),
                arrayOperand: joi.string().optional(),
                type: joi.string().valid(OperationType.Iterate).optional(),
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

    // Helper method to validate a single operand
    private validateSerializedOperand = (operandString: string): { error?: Error; value?: any } => {
        try {
            const operand = JSON.parse(operandString);
            const result = BaseValidator.operandSchema.validate(operand);
            return { error: result.error, value: result.value };
        } catch (error) {
            return { error: new Error('Invalid JSON format for operand') };
        }
    };

    private getSearchFilters = (query: any): IterateOperationSearchFilters => {
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

        const itemAlias = query.itemAlias ? query.itemAlias : null;
        if (itemAlias != null) {
            filters['ItemAlias'] = itemAlias;
        }

        const operationId = query.operationId ? query.operationId : null;
        if (operationId != null) {
            filters['OperationId'] = operationId;
        }

        const arrayOperand = query.arrayOperand ? query.arrayOperand : null;
        if (arrayOperand != null) {
            filters['ArrayOperand'] = arrayOperand;
        }

        const type = query.type ? query.type : null;
        if (type != null) {
            filters['Type'] = type;
        }

        return filters;
    };
}
