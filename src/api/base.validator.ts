import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../common/error.handling/error.handler';
import { uuid } from '../domain.types/miscellaneous/system.types';
import { BaseSearchFilters } from '../domain.types/miscellaneous/base.search.types';
import { OperandType, OperandDataType } from '../domain.types/enums/operation.enums';

//////////////////////////////////////////////////////////////////

export default class BaseValidator {

    // Comprehensive Operand validation schema
    protected static operandSchema = joi.object({
        Type: joi.string().valid(...Object.values(OperandType)).required(),
        DataType: joi.string().valid(...Object.values(OperandDataType)).required(),
        Value: joi.any().optional(),
        FieldId: joi.string().uuid().optional(),
        FunctionName: joi.string().optional(),
        FunctionArgs: joi.array().items(joi.link('#operandSchema')).optional(),
    }).id('operandSchema');

    // Helper method to validate operands array
    protected validateOperandsArray = (operands: any): { error?: Error; value?: any } => {
        const operandsArraySchema = joi.array().items(BaseValidator.operandSchema);
        const result = operandsArraySchema.validate(operands);
        return { error: result.error, value: result.value };
    };

    // Helper method to validate serialized operands (JSON string)
    protected validateSerializedOperands = (operandsString: string): { error?: Error; value?: any } => {
        try {
            const operands = JSON.parse(operandsString);
            return this.validateOperandsArray(operands);
        } catch (error) {
            return { error: new Error('Invalid JSON format for operands') };
        }
    };

    // Helper method to validate variables for function expressions
    protected validateVariables = (variablesString: string): { error?: Error; value?: any } => {
        try {
            const variables = JSON.parse(variablesString);
            const variablesSchema = joi.object().pattern(
                joi.string(),
                BaseValidator.operandSchema
            );
            const result = variablesSchema.validate(variables);
            return { error: result.error, value: result.value };
        } catch (error) {
            return { error: new Error('Invalid JSON format for variables') };
        }
    };

    public requestParamAsUUID = async (request: express.Request, paramName: string): Promise<uuid> => {
        try {
            const schema = joi.string().uuid({ version: 'uuidv4' }).required();
            const param = request.params[paramName];
            await schema.validateAsync(param);
            return request.params[paramName];
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public requestParamAsInteger = async (request: express.Request, paramName: string): Promise<number> => {
        try {
            const schema = joi.number().integer().required();
            const param = request.params[paramName];
            await schema.validateAsync(param);
            return parseInt(request.params[paramName]);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public requestParamAsDecimal = async (request: express.Request, paramName: string): Promise<number> => {
        try {
            const schema = joi.number().required();
            const param = request.params[paramName];
            await schema.validateAsync(param);
            return parseFloat(request.params[paramName]);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateBaseSearchFilters = async(request: express.Request) => {
        try {
            const schema = joi.object({
            //     createdDateFrom : joi.date().optional(),
            //     createdDateTo   : joi.date().optional(),
                orderBy         : joi.string().optional(),
                order           : joi.string().allow('ascending', 'descending').optional(),
                pageIndex       : joi.number().integer().sign('positive').optional(),
                itemsPerPage    : joi.number().integer().sign('positive').optional(),
            });
            // await schema.validateAsync(request.query);
            return this.getBaseSearchFilters(request);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getBaseSearchFilters = (request: express.Request): any => {

        var filters = {};
        const pageIndex: number = request.query.pageIndex !== undefined && request.query.pageIndex != null ?
            parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage: number = request.query.itemsPerPage !== undefined && request.query.itemsPerPage != null ?
            parseInt(request.query.itemsPerPage as string, 10) : 25;

        // filters['CreatedDateFrom'] = request.query.createdDateFrom ? new Date(request.query.createdDateFrom as string) : null;
        // filters['CreatedDateTo']   = request.query.createdDateTo ? new Date(request.query.createdDateTo as string) : null;
        filters['OrderBy']         = request.query.orderBy as string ?? 'CreatedAt';
        filters['Order']           = request.query.order as string ?? 'descending';
        filters['PageIndex']       = pageIndex;
        filters['ItemsPerPage']    = itemsPerPage;

        return filters;
    };

}
