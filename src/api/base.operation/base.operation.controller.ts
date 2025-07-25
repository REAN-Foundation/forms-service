import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { BaseOperationService } from '../../database/services/base.operation.service';
import {
    BaseOperationCreateModel,
    BaseOperationUpdateModel,
    BaseOperationSearchFilters,
} from '../../domain.types/operations/base.operation.domain.types';
import { Injector } from '../../startup/injector';
import { BaseOperationValidator } from './base.operation.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class BaseOperationController {
//#region member variables and constructors

    _service: BaseOperationService = Injector.Container.resolve(
        BaseOperationService
    );
    _validator: BaseOperationValidator = new BaseOperationValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: BaseOperationCreateModel =
                await this._validator.validateBaseOperationCreateRequest(
                    request
                );
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Base Operation!',
                );
            }
            const message = 'Base Operation created successfully!';
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
                ErrorHandler.throwNotFoundError('Base Operation not found!');
            }
            const message = 'Base Operation retrieved successfully!';
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
            const model: BaseOperationUpdateModel =
                await this._validator.validateBaseOperationUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.update(
                id,
                model
            );
            const message = 'Base Operation updated successfully!';
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
            const message = 'Base Operation deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: BaseOperationSearchFilters =
                await this._validator.validateBaseOperationSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Base Operation search completed successfully!';
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