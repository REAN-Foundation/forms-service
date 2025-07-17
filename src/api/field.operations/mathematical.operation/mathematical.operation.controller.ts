import express from 'express';
import { ResponseHandler } from '../../../common/res.handlers/response.handler';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/res.handlers/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { MathematicalOperationService } from '../../../services/field.operations/mathematical.operation.service';
import {
    MathematicalOperationCreateModel,
    MathematicalOperationUpdateModel,
    OperationSearchFilters,
} from '../../../domain.types/forms/operation.domain.types';
import { ApiError } from '../../../common/api.error';
import { Injector } from '../../../startup/injector';
import { MathematicalOperationValidator } from './mathematical.operation.validator';

export class MathematicalOperationController extends BaseController {
    _service: MathematicalOperationService = Injector.Container.resolve(
        MathematicalOperationService
    );
    _validator: MathematicalOperationValidator =
        new MathematicalOperationValidator();

    constructor() {
        super();
    }

    // Mathematical Operation operations
    createMathematicalOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const model: MathematicalOperationCreateModel =
                await this._validator.validateMathematicalOperationCreateRequest(
                    request
                );
            const record =
                await this._service.createMathematicalOperation(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Mathematical Operation!',
                    new Error()
                );
            }
            const message = 'Mathematical Operation created successfully!';
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

    getMathematicalOperationById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getMathematicalOperationById(id);
            if (!record) {
                throw new ApiError('Mathematical Operation not found!', 404);
            }
            const message = 'Mathematical Operation retrieved successfully!';
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

    updateMathematicalOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: MathematicalOperationUpdateModel =
                await this._validator.validateMathematicalOperationUpdateRequest(
                    request
                );
            const updatedRecord =
                await this._service.updateMathematicalOperation(id, model);
            const message = 'Mathematical Operation updated successfully!';
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

    deleteMathematicalOperation = async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.deleteMathematicalOperation(id);
            const message = 'Mathematical Operation deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchMathematicalOperation = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const filters: OperationSearchFilters =
                await this._validator.validateOperationSearchRequest(request);
            const searchResults =
                await this._service.searchMathematicalOperation(filters);
            const message =
                'Mathematical Operation search completed successfully!';
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
