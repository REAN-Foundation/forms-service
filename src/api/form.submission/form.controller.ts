import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { FormValidator } from './form.validator';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { FormService } from '../../services/form.submission.service';
import { FormSubmissionCreateModel, FormSubmissionSearchFilters, FormSubmissionUpdateModel } from '../../domain.types/forms/form.submission.domain.types';
import { error } from 'console';
import moment from 'moment-timezone';


///////////////////////////////////////////////////////////////////////////////////////

export class FormController extends BaseController {

    //#region member variables and constructors

    _service: FormService = new FormService();

    _validator: FormValidator = new FormValidator();

    constructor() {
        super();
    }

    //#endregion

    getAll = async (request: express.Request, response: express.Response) => {
        try {
            const record = await this._service.allForms();
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Form!', error);
            }
            const message = 'All form fetched successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    create = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Create', request, response);
            let model: FormSubmissionCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Form!', error);
            }
            const message = 'Form added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.GetById', request, response);
            // var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const id = request.params.id;
            const record = await this._service.getById(id);
            const message = 'Form retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Update', request, response);
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: FormSubmissionUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Form updated successfully!';
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
            const message = 'Form deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
    getByTemplateId = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.GetById', request, response);
            // var id: uuid = await this._validator.validateParamAsUUID(request, 'templateId');
            var id: uuid = request.params.templateId;
            const record = await this._service.getByTemplateId(id);
            const message = 'Form submission by templateId retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    submit = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.submit(id);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Form!', error);
            }
            const message = 'Form submission done successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getFormByDate = async (request: express.Request, response: express.Response) => {
        const dateString = request.params.date;
        const parsedDate = moment(dateString, 'YYYY-MM-DD HH:mm:ss.SSSSSS');

        // if (!parsedDate.isValid()) {
        //     console.log('Invalid date format:', dateString);
        //     return ResponseHandler.handleError(request, response, error);
        // }
        try {
            const utcDate = parsedDate;
            const istDate = utcDate.tz('Asia/Kolkata');
            const formattedDate = istDate.format('YYYY-MM-DD HH:mm:ss.SSS');
            const records = await this._service.getByDate(formattedDate);
            if (records === null) {
                ErrorHandler.throwInternalServerError('Unable to add Form!', error);
            }
            const message = 'Form added successfully!';
            return ResponseHandler.success(request, response, message, 201, records);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: FormSubmissionSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'User retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
