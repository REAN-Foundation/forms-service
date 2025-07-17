import express from 'express';
import { ResponseHandler } from '../../../common/res.handlers/response.handler';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/res.handlers/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
// import { FunctionExpressionOperationService } from '../../../services/field.operations/function.expression.operation.service';
import {
    FunctionExpressionOperationCreateModel,
    FunctionExpressionOperationUpdateModel,
    OperationSearchFilters,
} from '../../../domain.types/forms/operation.domain.types';
import { ApiError } from '../../../common/api.error';
import { Injector } from '../../../startup/injector';
import { FunctionExpressionOperationValidator } from './function.expression.operation.validator';
import { FunctionExpressionOperationService } from '../../../services/field.operations/function.expression.operation.service';

export class FunctionExpressionOperationController extends BaseController {
    _service: FunctionExpressionOperationService = Injector.Container.resolve(
        FunctionExpressionOperationService
    );
    _validator: FunctionExpressionOperationValidator =
        new FunctionExpressionOperationValidator();

    constructor() {
        super();
    }

    // Function Expression Operation operations
    createFunctionExpressionOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const model: FunctionExpressionOperationCreateModel =
                await this._validator.validateFunctionExpressionOperationCreateRequest(
                    request
                );
            const record =
                await this._service.createFunctionExpressionOperation(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Function Expression Operation!',
                    new Error()
                );
            }
            const message =
                'Function Expression Operation created successfully!';
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

    getFunctionExpressionOperationById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const record =
                await this._service.getFunctionExpressionOperationById(id);
            if (!record) {
                throw new ApiError(
                    'Function Expression Operation not found!',
                    404
                );
            }
            const message =
                'Function Expression Operation retrieved successfully!';
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

    updateFunctionExpressionOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: FunctionExpressionOperationUpdateModel =
                await this._validator.validateFunctionExpressionOperationUpdateRequest(
                    request
                );
            const updatedRecord =
                await this._service.updateFunctionExpressionOperation(
                    id,
                    model
                );
            const message =
                'Function Expression Operation updated successfully!';
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

    deleteFunctionExpressionOperation = async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const result =
                await this._service.deleteFunctionExpressionOperation(id);
            const message =
                'Function Expression Operation deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchFunctionExpressionOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const filters: OperationSearchFilters =
                await this._validator.validateOperationSearchRequest(request);
            const searchResults =
                await this._service.searchFunctionExpressionOperation(filters);
            const message =
                'Function Expression Operation search completed successfully!';
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
