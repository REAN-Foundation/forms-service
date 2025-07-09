import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { FavoriteTemplateValidator } from './favorite.template.validator';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/handlers/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { FavoriteTemplateService } from '../../services/favorite.template/favorite.template.service';
import { FavoriteTemplateCreateModel, FavoriteTemplateSearchFilters, FavoriteTemplateUpdateModel } from '../../domain.types/forms/favorite.template.domain.types';
import { container } from 'tsyringe';
import { Injector } from '../../startup/injector';

export class FavoriteTemplateController extends BaseController {

    _service: FavoriteTemplateService = Injector.Container.resolve(FavoriteTemplateService);
    _validator: FavoriteTemplateValidator = new FavoriteTemplateValidator();

    constructor() {
        super();
    }

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: FavoriteTemplateCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add favorite template!', new Error());
            }
            const message = 'Favorite template added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'Favorite template retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: FavoriteTemplateUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Favorite template updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Favorite template deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: FavoriteTemplateSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Favorite templates retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
} 