import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { FormFieldService } from '../../database/services/form.field.service';
import {
    FormFieldCreateModel,
    FormFieldSearchFilters,
    FormFieldUpdateModel,
    FormFieldResponseDto,
} from '../../domain.types/form.field.domain.types';
import { Injector } from '../../startup/injector';
import { FormFieldValidator } from './form.field.validator';
import { LogicalOperationService } from '../../database/services/logical.operation.service';
import { MathematicalOperationService } from '../../database/services/mathematical.operation.service';
import { CompositionOperationService } from '../../database/services/composition.operation.service';
import { IterateOperationService } from '../../database/services/iterate.operation.service';
import { FunctionExpressionOperationService } from '../../database/services/function.expression.operation.service';
import { OperationType } from '../../domain.types/enums/operation.enums';
import { logger } from '../../logger/logger';

///////////////////////////////////////////////////////////////////////////////////////

export class FormFieldController {
    //#region member variables and constructors

    _service: FormFieldService = Injector.Container.resolve(FormFieldService);
    _validator: FormFieldValidator = new FormFieldValidator();

    // Operation services for populating rule operations
    _logicalOperationService: LogicalOperationService = Injector.Container.resolve(LogicalOperationService);
    _mathematicalOperationService: MathematicalOperationService = Injector.Container.resolve(MathematicalOperationService);
    _compositionOperationService: CompositionOperationService = Injector.Container.resolve(CompositionOperationService);
    _iterateOperationService: IterateOperationService = Injector.Container.resolve(IterateOperationService);
    _functionExpressionOperationService: FunctionExpressionOperationService = Injector.Container.resolve(FunctionExpressionOperationService);

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            let model: FormFieldCreateModel =
                await this._validator.validateCreateRequest(request);
            const parentSectionId = request.body.ParentSectionId;
            const allFormFields = await this._service.search({
                ParentSectionId: parentSectionId,
            });

            if (allFormFields.Items.length === 0) {
                model.Sequence = 1;
            } else {
                model.Sequence = allFormFields.Items.length + 1;
            }

            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to add Form Field!',
                    new Error('Unable to add Form Field!')
                );
            }

            const message = 'Form Field added successfully!';
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
            // await this.authorize('Form.GetById', request, response);
            var id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getById(id);

            // Populate operations for rules in the controller
            if (record) {
                await this.populateRuleOperations(record);
            }

            const message = 'Form Field retrieved successfully!';
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

    getByTemplateId = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            // await this.authorize('Form.GetById', request, response);
            var id: uuid = await this._validator.requestParamAsUUID(
                request,
                'templateId'
            );
            const records = await this._service.getByTemplateId(id);

            // Populate operations for rules for each form field
            if (records && Array.isArray(records)) {
                for (const record of records) {
                    await this.populateRuleOperations(record);
                }
            }

            const message = 'Form Fields by templateId retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                records
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Update', request, response);
            const id = await this._validator.requestParamAsUUID(request, 'id');
            var model: FormFieldUpdateModel =
                await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);

            // Populate operations for rules in the updated record
            if (updatedRecord) {
                await this.populateRuleOperations(updatedRecord);
            }

            const message = 'Form Field updated successfully!';
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
            // await this.authorize('Form.Delete', request, response);
            var id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.delete(id);
            const message = 'Form Field deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: FormFieldSearchFilters =
                await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);

            // Populate operations for rules for each form field in search results
            if (searchResults && searchResults.Items) {
                for (const item of searchResults.Items) {
                    await this.populateRuleOperations(item);
                }
            }

            const message = 'Form Fields retrieved successfully!';
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

    //#region Private Helper Methods

    /**
     * Helper method to populate operations for all rules in a form field
     */
    private async populateRuleOperations(formField: FormFieldResponseDto): Promise<void> {
        try {
            // Populate operations for Skip Logic rules
            if (formField.SkipLogic?.Rules) {
                for (const rule of formField.SkipLogic.Rules) {
                    if (rule.OperationType && rule.OperationId) {
                        rule.Operation = await this.getOperationByTypeAndId(rule.OperationType, rule.OperationId);
                    }
                }
            }

            // Populate operations for Calculate Logic rules
            if (formField.CalculateLogic?.Rules) {
                for (const rule of formField.CalculateLogic.Rules) {
                    if (rule.OperationType && rule.OperationId) {
                        rule.Operation = await this.getOperationByTypeAndId(rule.OperationType, rule.OperationId);
                    }
                }
            }

            // Populate operations for Validate Logic rules
            if (formField.ValidateLogic?.Rules) {
                for (const rule of formField.ValidateLogic.Rules) {
                    if (rule.OperationType && rule.OperationId) {
                        rule.Operation = await this.getOperationByTypeAndId(rule.OperationType, rule.OperationId);
                    }
                }
            }
        } catch (error) {
            logger.error(`❌ Error populating rule operations: ${error.message}`);
            // Don't throw error, just log it to avoid breaking the main response
        }
    }

    /**
     * Helper method to fetch operation by type and id
     */
    private async getOperationByTypeAndId(operationType: OperationType, operationId: string): Promise<any> {
        try {
            switch (operationType) {
                case OperationType.Logical:
                    return await this._logicalOperationService.getById(operationId);

                case OperationType.Mathematical:
                    return await this._mathematicalOperationService.getById(operationId);

                case OperationType.Composition:
                    return await this._compositionOperationService.getById(operationId);

                case OperationType.Iterate:
                    return await this._iterateOperationService.getById(operationId);

                case OperationType.FunctionExpression:
                    return await this._functionExpressionOperationService.getById(operationId);

                default:
                    logger.warn(`❌ Unknown operation type: ${operationType}`);
                    return null;
            }
        } catch (error) {
            logger.error(`❌ Error fetching operation ${operationId} of type ${operationType}: ${error.message}`);
            return null;
        }
    }

    //#endregion
}
