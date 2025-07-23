import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { FormFieldService } from '../../database/services/form.field.service';
import {
    FormFieldCreateModel,
    FormFieldSearchFilters,
    FormFieldUpdateModel,
} from '../../domain.types/form.field.domain.types';
import { Injector } from '../../startup/injector';
import { FormFieldValidator } from './form.field.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class FormFieldController {
    //#region member variables and constructors

    _service: FormFieldService = Injector.Container.resolve(FormFieldService);

    _validator: FormFieldValidator = new FormFieldValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            let model: FormFieldCreateModel =
                await this._validator.validateCreateRequest(request);
            const parentSectionId = request.body.ParentSectionId;
            const allFormFields = await this._service.search({
                ParentSectionId: parentSectionId,
            });

            if (allFormFields.Items.length === 0) {
                model.Sequence = 1;
            } else {
                model.Sequence = allFormFields.Items.length + 1;
            }

            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to add Form Field!',
                    new Error('Unable to add Form Field!')
                );
            }

            const message = 'Form Field added successfully!';
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
            var id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getById(id);
            const message = 'Form Field retrieved successfully!';
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
            var id: uuid = await this._validator.requestParamAsUUID(
                request,
                'templateId'
            );
            const record = await this._service.getByTemplateId(id);
            const message = 'Form Fields by templateId retrieved successfully!';
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
            const id = await this._validator.requestParamAsUUID(request, 'id');
            var model: FormFieldUpdateModel =
                await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Form Field updated successfully!';
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
            var id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.delete(id);
            const message = 'Form Field deleted successfully!';
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
            const message = 'Form Fields retrieved successfully!';
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
