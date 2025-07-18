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
import { FindManyOptions, Repository } from 'typeorm';
import { FormTemplate } from '../models/form.template/form.template.model';
import { FormTemplateMapper } from '../mappers/form.template.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormTemplateService extends BaseService {

    _formTemplateRepository: Repository<FormTemplate> = Source.getRepository(FormTemplate);

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
                    FormSections: true,
                    FormFields: true,
                    FormSubmissions: true,
                }
            });

            return FormTemplateMapper.toDto(template);
        } catch (error) {
            logger.error(`❌ Error getting form template by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getDetailsById = async (id: string): Promise<FormTemplateResponseDto> => {
        try {
            const template = await this._formTemplateRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    FormSections: {
                        FormFields: true,
                        ChildSections: true,
                    },
                    FormFields: true,
                }
            });

            return FormTemplateMapper.toDto(template);
        } catch (error) {
            logger.error(`❌ Error getting form template details by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public readTemplateObjToExport = async (id: string): Promise<ExportFormTemplateDto> => {
        try {
            const template = await this._formTemplateRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    FormSections: {
                        FormFields: true,
                        ChildSections: true,
                    },
                    FormFields: true,
                }
            });

            // Transform to export format - implement specific export logic here
            return template as any; // Placeholder for export transformation
        } catch (error) {
            logger.error(`❌ Error reading template for export: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public previewTemplate = async (id: string): Promise<any> => {
        try {
            const template = await this._formTemplateRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    FormSections: {
                        FormFields: true,
                        ChildSections: true,
                    },
                    FormFields: true,
                }
            });

            // Transform to preview format - implement specific preview logic here
            return template; // Placeholder for preview transformation
        } catch (error) {
            logger.error(`❌ Error getting template preview: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
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
                FormSections: true,
                FormFields: true,
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
}
