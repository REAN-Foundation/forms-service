import express from 'express';
import { ResponseHandler } from '../../../common/res.handlers/response.handler';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/res.handlers/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { ValidationRuleService } from '../../../services/field.rules/validation.rule.service';
import { ValidationRuleValidator } from './validation.rule.validator';
import {
    ValidationRuleCreateModel,
    ValidationRuleUpdateModel,
    RuleSearchFilters,
} from '../../../domain.types/forms/rule.domain.types';
import { ApiError } from '../../../common/api.error';
import { Injector } from '../../../startup/injector';

export class ValidationRuleController extends BaseController {
    _service: ValidationRuleService = Injector.Container.resolve(
        ValidationRuleService
    );
    _validator: ValidationRuleValidator = new ValidationRuleValidator();

    constructor() {
        super();
    }

    // Validation Rule operations
    createValidationRule = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const model: ValidationRuleCreateModel =
                await this._validator.validateValidationRuleCreateRequest(
                    request
                );
            const record = await this._service.createValidationRule(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Validation Rule!',
                    new Error()
                );
            }
            const message = 'Validation Rule created successfully!';
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

    getValidationRuleById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getValidationRuleById(id);
            if (!record) {
                throw new ApiError('Validation Rule not found!', 404);
            }
            const message = 'Validation Rule retrieved successfully!';
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

    updateValidationRule = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: ValidationRuleUpdateModel =
                await this._validator.validateValidationRuleUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.updateValidationRule(
                id,
                model
            );
            const message = 'Validation Rule updated successfully!';
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

    deleteValidationRule = async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.deleteValidationRule(id);
            const message = 'Validation Rule deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchValidationRule = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const filters: RuleSearchFilters =
                await this._validator.validateRuleSearchRequest(request);
            const searchResults =
                await this._service.searchValidationRule(filters);
            const message = 'Validation Rule search completed successfully!';
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
