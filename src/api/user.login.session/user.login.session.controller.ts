import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { error } from 'console';
import { UserLoginSessionService } from '../../services/user.login.session';
import { UserLoginSessionValidator } from './user.login.session.validor';
import { UserLoginSessionCreateModel, UserLoginSessionUpdateModel } from '../../domain.types/forms/user.login.session.domain.types';

///////////////////////////////////////////////////////////////////////////////////////
export class UserLoginSessionController extends BaseController {

    //#region member variables and constructors

    _service: UserLoginSessionService = new UserLoginSessionService();

    _validator: UserLoginSessionValidator = new UserLoginSessionValidator();

    constructor() {
        super();
    }

    //#endregion

    getAll = async (request: express.Request, response: express.Response) => {
        try {
            const record = await this._service.allUserLoginSessions();
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add user!', error);
            }
            const message = 'User created successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    create = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Create', request, response);
            let model: UserLoginSessionCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to update record!', error);
            }
            const message = 'User updated successfully!';
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
            const message = 'User retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Update', request, response);
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: UserLoginSessionUpdateModel = await this._validator.validateUpdateRequest(request);
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
}
