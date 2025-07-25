import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { MathematicalOperationService } from '../../../database/services/mathematical.operation.service';
import {
    MathematicalOperationCreateModel,
    MathematicalOperationUpdateModel,
    MathematicalOperationSearchFilters,
} from '../../../domain.types/operations/mathematical.operation.domain.types';
import { Injector } from '../../../startup/injector';
import { MathematicalOperationValidator } from './mathematical.operation.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class MathematicalOperationController {
//#region member variables and constructors

    _service: MathematicalOperationService = Injector.Container.resolve(
        MathematicalOperationService
    );
    _validator: MathematicalOperationValidator =
        new MathematicalOperationValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: MathematicalOperationCreateModel =
                await this._validator.validateMathematicalOperationCreateRequest(
                    request
                );
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Mathematical Operation!',
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

    getById = async (request: express.Request, response: express.Response) => {
        try {
            const id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getById(id);
            if (!record) {
                ErrorHandler.throwNotFoundError('Mathematical Operation not found!');
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

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            const model: MathematicalOperationUpdateModel =
                await this._validator.validateMathematicalOperationUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.update(
                id,
                model
            );
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
            const message = 'Mathematical Operation deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: MathematicalOperationSearchFilters =
                await this._validator.validateMathematicalOperationSearchRequest(request);
            const searchResults =
                await this._service.search(filters);
            const message = 'Mathematical Operation search completed successfully!';
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
