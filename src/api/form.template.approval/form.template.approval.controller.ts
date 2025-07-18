import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { FormTemplateApprovalValidator } from './form.template.approval.validator';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { FormTemplateApprovalService } from '../../database/services/form.template.approval.service';
import {
    FormTemplateApprovalCreateModel,
    FormTemplateApprovalSearchFilters,
    FormTemplateApprovalUpdateModel,
} from '../../domain.types/form.template.approval.domain.types';
import { Injector } from '../../startup/injector';

///////////////////////////////////////////////////////////////////////////////////////

export class FormTemplateApprovalController {
    //#region member variables and constructors

    _service: FormTemplateApprovalService = Injector.Container.resolve(
        FormTemplateApprovalService
    );
    _validator: FormTemplateApprovalValidator =
        new FormTemplateApprovalValidator();

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: FormTemplateApprovalCreateModel =
                await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to add form template approval!',
                    new Error()
                );
            }
            const message = 'Form template approval added successfully!';
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
            const message = 'Form template approval retrieved successfully!';
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
            const templateId: uuid = await this._validator.requestParamAsUUID(
                request,
                'templateId'
            );
            const record = await this._service.getByTemplateId(templateId);
            const message = 'Form template approval retrieved successfully!';
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
            const model: FormTemplateApprovalUpdateModel =
                await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Form template approval updated successfully!';
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
            const message = 'Form template approval deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: FormTemplateApprovalSearchFilters =
                await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Form template approvals retrieved successfully!';
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
