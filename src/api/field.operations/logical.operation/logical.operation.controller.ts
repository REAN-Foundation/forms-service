import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
// import { LogicalOperationService } from '../../../services/field.operations/logical.operation.service';
import { LogicalOperationValidator } from './logical.operation.validator';
import {
    LogicalOperationCreateModel,
    LogicalOperationUpdateModel,
    OperationSearchFilters,
} from '../../../domain.types/forms/operation.domain.types';
import { ApiError } from '../../../common/api.error';
import { Injector } from '../../../startup/injector';
import { LogicalOperationService } from '../../../services/field.operations/logical.operation.service';

export class LogicalOperationController extends BaseController {
    _service: LogicalOperationService = Injector.Container.resolve(
        LogicalOperationService
    );
    _validator: LogicalOperationValidator = new LogicalOperationValidator();

    constructor() {
        super();
    }

    // Logical Operation operations
    createLogicalOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const model: LogicalOperationCreateModel =
                await this._validator.validateLogicalOperationCreateRequest(
                    request
                );
            const record = await this._service.createLogicalOperation(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Logical Operation!',
                    new Error()
                );
            }
            const message = 'Logical Operation created successfully!';
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

    getLogicalOperationById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getLogicalOperationById(id);
            if (!record) {
                throw new ApiError('Logical Operation not found!', 404);
            }
            const message = 'Logical Operation retrieved successfully!';
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

    updateLogicalOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: LogicalOperationUpdateModel =
                await this._validator.validateLogicalOperationUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.updateLogicalOperation(
                id,
                model
            );
            const message = 'Logical Operation updated successfully!';
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

    deleteLogicalOperation = async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.deleteLogicalOperation(id);
            const message = 'Logical Operation deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchLogicalOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const filters: OperationSearchFilters =
                await this._validator.validateOperationSearchRequest(request);
            const searchResults =
                await this._service.searchLogicalOperation(filters);
            const message = 'Logical Operation search completed successfully!';
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
