import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { error } from 'console';
import { FormSectionValidator } from './form.section.validator';
import { FormSectionService } from '../../services/form.section.service';
import { FormSectionCreateModel, FormSectionUpdateModel } from '../../domain.types/forms.submission/form.section.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class FormSectionController extends BaseController {

    //#region member variables and constructors

    _service: FormSectionService = new FormSectionService();

    _validator: FormSectionValidator = new FormSectionValidator();

    constructor() {
        super();
    }

    //#endregion

    getAll = async (request: express.Request, response: express.Response) => {
        try {
            const record = await this._service.allFormSections();
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to Load all sections!', error);
            }
            const message = 'Form section retrived successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    create = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Create', request, response);
            let model: FormSectionCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Form section!', error);
            }
            const message = 'Form section added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.GetById', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'Form section retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Update', request, response);
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: FormSectionUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Form section updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // await this.authorize('Form.Delete', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Form section deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
