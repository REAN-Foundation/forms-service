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
} from '../../../domain.types/operation.enums';

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
                ResultDataType: joi.string().required(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.Mathematical, // Always set to Mathematical for this operation type
                Operator: request.body.Operator,
                Operands: request.body.Operands,
                ResultDataType: request.body.ResultDataType,
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
                ResultDataType: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Operator: request.body.Operator,
                Operands: request.body.Operands,
                ResultDataType: request.body.ResultDataType,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateOperationSearchRequest = async (
        request: express.Request
    ): Promise<MathematicalOperationResponseDto> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                operator: joi.string().valid(...Object.values(MathematicalOperatorType)).optional(),
                operands: joi.string().optional(),
                resultDataType: joi.string().optional(),
                type: joi.string().valid(OperationType.Mathematical).optional(),
            });
            await schema.validateAsync(request.query);
            const baseFilters = await this.validateBaseSearchFilters(request);
            const filters = this.getSearchFilters(request.query);
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

        const operands = query.operands ? query.operands : null;
        if (operands != null) {
            filters['operands'] = operands;
        }

        const resultDataType = query.resultDataType ? query.resultDataType : null;
        if (resultDataType != null) {
            filters['resultDataType'] = resultDataType;
        }

        const type = query.type ? query.type : null;
        if (type != null) {
            filters['type'] = type;
        }

        return filters;
    };
    //#endregion
}
