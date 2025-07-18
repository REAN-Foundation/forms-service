import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { CalculationRuleService } from '../../../database/services/calculation.rule.service';
import { CalculationRuleValidator } from './calculation.rule.validator';
import {
    CalculationRuleCreateModel,
    CalculationRuleUpdateModel,
    CalculationRuleSearchFilters,
} from '../../../domain.types/rules/calculation.rule.domain.types';
import { Injector } from '../../../startup/injector';

///////////////////////////////////////////////////////////////////////////////////////

export class CalculationRuleController {
    //#region member variables and constructors

    _service: CalculationRuleService = Injector.Container.resolve(
        CalculationRuleService
    );
    _validator: CalculationRuleValidator = new CalculationRuleValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: CalculationRuleCreateModel =
                await this._validator.validateCalculationRuleCreateRequest(
                    request
                );
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Calculation Rule!',
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

    getById = async (request: express.Request, response: express.Response) => {
        try {
            const id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getById(id);
            if (!record) {
                ErrorHandler.throwNotFoundError('Calculation Rule not found!');
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

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            const model: CalculationRuleUpdateModel =
                await this._validator.validateCalculationRuleUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.update(
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
            const message = 'Calculation Rule deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: CalculationRuleSearchFilters =
                await this._validator.validateRuleSearchRequest(request);
            const searchResults = await this._service.search(filters);
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
