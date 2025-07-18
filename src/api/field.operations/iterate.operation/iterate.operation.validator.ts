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
import { OperationType } from '../../../domain.types/operation.enums';

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
                CollectionField: joi.string().required(),
                ResultField: joi.string().required(),
                OperationId: joi.string().uuid().required(),
                FilterExpression: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.Iterate, // Always set to Iterate for this operation type
                CollectionField: request.body.CollectionField,
                ResultField: request.body.ResultField,
                OperationId: request.body.OperationId,
                FilterExpression: request.body.FilterExpression,
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
                CollectionField: joi.string().optional(),
                ResultField: joi.string().optional(),
                OperationId: joi.string().uuid().optional(),
                FilterExpression: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                CollectionField: request.body.CollectionField,
                ResultField: request.body.ResultField,
                OperationId: request.body.OperationId,
                FilterExpression: request.body.FilterExpression,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateOperationSearchRequest = async (
        request: express.Request
    ): Promise<IterateOperationResponseDto> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                collectionField: joi.string().optional(),
                resultField: joi.string().optional(),
                operationId: joi.string().uuid().optional(),
                filterExpression: joi.string().optional(),
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

    private getSearchFilters = (query: any): IterateOperationSearchFilters => {
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

        const collectionField = query.collectionField ? query.collectionField : null;
        if (collectionField != null) {
            filters['collectionField'] = collectionField;
        }

        const resultField = query.resultField ? query.resultField : null;
        if (resultField != null) {
            filters['resultField'] = resultField;
        }

        const operationId = query.operationId ? query.operationId : null;
        if (operationId != null) {
            filters['operationId'] = operationId;
        }

        const filterExpression = query.filterExpression ? query.filterExpression : null;
        if (filterExpression != null) {
            filters['filterExpression'] = filterExpression;
        }

        return filters;
    };
    //#endregion
}
