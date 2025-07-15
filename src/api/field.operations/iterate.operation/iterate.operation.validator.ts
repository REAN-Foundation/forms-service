import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import BaseValidator from '../../base.validator';
import {
    IterateOperationCreateModel,
    IterateOperationUpdateModel,
    OperationSearchFilters
} from '../../../domain.types/forms/operation.domain.types';
import { OperationType } from '../../../domain.types/forms/operation.enums';


export class IterateOperationValidator extends BaseValidator {

    // Iterate Operation validation
    public validateIterateOperationCreateRequest = async (request: express.Request): Promise<IterateOperationCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
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
                FilterExpression: request.body.FilterExpression
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateIterateOperationUpdateRequest = async (request: express.Request): Promise<IterateOperationUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
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
                FilterExpression: request.body.FilterExpression
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateOperationSearchRequest = async (request: express.Request): Promise<OperationSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                PageIndex: joi.number().integer().min(0).optional(),
                ItemsPerPage: joi.number().integer().min(1).max(100).optional(),
                OrderBy: joi.string().optional(),
                Order: joi.string().valid('ASC', 'DESC').optional(),
            });
            await schema.validateAsync(request.query);
            return {
                id: request.query.id as string,
                name: request.query.name as string,
                description: request.query.description as string,
                PageIndex: request.query.PageIndex ? parseInt(request.query.PageIndex as string) : 0,
                ItemsPerPage: request.query.ItemsPerPage ? parseInt(request.query.ItemsPerPage as string) : 10,
                OrderBy: request.query.OrderBy as string,
                Order: request.query.Order as 'ASC' | 'DESC',
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
} 