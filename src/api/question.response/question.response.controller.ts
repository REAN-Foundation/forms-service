import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { error } from 'console';
import { QuestionResponseValidator } from './question.response.validator';
import { ResponseService } from '../../services/question.response.service';
import { QuestionResponseCreateModel, QuestionResponseUpdateModel } from '../../domain.types/forms.submission/response.domain.types';
import { QueryResponseType } from '@prisma/client';
///////////////////////////////////////////////////////////////////////////////////////

export class QuestionResponseController extends BaseController {

    //#region member variables and constructors

    _service: ResponseService = new ResponseService();

    _validator: QuestionResponseValidator = new QuestionResponseValidator();

    constructor() {
        super();
    }

    //#endregion

    getAll = async (request: express.Request, response: express.Response) => {
        try {
            const record = await this._service.allResponses();
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Form!', error);
            }
            const message = 'Response fetch successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    create = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Create', request, response);
            // const model = await this.createTypeModel(request);
            let model: QuestionResponseCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Form!', error);
            }
            const message = 'Response fetch successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    save = async (request: express.Request, response: express.Response) => {
        var responseArray: any[] = [];
        try {
            // let model = await this._validator.validateResponseRequest(request);
            let FormSubmissionId = request.body.FormSubmissionId;
            let model = request.body.Data;


            for (let key in model) {
                const questionResponseType = await this.getQuestionById(key);


                const finalModel: QuestionResponseUpdateModel = {
                    FormSubmissionId: FormSubmissionId,
                    ResponseType: questionResponseType,
                    QuestionId: key,
                    IntegerValue: null,
                    FloatValue: null,
                    BooleanValue: null,
                    DateTimeValue: null,
                    Url: null,
                    TextValue: null,
                    FileResourceId: null

                }

                if (questionResponseType === 'Integer') {
                    finalModel.IntegerValue = model[key]
                }
                if (questionResponseType === 'Float') {
                    finalModel.FloatValue = model[key]
                }
                if (questionResponseType === 'Boolean') {
                    finalModel.BooleanValue = model[key]
                }
                if (questionResponseType === 'Text') {
                    finalModel.TextValue = model[key]
                }
                if (questionResponseType === 'TextArray') {
                    finalModel.TextValue = model[key]
                }
                if (questionResponseType === 'File') {
                    finalModel.FileResourceId = model[key]
                }
                if (questionResponseType === 'Date') {
                    finalModel.DateTimeValue = model[key]
                }
                if (questionResponseType === 'DateTime') {
                    finalModel.DateTimeValue = model[key]
                }
                if (questionResponseType === 'Rating') {
                    finalModel.IntegerValue = model[key]
                }
                if (questionResponseType === 'Location') {
                    finalModel.DateTimeValue = model[key]
                }
                if (questionResponseType === 'Range') {
                    finalModel.DateTimeValue = model[key]
                }

                // for (let index = 0; index < model.length; index++) {
                //     const element = model[index];



                const record = await this._service.save(finalModel);

                if (record === null) {
                    ErrorHandler.throwInternalServerError('Unable to add response!', error);
                }
                responseArray.push(record);
            }
            const message = 'Response fetch successfully!';
            return ResponseHandler.success(request, response, message, 201, responseArray);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
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
    }


    getById = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.GetById', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'Response fetch retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Update', request, response);
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: QuestionResponseUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Response fetch updated successfully!';
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
            const message = 'Response fetch deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}

