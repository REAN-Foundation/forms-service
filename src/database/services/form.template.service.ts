import {
    ExportFormTemplateDto,
    FormTemplateCreateModel,
    FormTemplateResponseDto,
    FormTemplateSearchFilters,
    FormTemplateUpdateModel,
    FormTemplateSearchResults,
} from '../../domain.types/form.template.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, IsNull, Repository } from 'typeorm';
import { FormTemplate } from '../models/form.template/form.template.model';
import { FormTemplateMapper } from '../mappers/form.template.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { Injector } from '../../startup/injector';
import { LogicalOperationService } from './logical.operation.service';
import { MathematicalOperationService } from './mathematical.operation.service';
import { CompositionOperationService } from './composition.operation.service';
import { IterateOperationService } from './iterate.operation.service';
import { FunctionExpressionOperationService } from './function.expression.operation.service';
import { OperationType } from '../../domain.types/enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormTemplateService extends BaseService {

    _formTemplateRepository: Repository<FormTemplate> = Source.getRepository(FormTemplate);

    // Operation services for expanding composition children
    _logicalOperationService: LogicalOperationService = Injector.Container.resolve(LogicalOperationService);
    _mathematicalOperationService: MathematicalOperationService = Injector.Container.resolve(MathematicalOperationService);
    _compositionOperationService: CompositionOperationService = Injector.Container.resolve(CompositionOperationService);
    _iterateOperationService: IterateOperationService = Injector.Container.resolve(IterateOperationService);
    _functionExpressionOperationService: FunctionExpressionOperationService = Injector.Container.resolve(FunctionExpressionOperationService);

    // Form Template operations
    public create = async (createModel: FormTemplateCreateModel)
        : Promise<FormTemplateResponseDto> => {

        const template = this._formTemplateRepository.create({
            Title: createModel.Title,
            Description: createModel.Description,
            Version: createModel.CurrentVersion ?? 1,
            TenantId: createModel.TenantCode,
            Type: createModel.Type,
            DisplayCode: createModel.DisplayCode,
            OwnerUserId: createModel.OwnerUserId,
            RootSectionId: createModel.RootSectionId,
            DefaultSectionNumbering: createModel.DefaultSectionNumbering,
        });
        const record = await this._formTemplateRepository.save(template);

        return FormTemplateMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<FormTemplateResponseDto> => {
        try {
            const template = await this._formTemplateRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    FormSections: {
                        FormFields: {
                            SkipLogic: {
                                Rules: {
                                    FallbackRule: true,
                                },
                            },
                            CalculateLogic: {
                                Rules: {
                                    FallbackRule: true,
                                },
                            },
                            ValidateLogic: {
                                Rules: {
                                    FallbackRule: true,
                                },
                            },
                        },
                    },
                    FormFields: {
                        SkipLogic: {
                            Rules: {
                                FallbackRule: true,
                            },
                        },
                        CalculateLogic: {
                            Rules: {
                                FallbackRule: true,
                            },
                        },
                        ValidateLogic: {
                            Rules: {
                                FallbackRule: true,
                            },
                        },
                    },
                    FormSubmissions: true,
                }
            });

            return FormTemplateMapper.toDto(template);
        } catch (error) {
            logger.error(`❌ Error getting form template by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getDetailsById = async (id: string): Promise<any> => {
        try {
            const template = await this._formTemplateRepository.findOne({
                where: {
                    id: id,
                    DeletedAt: IsNull(),
                },
                relations: {
                    FormSections: {
                        FormFields: {
                            SkipLogic: {
                                Rules: {
                                    FallbackRule: true,
                                },
                            },
                            CalculateLogic: {
                                Rules: {
                                    FallbackRule: true,
                                },
                            },
                            ValidateLogic: {
                                Rules: {
                                    FallbackRule: true,
                                },
                            },
                        },
                        // FormTemplate: true,
                    },
                },
                order: {
                    FormSections: {
                        CreatedAt: "ASC",
                        FormFields: {
                            CreatedAt: "ASC",
                        },
                    },
                },
            });

            if (template && template.FormSections) {
                template.FormSections = template.FormSections.filter(
                    (section) => section.DeletedAt === null
                );

                template.FormSections.forEach((section) => {
                    if (section.FormFields) {
                        section.FormFields = section.FormFields.filter(
                            (question) => question.DeletedAt === null
                        );
                    }
                });
            }

            const subsections = await this.mapSections(template.FormSections);
            template.FormSections = subsections;

            // Populate operations for all form fields
            await this.populateFormFieldsOperations(template.FormSections);

            return template;
        } catch (error) {
            logger.error(`❌ Error getting form template details by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    private mapSections = async (sections: any[]) => {
        const sectionMap = new Map();

        // Initialize sections and assign an empty array for Subsections
        sections.forEach((section) => {
            sectionMap.set(section.id, { ...section, Subsections: [] });
        });

        const rootSections: any[] = [];

        // Assign subsections to their respective parents
        sections.forEach((section) => {
            if (section.ParentSectionId !== null) {
                const parent = sectionMap.get(section.ParentSectionId);
                if (parent) {
                    parent.Subsections.push(sectionMap.get(section.id));
                }
            } else {
                rootSections.push(sectionMap.get(section.id));
            }
        });

        return rootSections;
    };

    public submissions = async (id: string): Promise<FormTemplateResponseDto[]> => {
        try {
            const templates = await this._formTemplateRepository.find({
                where: {
                    id: id
                },
                relations: {
                    FormSubmissions: true,
                }
            });

            return templates.map(template => FormTemplateMapper.toDto(template));
        } catch (error) {
            logger.error(`❌ Error getting template submissions: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: FormTemplateSearchFilters)
        : Promise<FormTemplateSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._formTemplateRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => FormTemplateMapper.toDto(x)) as any,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching form templates: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: FormTemplateUpdateModel)
        : Promise<FormTemplateResponseDto> => {
        try {
            const template = await this._formTemplateRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!template) {
                ErrorHandler.throwNotFoundError('Form template not found!');
            }
            if (model.Title != null) {
                template.Title = model.Title;
            }
            if (model.Description != null) {
                template.Description = model.Description;
            }
            if (model.CurrentVersion != null) {
                template.Version = model.CurrentVersion;
            }
            if (model.TenantCode != null) {
                template.TenantId = model.TenantCode;
            }
            if (model.Type != null) {
                template.Type = model.Type;
            }
            if (model.DisplayCode != null) {
                template.DisplayCode = model.DisplayCode;
            }
            if (model.OwnerUserId != null) {
                template.OwnerUserId = model.OwnerUserId;
            }
            if (model.RootSectionId != null) {
                template.RootSectionId = model.RootSectionId;
            }
            if (model.DefaultSectionNumbering != null) {
                template.DefaultSectionNumbering = model.DefaultSectionNumbering;
            }
            var record = await this._formTemplateRepository.save(template);
            return FormTemplateMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating form template: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._formTemplateRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._formTemplateRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting form template: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };



    //#region Privates

    private getSearchModel = (filters: FormTemplateSearchFilters) => {

        var search: FindManyOptions<FormTemplate> = {
            relations: {
                FormSections: {
                    FormFields: {
                        SkipLogic: {
                            Rules: {
                                FallbackRule: true,
                            },
                        },
                        CalculateLogic: {
                            Rules: {
                                FallbackRule: true,
                            },
                        },
                        ValidateLogic: {
                            Rules: {
                                FallbackRule: true,
                            },
                        },
                    },
                },
                FormFields: {
                    SkipLogic: {
                        Rules: {
                            FallbackRule: true,
                        },
                    },
                    CalculateLogic: {
                        Rules: {
                            FallbackRule: true,
                        },
                    },
                    ValidateLogic: {
                        Rules: {
                            FallbackRule: true,
                        },
                    },
                },
                FormSubmissions: true,
            },
            where: {
            }
        };

        if (filters.Title) {
            search.where['Title'] = filters.Title;
        }
        if (filters.Description) {
            search.where['Description'] = filters.Description;
        }
        if (filters.CurrentVersion) {
            search.where['Version'] = filters.CurrentVersion;
        }
        if (filters.TenantCode) {
            search.where['TenantId'] = filters.TenantCode;
        }
        if (filters.Type) {
            search.where['Type'] = filters.Type;
        }
        if (filters.DisplayCode) {
            search.where['DisplayCode'] = filters.DisplayCode;
        }
        if (filters.OwnerUserId) {
            search.where['OwnerUserId'] = filters.OwnerUserId;
        }

        return search;
    };

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
                    // Populate fallback rule operation if exists
                    if (rule.FallbackRule?.OperationType && rule.FallbackRule?.BaseOperationId) {
                        rule.FallbackRule.Operation = await this.getOperationByTypeAndId(rule.FallbackRule.OperationType, rule.FallbackRule.BaseOperationId);
                    }
                }
            }

            // Populate operations for Calculate Logic rules
            if (formField.CalculateLogic?.Rules) {
                for (const rule of formField.CalculateLogic.Rules) {
                    if (rule.OperationType && rule.BaseOperationId) {
                        rule.Operation = await this.getOperationByTypeAndId(rule.OperationType, rule.BaseOperationId);
                    }
                    // Populate fallback rule operation if exists
                    if (rule.FallbackRule?.OperationType && rule.FallbackRule?.BaseOperationId) {
                        rule.FallbackRule.Operation = await this.getOperationByTypeAndId(rule.FallbackRule.OperationType, rule.FallbackRule.BaseOperationId);
                    }
                }
            }

            // Populate operations for Validate Logic rules
            if (formField.ValidateLogic?.Rules) {
                for (const rule of formField.ValidateLogic.Rules) {
                    if (rule.OperationType && rule.BaseOperationId) {
                        rule.Operation = await this.getOperationByTypeAndId(rule.OperationType, rule.BaseOperationId);
                    }
                    // Populate fallback rule operation if exists
                    if (rule.FallbackRule?.OperationType && rule.FallbackRule?.BaseOperationId) {
                        rule.FallbackRule.Operation = await this.getOperationByTypeAndId(rule.FallbackRule.OperationType, rule.FallbackRule.BaseOperationId);
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
                        return await this.getExpandedCompositionOperation(compositionOp);
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
     * Helper method to get expanded composition operation with children as array
     */
    private async getExpandedCompositionOperation(compositionOp: any): Promise<any> {
        const expandedChildren = await this.expandCompositionChildren(compositionOp.Children);
        return {
            ...compositionOp,
            Children: expandedChildren
        } as any;
    }

    /**
     * Helper method to expand composition operation children from JSON string to array of LogicalOperationResponseDto
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
                    // Try to get the operation by ID (we'll need to determine the type)
                    // For now, we'll try logical operations first since that's what you want
                    const logicalOp = await this._logicalOperationService.getById(childId);
                    if (logicalOp) {
                        expandedChildren.push(logicalOp);
                    } else {
                        // If not found as logical operation, try other types
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
