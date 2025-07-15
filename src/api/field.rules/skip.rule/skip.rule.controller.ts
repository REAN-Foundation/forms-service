import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { SkipRuleService } from '../../../services/field.rules/skip.rule.service';
import { SkipRuleValidator } from './skip.rule.validator';
import { SkipRuleCreateModel, SkipRuleUpdateModel, RuleSearchFilters } from '../../../domain.types/forms/rule.domain.types';
import { ApiError } from '../../../common/api.error';
import { Injector } from '../../../startup/injector';

export class SkipRuleController extends BaseController {
    _service: SkipRuleService = Injector.Container.resolve(SkipRuleService);
    _validator: SkipRuleValidator = new SkipRuleValidator();

    constructor() {
        super();
    }

    // Skip Rule operations
    createSkipRule = async (request: express.Request, response: express.Response) => {
        try {
            const model: SkipRuleCreateModel = await this._validator.validateSkipRuleCreateRequest(request);
            const record = await this._service.createSkipRule(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to create Skip Rule!', new Error());
            }
            const message = 'Skip Rule created successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getSkipRuleById = async (request: express.Request, response: express.Response) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getSkipRuleById(id);
            if (!record) {
                throw new ApiError('Skip Rule not found!', 404);
            }
            const message = 'Skip Rule retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    updateSkipRule = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: SkipRuleUpdateModel = await this._validator.validateSkipRuleUpdateRequest(request);
            const updatedRecord = await this._service.updateSkipRule(id, model);
            const message = 'Skip Rule updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    deleteSkipRule = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.deleteSkipRule(id);
            const message = 'Skip Rule deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchSkipRule = async (request: express.Request, response: express.Response) => {
        try {
            const filters: RuleSearchFilters = await this._validator.validateRuleSearchRequest(request);
            const searchResults = await this._service.searchSkipRule(filters);
            const message = 'Skip Rule search completed successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

} 