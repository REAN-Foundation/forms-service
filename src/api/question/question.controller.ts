import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { error } from 'console';
import { QuestionService } from '../../services/question.service';
import { QuestionValidator } from './question.validator';
import { QuestionCreateModel, QuestionSearchFilters, QuestionUpdateModel } from '../../domain.types/forms/question.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class QuestionController extends BaseController {

    //#region member variables and constructors

    _service: QuestionService = new QuestionService();

    _validator: QuestionValidator = new QuestionValidator();

    constructor() {
        super();
    }

    //#endregion

    // getAll = async (request: express.Request, response: express.Response) => {
    //     try {
    //         const record = await this._service.allQuestions();
    //         if (record === null) {
    //             ErrorHandler.throwInternalServerError('Unable to add Question!', error);
    //         }
    //         const message = 'All Questions retrived successfully!';
    //         return ResponseHandler.success(request, response, message, 201, record);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // }

    create = async (request: express.Request, response: express.Response) => {
        try {
            let model: QuestionCreateModel = await this._validator.validateCreateRequest(request);
            const parentSectionId = request.body.ParentSectionId;
            const allQuestions = await this._service.search({ parentSectionId });

            if (allQuestions.Items.length === 0) {
                model.Sequence = 1;
            } else {
                model.Sequence = allQuestions.Items.length + 1;
            }

            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Form!', error);
            }

            const message = 'Question added successfully!';
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
            const message = 'Question retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByTemplateId = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.GetById', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'templateId');
            const record = await this._service.getByTemplateId(id);
            const message = 'Questions by templateId retrived successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Update', request, response);
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: QuestionUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Question updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    updateSequence = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model = await this._validator.validateUpdateRequest(request);

            const questionRecord = await this._service.getById(id);
            const oldSeq = Number(questionRecord.Sequence);
            const newSeq = Number(model.Sequence);
            const parentSectionId = model.ParentSectionId;

            if (oldSeq < newSeq) {
                await this._service.decrementSequenceInRange(oldSeq + 1, newSeq, parentSectionId);
            } else if (oldSeq > newSeq) {
                await this._service.incrementSequenceInRange(newSeq, oldSeq - 1, parentSectionId);
            }

            const updatedRecord = await this._service.updateSequence(id, {
                ...model,
                Sequence: newSeq
            });

            ResponseHandler.success(request, response, 'Sequence updated', 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };







    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // await this.authorize('Form.Delete', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Question deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: QuestionSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Question retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}

