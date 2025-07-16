import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { CalculationRuleService } from '../../../services/field.rules/calculation.rule.service';
import { CalculationRuleValidator } from './calculation.rule.validator';
import {
    CalculationRuleCreateModel,
    CalculationRuleUpdateModel,
    RuleSearchFilters,
} from '../../../domain.types/forms/rule.domain.types';
import { ApiError } from '../../../common/api.error';
import { Injector } from '../../../startup/injector';

export class CalculationRuleController extends BaseController {
    _service: CalculationRuleService = Injector.Container.resolve(
        CalculationRuleService
    );
    _validator: CalculationRuleValidator = new CalculationRuleValidator();

    constructor() {
        super();
    }

    // Calculation Rule operations
    createCalculationRule = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const model: CalculationRuleCreateModel =
                await this._validator.validateCalculationRuleCreateRequest(
                    request
                );
            const record = await this._service.createCalculationRule(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Calculation Rule!',
                    new Error()
                );
            }
            const message = 'Calculation Rule created successfully!';
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

    getCalculationRuleById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getCalculationRuleById(id);
            if (!record) {
                throw new ApiError('Calculation Rule not found!', 404);
            }
            const message = 'Calculation Rule retrieved successfully!';
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

    updateCalculationRule = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: CalculationRuleUpdateModel =
                await this._validator.validateCalculationRuleUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.updateCalculationRule(
                id,
                model
            );
            const message = 'Calculation Rule updated successfully!';
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

    deleteCalculationRule = async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.deleteCalculationRule(id);
            const message = 'Calculation Rule deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchCalculationRule = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const filters: RuleSearchFilters =
                await this._validator.validateRuleSearchRequest(request);
            const searchResults =
                await this._service.searchCalculationRule(filters);
            const message = 'Calculation Rule search completed successfully!';
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
