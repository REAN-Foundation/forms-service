import express from 'express';
import { ResponseHandler } from '../../common/res.handlers/response.handler';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/res.handlers/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { error } from 'console';
import { FormFieldService } from '../../services/form.field/form.field.service';
import {
    FormFieldCreateModel,
    FormFieldSearchFilters,
    FormFieldUpdateModel,
} from '../../domain.types/forms/form.field.domain.types';
import { Injector } from '../../startup/injector';
import { FormFieldValidator } from './form.field.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class FormFieldController extends BaseController {
    //#region member variables and constructors

    _service: FormFieldService = Injector.Container.resolve(FormFieldService);

    _validator: FormFieldValidator = new FormFieldValidator();

    constructor() {
        super();
    }

    //#endregion

    // getAll = async (request: express.Request, response: express.Response) => {
    //     try {
    //         const record = await this._service.allFormFields();
    //         if (record === null) {
    //             ErrorHandler.throwInternalServerError('Unable to add FormField!', error);
    //         }
    //         const message = 'All FormFields retrived successfully!';
    //         return ResponseHandler.success(request, response, message, 201, record);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // }

    create = async (request: express.Request, response: express.Response) => {
        try {
            let model: FormFieldCreateModel =
                await this._validator.validateCreateRequest(request);
            const parentSectionId = request.body.ParentSectionId;
            const allFormFields = await this._service.search({
                parentSectionId,
            });

            if (allFormFields.Items.length === 0) {
                model.Sequence = 1;
            } else {
                model.Sequence = allFormFields.Items.length + 1;
            }

            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to add FormField!',
                    error
                );
            }

            const message = 'FormField added successfully!';
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
            // await this.authorize('Form.GetById', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getById(id);
            const message = 'FormField retrieved successfully!';
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

    getByTemplateId = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            // await this.authorize('Form.GetById', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(
                request,
                'templateId'
            );
            const record = await this._service.getByTemplateId(id);
            const message = 'FormFields by templateId retrived successfully!';
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
            // await this.authorize('Form.Update', request, response);
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: FormFieldUpdateModel =
                await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'FormField updated successfully!';
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
            // await this.authorize('Form.Delete', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.delete(id);
            const message = 'FormField deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: FormFieldSearchFilters =
                await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'FormField retrieved successfully!';
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
