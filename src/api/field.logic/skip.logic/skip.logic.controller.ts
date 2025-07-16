import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { SkipLogicService } from '../../../services/field.logic/skip.logic.service';
import { SkipLogicValidator } from './skip.logic.validator';
import {
    SkipLogicCreateModel,
    SkipLogicUpdateModel,
    LogicSearchFilters,
} from '../../../domain.types/forms/logic.domain.types';
import { ApiError } from '../../../common/api.error';
import { Injector } from '../../../startup/injector';

export class SkipLogicController extends BaseController {
    _service: SkipLogicService = Injector.Container.resolve(SkipLogicService);
    _validator: SkipLogicValidator = new SkipLogicValidator();

    constructor() {
        super();
    }

    // Skip Logic operations
    createSkipLogic = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const model: SkipLogicCreateModel =
                await this._validator.validateSkipLogicCreateRequest(request);
            const record = await this._service.createSkipLogic(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Skip Logic!',
                    new Error()
                );
            }
            const message = 'Skip Logic created successfully!';
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

    getSkipLogicById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getSkipLogicById(id);
            if (!record) {
                throw new ApiError('Skip Logic not found!', 404);
            }
            const message = 'Skip Logic retrieved successfully!';
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

    updateSkipLogic = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: SkipLogicUpdateModel =
                await this._validator.validateSkipLogicUpdateRequest(request);
            const updatedRecord = await this._service.updateSkipLogic(
                id,
                model
            );
            const message = 'Skip Logic updated successfully!';
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

    deleteSkipLogic = async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.deleteSkipLogic(id);
            const message = 'Skip Logic deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchSkipLogic = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const filters: LogicSearchFilters =
                await this._validator.validateLogicSearchRequest(request);
            const searchResults = await this._service.searchSkipLogic(filters);
            const message = 'Skip Logic search completed successfully!';
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
