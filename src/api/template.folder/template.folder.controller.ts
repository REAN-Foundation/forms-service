import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { TemplateFolderValidator } from './template.folder.validator';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/handlers/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { TemplateFolderService } from '../../services/template.folder/template.folder.service';
import { TemplateFolderCreateModel, TemplateFolderSearchFilters, TemplateFolderUpdateModel } from '../../domain.types/forms/template.folder.domain.types';
import { Injector } from '../../startup/injector';

export class TemplateFolderController extends BaseController {
    _service: TemplateFolderService = Injector.Container.resolve(TemplateFolderService);
    _validator: TemplateFolderValidator = new TemplateFolderValidator();

    constructor() {
        super();
    }

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: TemplateFolderCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add template folder!', new Error());
            }
            const message = 'Template folder added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'Template folder retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: TemplateFolderUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Template folder updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Template folder deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: TemplateFolderSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Template folders retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}