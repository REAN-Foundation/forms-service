import express from 'express';
import { ResponseHandler } from '../../../common/res.handlers/response.handler';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/res.handlers/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { ValidationLogicService } from '../../../services/field.logic/validation.logic.service';
import {
    ValidationLogicCreateModel,
    ValidationLogicUpdateModel,
    LogicSearchFilters,
} from '../../../domain.types/forms/logic.domain.types';
import { ApiError } from '../../../common/api.error';
import { Injector } from '../../../startup/injector';
import { ValidationLogicValidator } from './validation.logic.validator';

export class ValidationLogicController extends BaseController {
    _service: ValidationLogicService = Injector.Container.resolve(
        ValidationLogicService
    );
    _validator: ValidationLogicValidator = new ValidationLogicValidator();

    constructor() {
        super();
    }

    // Validation Logic operations
    createValidationLogic = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const model: ValidationLogicCreateModel =
                await this._validator.validateValidationLogicCreateRequest(
                    request
                );
            const record = await this._service.createValidationLogic(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Validation Logic!',
                    new Error()
                );
            }
            const message = 'Validation Logic created successfully!';
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

    getValidationLogicById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getValidationLogicById(id);
            if (!record) {
                throw new ApiError('Validation Logic not found!', 404);
            }
            const message = 'Validation Logic retrieved successfully!';
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

    updateValidationLogic = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: ValidationLogicUpdateModel =
                await this._validator.validateValidationLogicUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.updateValidationLogic(
                id,
                model
            );
            const message = 'Validation Logic updated successfully!';
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

    deleteValidationLogic = async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.deleteValidationLogic(id);
            const message = 'Validation Logic deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchValidationLogic = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const filters: LogicSearchFilters =
                await this._validator.validateLogicSearchRequest(request);
            const searchResults =
                await this._service.searchValidationLogic(filters);
            const message = 'Validation Logic search completed successfully!';
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
