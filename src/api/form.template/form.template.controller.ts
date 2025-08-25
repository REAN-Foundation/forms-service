import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { FormTemplateValidator } from './form.template.validator';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { FormTemplateService } from '../../database/services/form.template.service';
import {
    FormTemplateCreateModel,
    FormTemplateSearchFilters,
    FormTemplateUpdateModel,
} from '../../domain.types/form.template.domain.types';
import { FormSectionService } from '../../database/services/form.section.service';
import { generateDisplayCode } from '../../domain.types/miscellaneous/display.code';
import { Helper } from '../../domain.types/miscellaneous/helper';
import fs from 'fs';
import { Injector } from '../../startup/injector';
import { LogicalOperationService } from '../../database/services/logical.operation.service';
import { MathematicalOperationService } from '../../database/services/mathematical.operation.service';
import { CompositionOperationService } from '../../database/services/composition.operation.service';
import { IterateOperationService } from '../../database/services/iterate.operation.service';
import { FunctionExpressionOperationService } from '../../database/services/function.expression.operation.service';
import { OperationType } from '../../domain.types/enums/operation.enums';
import { logger } from '../../logger/logger';

///////////////////////////////////////////////////////////////////////////////////////

export class FormTemplateController {
    //#region member variables and constructors

    _service: FormTemplateService =
        Injector.Container.resolve(FormTemplateService);

    _section: FormSectionService =
        Injector.Container.resolve(FormSectionService);

    _validator: FormTemplateValidator = new FormTemplateValidator();

    // Operation services for populating rule operations
    _logicalOperationService: LogicalOperationService = Injector.Container.resolve(LogicalOperationService);
    _mathematicalOperationService: MathematicalOperationService = Injector.Container.resolve(MathematicalOperationService);
    _compositionOperationService: CompositionOperationService = Injector.Container.resolve(CompositionOperationService);
    _iterateOperationService: IterateOperationService = Injector.Container.resolve(IterateOperationService);
    _functionExpressionOperationService: FunctionExpressionOperationService = Injector.Container.resolve(FunctionExpressionOperationService);

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            let model: FormTemplateCreateModel =
                await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to add Form!',
                    new Error('Unable to add Form!')
                );
            }

            const displayCode = generateDisplayCode(25, 'SECTION_#');
            const sectionModel = {
                ParentFormTemplateId: record.id,
                SectionIdentifier: 'Root Section',
                Title: 'Assessment Root Section',
                Description:
                    'This is root section for this template Description',
                DisplayCode: displayCode,
                // Sequence: 'A1'
                Sequence: 1,
            };
            const section = await this._section.create(sectionModel);
            const message = 'Form template added successfully!';
            let templateModel = {
                RootSectionId: section.id,
            };
            const rec = await this._service.update(record.id, templateModel);
            return ResponseHandler.success(
                request,
                response,
                message,
                201,
                rec
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getById(id);
            const message = 'Form template retrieved successfully!';
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

    getDetailsById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            var formTemplateId: uuid =
                await this._validator.requestParamAsUUID(request, 'id');
            const isRecordExists = await this._service.getById(formTemplateId);
            if (!isRecordExists) {
                throw new Error('Cannot find form template!');
            }
            const record = await this._service.getDetailsById(formTemplateId);

            const message =
                'Form template and its data retrieved successfully!';
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
            var model: FormTemplateUpdateModel =
                await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Form templated updated successfully!';
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
            var id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.delete(id);
            const message = 'Form template deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    submissions = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.submissions(id);
            const message = 'Form retrieved successfully!';
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

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: FormTemplateSearchFilters =
                await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Form template retrieved successfully!';
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
     * Helper method to populate operations for all form fields in form sections
     */
    private async populateFormFieldsOperations(sections: any[]): Promise<void> {
        try {
            for (const section of sections) {
                // Populate operations for form fields in current section
                if (section.FormFields && Array.isArray(section.FormFields)) {
                    for (const formField of section.FormFields) {
                        await this.populateFormFieldOperations(formField);
                    }
                }

                // Recursively populate operations for subsections
                if (section.Subsections && Array.isArray(section.Subsections)) {
                    await this.populateFormFieldsOperations(section.Subsections);
                }
            }
        } catch (error) {
            logger.error(`❌ Error populating form fields operations: ${error.message}`);
            // Don't throw error, just log it to avoid breaking the main response
        }
    }

    /**
     * Helper method to populate operations for a single form field
     */
    private async populateFormFieldOperations(formField: any): Promise<void> {
        try {
            // Populate operations for Skip Logic rules
            if (formField.SkipLogic?.Rules) {
                for (const rule of formField.SkipLogic.Rules) {
                    if (rule.OperationType && rule.BaseOperationId) {
                        rule.Operation = await this.getOperationByTypeAndId(rule.OperationType, rule.BaseOperationId);
                    }
                }
            }

            // Populate operations for Calculate Logic rules
            if (formField.CalculateLogic?.Rules) {
                for (const rule of formField.CalculateLogic.Rules) {
                    if (rule.OperationType && rule.BaseOperationId) {
                        rule.Operation = await this.getOperationByTypeAndId(rule.OperationType, rule.BaseOperationId);
                    }
                }
            }

            // Populate operations for Validate Logic rules
            if (formField.ValidateLogic?.Rules) {
                for (const rule of formField.ValidateLogic.Rules) {
                    if (rule.OperationType && rule.BaseOperationId) {
                        rule.Operation = await this.getOperationByTypeAndId(rule.OperationType, rule.BaseOperationId);
                    }
                }
            }
        } catch (error) {
            logger.error(`❌ Error populating form field operations: ${error.message}`);
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
                    const compositionOp = await this._compositionOperationService.getById(operationId);
                    if (compositionOp && compositionOp.Children) {
                        // Expand composition operation children from string to array
                        const expandedChildren = await this.expandCompositionChildren(compositionOp.Children);
                        return {
                            ...compositionOp,
                            Children: expandedChildren
                        };
                    }
                    return compositionOp;

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

    /**
     * Helper method to expand composition operation children from JSON string to array of operation DTOs
     */
    private async expandCompositionChildren(childrenString: string): Promise<any[]> {
        try {
            if (!childrenString) {
                return [];
            }

            const childrenIds = JSON.parse(childrenString);
            if (!Array.isArray(childrenIds)) {
                return [];
            }

            const expandedChildren = [];
            for (const childId of childrenIds) {
                try {
                    // Try to get the operation by ID (try different types)
                    const logicalOp = await this._logicalOperationService.getById(childId);
                    if (logicalOp) {
                        expandedChildren.push(logicalOp);
                    } else {
                        const mathematicalOp = await this._mathematicalOperationService.getById(childId);
                        if (mathematicalOp) {
                            expandedChildren.push(mathematicalOp);
                        } else {
                            const compositionOp = await this._compositionOperationService.getById(childId);
                            if (compositionOp) {
                                // Recursively expand nested composition operations
                                if (compositionOp.Children) {
                                    const expandedNestedChildren = await this.expandCompositionChildren(compositionOp.Children);
                                    compositionOp.Children = expandedNestedChildren as any;
                                }
                                expandedChildren.push(compositionOp);
                            } else {
                                const iterateOp = await this._iterateOperationService.getById(childId);
                                if (iterateOp) {
                                    expandedChildren.push(iterateOp);
                                } else {
                                    const functionOp = await this._functionExpressionOperationService.getById(childId);
                                    if (functionOp) {
                                        expandedChildren.push(functionOp);
                                    }
                                }
                            }
                        }
                    }
                } catch (error) {
                    logger.error(`❌ Error expanding child operation ${childId}: ${error.message}`);
                }
            }

            return expandedChildren;
        } catch (error) {
            logger.error(`❌ Error expanding composition children: ${error.message}`);
            return [];
        }
    }

    //#endregion
}
