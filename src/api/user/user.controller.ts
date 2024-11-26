import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { UserValidator } from './user.validator';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { error } from 'console';
import { UserCreateModel, UserSearchFilters, UserUpdateModel } from '../../domain.types/forms/user.domain.types';
import { UserService } from '../../services/user.service';

///////////////////////////////////////////////////////////////////////////////////////

export class UserController extends BaseController {

    //#region member variables and constructors

    _service: UserService = new UserService();

    _validator: UserValidator = new UserValidator();

    constructor() {
        super();
    }

    //#endregion

    getAll = async (request: express.Request, response: express.Response) => {
        try {
            const record = await this._service.allUsers();
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add user!', error);
            }
            const message = 'Fetch all users successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    create = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Create', request, response);
            let model: UserCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to update record!', error);
            }
            const message = 'User created successfully!';
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
            var model: UserUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'User updated successfully!';
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
            const message = 'User deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
    // getByTemplateId = async (request: express.Request, response: express.Response) => {
    //     try {
    //         // await this.authorize('Form.GetById', request, response);
    //         var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
    //         const record = await this._service.getByTemplateId(id);
    //         const message = 'Form retrieved successfully!';
    //         return ResponseHandler.success(request, response, message, 200, record);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };

    // submit = async (request: express.Request, response: express.Response) => {
    //     try {
    //         // await this.authorize('Form.Create', request, response);
    //         var model: UserCreateModel = await this._validator.validateCreateRequest(request);
    //         const record = await this._service.submit(model);
    //         if (record === null) {
    //             ErrorHandler.throwInternalServerError('Unable to add Form!', error);
    //         }
    //         const message = 'Form added successfully!';
    //         return ResponseHandler.success(request, response, message, 201, record);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: UserSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'User retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
