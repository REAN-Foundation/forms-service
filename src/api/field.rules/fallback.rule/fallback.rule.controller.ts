import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { FallbackRuleService } from '../../../database/services/fallback.rule.service';
import { FallbackRuleValidator } from './fallback.rule.validator';
import {
    FallbackRuleCreateModel,
    FallbackRuleUpdateModel,
    FallbackRuleSearchFilters,
} from '../../../domain.types/rules/fallback.rule.domain.types';
import { Injector } from '../../../startup/injector';

///////////////////////////////////////////////////////////////////////////////////////

export class FallbackRuleController {
    //#region member variables and constructors

    _service: FallbackRuleService = Injector.Container.resolve(
        FallbackRuleService
    );
    _validator: FallbackRuleValidator = new FallbackRuleValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: FallbackRuleCreateModel =
                await this._validator.validateFallbackRuleCreateRequest(
                    request
                );
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Fallback Rule!',
                );
            }
            const message = 'Fallback Rule created successfully!';
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
            if (!record) {
                ErrorHandler.throwNotFoundError('Fallback Rule not found!');
            }
            const message = 'Fallback Rule retrieved successfully!';
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
            const model: FallbackRuleUpdateModel =
                await this._validator.validateFallbackRuleUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.update(
                id,
                model
            );
            const message = 'Fallback Rule updated successfully!';
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
            const message = 'Fallback Rule deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: FallbackRuleSearchFilters =
                await this._validator.validateRuleSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Fallback Rule search completed successfully!';
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
