import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { CalculationLogicService } from '../../../database/services/calculation.logic.service';
import { CalculationLogicValidator } from './calculation.logic.validator';
import {
    CalculationLogicCreateModel,
    CalculationLogicSearchFilters,
    CalculationLogicUpdateModel,
} from '../../../domain.types/logic/calculation.logic.domain.types';
import { Injector } from '../../../startup/injector';

///////////////////////////////////////////////////////////////////////////////////////

export class CalculationLogicController {
    _service: CalculationLogicService = Injector.Container.resolve(
        CalculationLogicService
    );
    _validator: CalculationLogicValidator = new CalculationLogicValidator();

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: CalculationLogicCreateModel =
                await this._validator.validateCalculationLogicCreateRequest(
                    request
                );
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to create Calculation Logic!',
                );
            }
            const message = 'Calculation Logic created successfully!';
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
                ErrorHandler.throwNotFoundError('Calculation Logic not found!');
            }
            const message = 'Calculation Logic retrieved successfully!';
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
            const model: CalculationLogicUpdateModel =
                await this._validator.validateCalculationLogicUpdateRequest(
                    request
                );
            const updatedRecord = await this._service.update(
                id,
                model
            );
            const message = 'Calculation Logic updated successfully!';
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
            const message = 'Calculation Logic deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: CalculationLogicSearchFilters =
                await this._validator.validateCalculationLogicSearchRequest(request);
            const searchResults =
                await this._service.search(filters);
            const message = 'Calculation Logic search completed successfully!';
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
