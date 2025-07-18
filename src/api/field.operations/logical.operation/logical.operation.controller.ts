import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { LogicalOperationService } from '../../../database/services/logical.operation.service';
import {
    LogicalOperationCreateModel,
    LogicalOperationUpdateModel,
    LogicalOperationSearchFilters,
} from '../../../domain.types/operations/logical.operation.domain.types';
import { Injector } from '../../../startup/injector';
import { LogicalOperationValidator } from './logical.operation.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class LogicalOperationController {
//#region member variables and constructors

    _service: LogicalOperationService = Injector.Container.resolve(
        LogicalOperationService
    );
    _validator: LogicalOperationValidator = new LogicalOperationValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: LogicalOperationCreateModel =
                await this._validator.validateLogicalOperationCreateRequest(
                    request
                );
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Logical Operation!',
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

    getById = async (request: express.Request, response: express.Response) => {
        try {
            const id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getById(id);
            if (!record) {
                ErrorHandler.throwNotFoundError('Logical Operation not found!');
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

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            const model: LogicalOperationUpdateModel =
                await this._validator.validateLogicalOperationUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.update(
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

    delete = async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        try {
            const id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.delete(id);
            const message = 'Logical Operation deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: LogicalOperationSearchFilters =
                await this._validator.validateOperationSearchRequest(request);
            const searchResults = await this._service.search(filters);
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
