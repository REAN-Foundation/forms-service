import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { IterateOperationService } from '../../../services/field.operations/iterate.operation.service';
import {
    IterateOperationCreateModel,
    IterateOperationUpdateModel,
    OperationSearchFilters,
} from '../../../domain.types/forms/operation.domain.types';
import { ApiError } from '../../../common/api.error';
import { Injector } from '../../../startup/injector';
import { IterateOperationValidator } from './iterate.operation.validator';

export class IterateOperationController extends BaseController {
    _service: IterateOperationService = Injector.Container.resolve(
        IterateOperationService
    );
    _validator: IterateOperationValidator = new IterateOperationValidator();

    constructor() {
        super();
    }

    // Iterate Operation operations
    createIterateOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const model: IterateOperationCreateModel =
                await this._validator.validateIterateOperationCreateRequest(
                    request
                );
            const record = await this._service.createIterateOperation(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Iterate Operation!',
                    new Error()
                );
            }
            const message = 'Iterate Operation created successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                201,
                record
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getIterateOperationById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getIterateOperationById(id);
            if (!record) {
                throw new ApiError('Iterate Operation not found!', 404);
            }
            const message = 'Iterate Operation retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                record
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    updateIterateOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: IterateOperationUpdateModel =
                await this._validator.validateIterateOperationUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.updateIterateOperation(
                id,
                model
            );
            const message = 'Iterate Operation updated successfully!';
            ResponseHandler.success(
                request,
                response,
                message,
                200,
                updatedRecord
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    deleteIterateOperation = async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.deleteIterateOperation(id);
            const message = 'Iterate Operation deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchIterateOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const filters: OperationSearchFilters =
                await this._validator.validateOperationSearchRequest(request);
            const searchResults =
                await this._service.searchIterateOperation(filters);
            const message = 'Iterate Operation search completed successfully!';
            ResponseHandler.success(
                request,
                response,
                message,
                200,
                searchResults
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
