import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { CompositionOperationService } from '../../../database/services/composition.operation.service';
import {
    CompositionOperationCreateModel,
    CompositionOperationUpdateModel,
    CompositionOperationSearchFilters,
} from '../../../domain.types/operations/composition.operation.domain.types';
import { Injector } from '../../../startup/injector';
import { CompositionOperationValidator } from './composition.operation.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class CompositionOperationController {
//#region member variables and constructors

    _service: CompositionOperationService = Injector.Container.resolve(
        CompositionOperationService
    );
    _validator: CompositionOperationValidator = new CompositionOperationValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: CompositionOperationCreateModel =
                await this._validator.validateCompositionOperationCreateRequest(
                    request
                );
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Composition Operation!',
                );
            }
            const message = 'Composition Operation created successfully!';
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
                ErrorHandler.throwNotFoundError('Composition Operation not found!');
            }
            const message = 'Composition Operation retrieved successfully!';
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
            const model: CompositionOperationUpdateModel =
                await this._validator.validateCompositionOperationUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.update(
                id,
                model
            );
            const message = 'Composition Operation updated successfully!';
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
            const message = 'Composition Operation deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: CompositionOperationSearchFilters =
                await this._validator.validateCompositionOperationSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Composition Operation search completed successfully!';
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
