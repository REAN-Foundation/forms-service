import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { IterateOperationService } from '../../../database/services/iterate.operation.service';
import {
    IterateOperationCreateModel,
    IterateOperationUpdateModel,
    IterateOperationSearchFilters,
} from '../../../domain.types/operations/iterate.operation.domain.types';
import { Injector } from '../../../startup/injector';
import { IterateOperationValidator } from './iterate.operation.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class IterateOperationController {
//#region member variables and constructors

    _service: IterateOperationService = Injector.Container.resolve(
        IterateOperationService
    );
    _validator: IterateOperationValidator = new IterateOperationValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: IterateOperationCreateModel =
                await this._validator.validateIterateOperationCreateRequest(
                    request
                );
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Iterate Operation!',
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

    getById = async (request: express.Request, response: express.Response) => {
        try {
            const id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getById(id);
            if (!record) {
                ErrorHandler.throwNotFoundError('Iterate Operation not found!');
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

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            const model: IterateOperationUpdateModel =
                await this._validator.validateIterateOperationUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.update(
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
            const message = 'Iterate Operation deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: IterateOperationSearchFilters =
                await this._validator.validateOperationSearchRequest(request);
            const searchResults = await this._service.search(filters);
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
