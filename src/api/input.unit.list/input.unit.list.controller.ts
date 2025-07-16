import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { InputUnitListValidator } from './input.unit.list.validator';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/handlers/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { InputUnitListService } from '../../services/input.unit.list/input.unit.list.service';
import {
    InputUnitListCreateModel,
    InputUnitListSearchFilters,
    InputUnitListUpdateModel,
} from '../../domain.types/forms/input.unit.list.domain.types';
import { Injector } from '../../startup/injector';

export class InputUnitListController extends BaseController {
    _service: InputUnitListService =
        Injector.Container.resolve(InputUnitListService);
    _validator: InputUnitListValidator = new InputUnitListValidator();

    constructor() {
        super();
    }

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: InputUnitListCreateModel =
                await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to add input unit list!',
                    new Error()
                );
            }
            const message = 'Input unit list added successfully!';
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
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getById(id);
            const message = 'Input unit list retrieved successfully!';
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
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: InputUnitListUpdateModel =
                await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Input unit list updated successfully!';
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
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.delete(id);
            const message = 'Input unit list deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: InputUnitListSearchFilters =
                await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Input unit lists retrieved successfully!';
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
