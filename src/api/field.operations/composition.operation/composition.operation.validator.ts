import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import BaseValidator from '../../base.validator';
import {
    CompositionOperationCreateModel,
    CompositionOperationUpdateModel,
    OperationSearchFilters
} from '../../../domain.types/forms/operation.domain.types';
import { CompositionOperatorType, OperationType } from '../../../domain.types/forms/operation.enums';


export class CompositionOperationValidator extends BaseValidator {

    // Composition Operation validation
    public validateCompositionOperationCreateRequest = async (request: express.Request): Promise<CompositionOperationCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi.string().valid(OperationType.Composition).optional(),
                Operator: joi.string().valid(...Object.values(CompositionOperatorType)).required(),
                Operands: joi.string().required(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.Composition, // Always set to Composition for this operation type
                Operator: request.body.Operator,
                Operands: request.body.Operands
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateCompositionOperationUpdateRequest = async (request: express.Request): Promise<CompositionOperationUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                Type: joi.string().valid(OperationType.Composition).optional(),
                Operator: joi.string().valid(...Object.values(CompositionOperatorType)).optional(),
                Operands: joi.string().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Type: OperationType.Composition, // Always set to Composition for this operation type
                Operator: request.body.Operator,
                Operands: request.body.Operands
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
                operator: joi.string().valid(...Object.values(CompositionOperatorType)).optional(),
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
                operator: request.query.operator as CompositionOperatorType,
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