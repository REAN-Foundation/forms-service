import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { FunctionExpressionOperationService } from '../../../database/services/function.expression.operation.service';
import {
    FunctionExpressionOperationCreateModel,
    FunctionExpressionOperationUpdateModel,
    FunctionExpressionOperationSearchFilters,
} from '../../../domain.types/operations/function.expression.operation.domain.types';
import { Injector } from '../../../startup/injector';
import { FunctionExpressionOperationValidator } from './function.expression.operation.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class FunctionExpressionOperationController {
//#region member variables and constructors

    _service: FunctionExpressionOperationService = Injector.Container.resolve(
        FunctionExpressionOperationService
    );
    _validator: FunctionExpressionOperationValidator =
        new FunctionExpressionOperationValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: FunctionExpressionOperationCreateModel =
                await this._validator.validateFunctionExpressionOperationCreateRequest(
                    request
                );
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Function Expression Operation!',
                );
            }
            const message = 'Function Expression Operation created successfully!';
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
                ErrorHandler.throwNotFoundError('Function Expression Operation not found!');
            }
            const message = 'Function Expression Operation retrieved successfully!';
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
            const model: FunctionExpressionOperationUpdateModel =
                await this._validator.validateFunctionExpressionOperationUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.update(
                id,
                model
            );
            const message = 'Function Expression Operation updated successfully!';
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
            const message = 'Function Expression Operation deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: FunctionExpressionOperationSearchFilters =
                await this._validator.validateFunctionExpressionOperationSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Function Expression Operation search completed successfully!';
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
