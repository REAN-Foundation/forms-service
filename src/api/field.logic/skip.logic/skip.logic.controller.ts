import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { SkipLogicService } from '../../../database/services/skip.logic.service';
import { SkipLogicValidator } from './skip.logic.validator';
import {
    SkipLogicCreateModel,
    SkipLogicUpdateModel,
} from '../../../domain.types/logic/skip.logic.domain.types';
import { SkipLogicSearchFilters } from '../../../domain.types/logic/skip.logic.domain.types';
import { Injector } from '../../../startup/injector';

///////////////////////////////////////////////////////////////////////////////////////

export class SkipLogicController {
//#region member variables and constructors

    _service: SkipLogicService = Injector.Container.resolve(SkipLogicService);

    _validator: SkipLogicValidator = new SkipLogicValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: SkipLogicCreateModel =
                await this._validator.validateSkipLogicCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Skip Logic!',
                );
            }
            const message = 'Skip Logic created successfully!';
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
                ErrorHandler.throwNotFoundError('Skip Logic not found!');
            }
            const message = 'Skip Logic retrieved successfully!';
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
            const model: SkipLogicUpdateModel =
                await this._validator.validateSkipLogicUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Skip Logic updated successfully!';
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
            const message = 'Skip Logic deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: SkipLogicSearchFilters =
                await this._validator.validateSkipLogicSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Skip Logic search completed successfully!';
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
