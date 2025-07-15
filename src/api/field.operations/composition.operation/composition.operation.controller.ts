import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
// import { CompositionOperationService } from '../../../services/field.operations/composition.operation.service';
import { CompositionOperationCreateModel, CompositionOperationUpdateModel, OperationSearchFilters } from '../../../domain.types/forms/operation.domain.types';
import { ApiError } from '../../../common/api.error';
import { Injector } from '../../../startup/injector';
import { CompositionOperationValidator } from './composition.operation.validator';
import { CompositionOperationService } from '../../../services/field.operations/composition.operation.service';

export class CompositionOperationController extends BaseController {
    _service: CompositionOperationService = Injector.Container.resolve(CompositionOperationService);
    _validator: CompositionOperationValidator = new CompositionOperationValidator();

    constructor() {
        super();
    }

    // Composition Operation operations
    createCompositionOperation = async (request: express.Request, response: express.Response) => {
        try {
            const model: CompositionOperationCreateModel = await this._validator.validateCompositionOperationCreateRequest(request);
            const record = await this._service.createCompositionOperation(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to create Composition Operation!', new Error());
            }
            const message = 'Composition Operation created successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getCompositionOperationById = async (request: express.Request, response: express.Response) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getCompositionOperationById(id);
            if (!record) {
                throw new ApiError('Composition Operation not found!', 404);
            }
            const message = 'Composition Operation retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    updateCompositionOperation = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: CompositionOperationUpdateModel = await this._validator.validateCompositionOperationUpdateRequest(request);
            const updatedRecord = await this._service.updateCompositionOperation(id, model);
            const message = 'Composition Operation updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    deleteCompositionOperation = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.deleteCompositionOperation(id);
            const message = 'Composition Operation deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchCompositionOperation = async (request: express.Request, response: express.Response) => {
        try {
            const filters: OperationSearchFilters = await this._validator.validateOperationSearchRequest(request);
            const searchResults = await this._service.searchCompositionOperation(filters);
            const message = 'Composition Operation search completed successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

} 