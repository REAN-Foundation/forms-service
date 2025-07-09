import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { FormValidator } from './form.validator';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/handlers/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { FormService } from '../../services/form.submission/form.submission.service';
import { FormSubmissionCreateModel, FormSubmissionSearchFilters, FormSubmissionUpdateModel } from '../../domain.types/forms/form.submission.domain.types';
import { error } from 'console';
import { FormTemplateService } from '../../services/form.template/form.template.service';
import * as crypto from "crypto";
import { Injector } from '../../startup/injector';

///////////////////////////////////////////////////////////////////////////////////////

export class FormController extends BaseController {

    //#region member variables and constructors

    _service: FormService = Injector.Container.resolve(FormService);

    _formTemplateService = Injector.Container.resolve(FormTemplateService);

    _validator: FormValidator = new FormValidator();

    constructor() {
        super();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            let model: FormSubmissionCreateModel = await this._validator.validateCreateRequest(request);

            const template = await this._formTemplateService.getById(model.FormTemplateId);

            if (!template) {
                ErrorHandler.throwNotFoundError('Template not found!');
            }

            if (model.Title == null) {
                model.Title = template.Title;
            }

            const record = await this._service.create(model);

            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to generate form link!', error);
            }

            const formSubmissionUpdateModel: FormSubmissionUpdateModel = {};

            formSubmissionUpdateModel.Encrypted = this.generateUniqueKey(`id=${record.id}${model.UserId ? `&userId=${record.UserId}` : ''}`);

            if (!formSubmissionUpdateModel.Encrypted) {
                ErrorHandler.throwInternalServerError('Unable to generate form link!', {});
            }

            formSubmissionUpdateModel.Unencrypted = `id=${record.id}${model.UserId ? `&userId=${record.UserId}` : ''}`;
            formSubmissionUpdateModel.Link = `${process.env.BASE_URL}/form/submission/${formSubmissionUpdateModel.Encrypted}`;
            formSubmissionUpdateModel.LinkQueryParams = JSON.stringify({
                id: record.id,
                UserId: record.UserId,
                Category: model.Category,
                ExpiresOn: record.ValidTill
            });

            const updatedRecord = await this._service.update(record.id, formSubmissionUpdateModel);
            if (!updatedRecord) {
                ErrorHandler.throwInternalServerError('Unable to generate form link!', {});
            }

            const message = 'Form submission link generated successfully!';

            return ResponseHandler.success(request, response, message, 201, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            if (!record) {
                ErrorHandler.throwNotFoundError('Form not found!');
            }
            const message = 'Form retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');

            const formSubmission = await this._service.getById(id);

            if (!formSubmission) {
                ErrorHandler.throwNotFoundError('Form submission not found!');
            }

            var model: FormSubmissionUpdateModel = await this._validator.validateUpdateRequest(request);

            if (model.UserId) {
                formSubmission.LinkQueryParams.UserId = model.UserId;
                model.LinkQueryParams = JSON.stringify(formSubmission.LinkQueryParams);
            }

            const updatedRecord = await this._service.update(id, model);
            const message = 'Form updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const formSubmission = await this._service.getById(id);
            if (!formSubmission) {
                ErrorHandler.throwNotFoundError('Form submission not found!');
            }
            const result = await this._service.delete(id);
            if (!result) {
                ErrorHandler.throwNotFoundError('Form not found!');
            }
            const message = 'Form deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    submit = async (request: express.Request, response: express.Response) => {
        try {
            const SubmissionKey = await this._validator.validateSubmitRequest(request);

            const formSubmission = await this._service.search({ Encrypted: SubmissionKey });

            if (formSubmission.Items?.length !== 1) {
                ErrorHandler.throwNotFoundError('Form submission not found!');
            }

            const submission = formSubmission.Items[0];
            const id = submission?.id;

            this._validator._validateSubmission(submission);

            const record = await this._service.submit(id);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Form!', {});
            }
            const message = 'Form submission done successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: FormSubmissionSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Form retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    private generateUniqueKey = (input: string): string => {
        try {
            const privateKey = process.env.PRIVATE_KEY;
            return crypto.createHmac("sha256", privateKey)
                .update(input)
                .digest("hex");
        }
        catch (error) {
            return null;
        }

    }
}
