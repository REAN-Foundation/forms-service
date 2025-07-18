import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { ValidationLogicService } from '../../../database/services/validation.logic.service';
import {
    ValidationLogicCreateModel,
    ValidationLogicUpdateModel,
} from '../../../domain.types/logic/validation.logic.domain.types';
import { ValidationLogicSearchFilters } from '../../../domain.types/logic/validation.logic.domain.types';
import { Injector } from '../../../startup/injector';
import { ValidationLogicValidator } from './validation.logic.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class ValidationLogicController {
//#region member variables and constructors

    _service: ValidationLogicService = Injector.Container.resolve(
        ValidationLogicService
    );
    _validator: ValidationLogicValidator = new ValidationLogicValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: ValidationLogicCreateModel =
                await this._validator.validateValidationLogicCreateRequest(
                    request
                );
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Validation Logic!',
                );
            }
            const message = 'Validation Logic created successfully!';
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
                ErrorHandler.throwNotFoundError('Validation Logic not found!');
            }
            const message = 'Validation Logic retrieved successfully!';
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
            const model: ValidationLogicUpdateModel =
                await this._validator.validateValidationLogicUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.update(
                id,
                model
            );
            const message = 'Validation Logic updated successfully!';
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
            const message = 'Validation Logic deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: ValidationLogicSearchFilters =
                await this._validator.validateValidationLogicSearchRequest(request);
            const searchResults =
                await this._service.search(filters);
            const message = 'Validation Logic search completed successfully!';
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
