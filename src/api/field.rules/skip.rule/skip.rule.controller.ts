import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { SkipRuleService } from '../../../database/services/skip.rule.service';
import { SkipRuleValidator } from './skip.rule.validator';
import {
    SkipRuleCreateModel,
    SkipRuleUpdateModel,
    SkipRuleSearchFilters,
} from '../../../domain.types/rules/skip.rule.domain.types';
import { Injector } from '../../../startup/injector';

///////////////////////////////////////////////////////////////////////////////////////

export class SkipRuleController {
    //#region member variables and constructors

    _service: SkipRuleService = Injector.Container.resolve(SkipRuleService);
    
    _validator: SkipRuleValidator = new SkipRuleValidator();
    
    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: SkipRuleCreateModel =
                await this._validator.validateSkipRuleCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Skip Rule!',
                );
            }
            const message = 'Skip Rule created successfully!';
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
                ErrorHandler.throwNotFoundError('Skip Rule not found!');
            }
            const message = 'Skip Rule retrieved successfully!';
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
            const model: SkipRuleUpdateModel =
                await this._validator.validateSkipRuleUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Skip Rule updated successfully!';
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
            const message = 'Skip Rule deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: SkipRuleSearchFilters =
                await this._validator.validateRuleSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Skip Rule search completed successfully!';
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
