import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';

import { QuestionResponseValidator } from './question.response.validator';
import { ResponseService } from '../../database/services/question.response.service';
import {
    QuestionResponseCreateModel,
    QuestionResponseSaveModel,
    QuestionResponseSearchFilters,
    QuestionResponseUpdateModel,
} from '../../domain.types/response.domain.types';
import { QueryResponseType } from '../../domain.types/query.response.types';
import { FormService } from '../../database/services/form.submission.service';
import { FormStatus } from '../../domain.types/form.submission.enums';
import { Injector } from '../../startup/injector';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////

export class QuestionResponseController {
    //#region member variables and constructors

    _service: ResponseService = Injector.Container.resolve(ResponseService);

    _formService: FormService = Injector.Container.resolve(FormService);

    _validator: QuestionResponseValidator = new QuestionResponseValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Create', request, response);
            // const model = await this.createTypeModel(request);
            let model: QuestionResponseCreateModel =
                await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to add Form!',

                );
            }
            const message = 'Response added successfully!';
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

    save = async (request: express.Request, response: express.Response) => {
        try {
            let model: QuestionResponseSaveModel =
                await this._validator.validateSaveRequest(request);

            const searchResult = await this._formService.search({
                Encrypted: model.FormSubmissionKey,
            });

            if (searchResult?.Items?.length !== 1) {
                ErrorHandler.throwNotFoundError('Form submission not found!');
            }

            const formSubmissionId = searchResult?.Items[0]?.id;

            this._validator.validateSubmission(searchResult?.Items[0]);

            for (let questionResponse in model.QuestionResponses) {
                await this.recordResponses(
                    model.QuestionResponses[questionResponse]
                );
            }

            const update = await this._formService.update(formSubmissionId, {
                Status: FormStatus.InProgress,
            });

            if (!update) {
                ErrorHandler.throwInternalServerError(
                    'Unable to update form submission!',

                );
            }

            const message = 'Response saved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                201,
                null
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    private recordResponses = async (model: QuestionResponseUpdateModel) => {
        try {
            if (model.id) {
                await this._service.update(model.id, model);
            } else {
                const createModel: QuestionResponseCreateModel = {
                    FormSubmissionId: model.FormSubmissionId,
                    QuestionId: model.QuestionId,
                    ResponseType: model.ResponseType,
                    IntegerValue: model.IntegerValue,
                    FloatValue: model.FloatValue,
                    BooleanValue: model.BooleanValue,
                    DateTimeValue: model.DateTimeValue,
                    Url: model.Url,
                    FileResourceId: model.FileResourceId,
                    TextValue: model.TextValue,
                    UserResponse: model.UserResponse ?? null,
                };
                await this._service.create(createModel);
            }
        } catch (error) {
            console.log(`Errror in save Response ${model}:`, error);
        }
    };
    
    getQuestionById = async (id: uuid) => {
        // try {
        const question = await this._service.getQuestionById(id);
        // if (question === null) {
        //     ErrorHandler.throwInternalServerError('Question Not found..?', error);
        // }
        const type: QueryResponseType = question.ResponseType;
        return type;
        // } catch (error) {
        // return "Question Not found..?"
        // }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.GetById', request, response);
            var id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getById(id);
            const message = 'Response fetch successfully!';
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
            var model: QuestionResponseUpdateModel =
                await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Response updated successfully!';
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
            const message = 'Response deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: QuestionResponseSearchFilters =
                await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Responses retrieved successfully!';
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
