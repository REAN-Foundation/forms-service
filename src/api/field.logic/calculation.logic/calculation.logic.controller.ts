import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { CalculationLogicService } from '../../../services/field.logic/calculation.logic.service';
import { CalculationLogicValidator } from './calculation.logic.validator';
import { CalculationLogicCreateModel, CalculationLogicUpdateModel } from '../../../domain.types/forms/calculation.logic.domain.types';
import { ApiError } from '../../../common/api.error';
import { Injector } from '../../../startup/injector';
import { LogicSearchFilters } from '../../../domain.types/forms/logic.domain.types';

export class CalculationLogicController extends BaseController {
    _service: CalculationLogicService = Injector.Container.resolve(CalculationLogicService);
    _validator: CalculationLogicValidator = new CalculationLogicValidator();

    constructor() {
        super();
    }

    // Calculation Logic operations
    createCalculationLogic = async (request: express.Request, response: express.Response) => {
        try {
            const model: CalculationLogicCreateModel = await this._validator.validateCalculationLogicCreateRequest(request);
            const record = await this._service.createCalculationLogic(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to create Calculation Logic!', new Error());
            }
            const message = 'Calculation Logic created successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getCalculationLogicById = async (request: express.Request, response: express.Response) => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getCalculationLogicById(id);
            if (!record) {
                throw new ApiError('Calculation Logic not found!', 404);
            }
            const message = 'Calculation Logic retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    updateCalculationLogic = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const model: CalculationLogicUpdateModel = await this._validator.validateCalculationLogicUpdateRequest(request);
            const updatedRecord = await this._service.updateCalculationLogic(id, model);
            const message = 'Calculation Logic updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    deleteCalculationLogic = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.deleteCalculationLogic(id);
            const message = 'Calculation Logic deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchCalculationLogic = async (request: express.Request, response: express.Response) => {
        try {
            const filters: LogicSearchFilters = await this._validator.validateLogicSearchRequest(request);
            const searchResults = await this._service.searchCalculationLogic(filters);
            const message = 'Calculation Logic search completed successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

} 