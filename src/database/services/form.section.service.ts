import {
    FormSectionCreateModel,
    FormSectionResponseDto,
    FormSectionSearchFilters,
    FormSectionUpdateModel,
    FormSectionSearchResults,
} from '../../domain.types/form.section.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { FormSection } from '../models/form.section/form.section.model';
import { FormSectionMapper } from '../mappers/form.section.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormSectionService extends BaseService {

    _formSectionRepository: Repository<FormSection> = Source.getRepository(FormSection);

    // Form Section operations
    public create = async (createModel: FormSectionCreateModel)
        : Promise<FormSectionResponseDto> => {
        try {
            // Validate parent section if provided
            if (createModel.ParentSectionId) {
                const parentSection = await this._formSectionRepository.findOne({
                    where: {
                        id: createModel.ParentSectionId
                    }
                });

                if (!parentSection) {
                    ErrorHandler.throwNotFoundError(`Parent section with id ${createModel.ParentSectionId} not found!`);
                }

                // Validate that parent section belongs to the same template
                if (parentSection.FormTemplateId !== createModel.ParentFormTemplateId) {
                    ErrorHandler.throwInputValidationError(['Parent section must belong to the same form template!']);
                }
            }

            const section = this._formSectionRepository.create({
                FormTemplateId: createModel.ParentFormTemplateId,
                Title: createModel.Title,
                Description: createModel.Description,
                DisplayCode: createModel.DisplayCode,
                Sequence: createModel.Sequence ?? 0,
                ParentSectionId: createModel.ParentSectionId,
            });
            const record = await this._formSectionRepository.save(section);

            return FormSectionMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error creating form section: ${error.message}`);
            if (error.name === 'ValidationError' || error.name === 'NotFoundError') {
                throw error;
            }
            ErrorHandler.throwInternalServerError('Error creating form section', error);
        }
    };

    public getById = async (id: uuid): Promise<FormSectionResponseDto> => {
        try {
            const section = await this._formSectionRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    FormTemplate: true,
                    ParentSection: true,
                    ChildSections: true,
                }
            });

            return FormSectionMapper.toDto(section);
        } catch (error) {
            logger.error(`❌ Error getting form section by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getByTemplateId = async (templateId: string): Promise<FormSectionResponseDto[]> => {
        try {
            const sections = await this._formSectionRepository.find({
                where: {
                    FormTemplateId: templateId
                },
                relations: {
                    FormTemplate: true,
                    ParentSection: true,
                    ChildSections: true,
                }
            });

            return sections.map(section => FormSectionMapper.toDto(section));
        } catch (error) {
            logger.error(`❌ Error getting form sections by template id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: FormSectionSearchFilters)
        : Promise<FormSectionSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._formSectionRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => FormSectionMapper.toDto(x)) as any,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching form sections: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: FormSectionUpdateModel)
        : Promise<FormSectionResponseDto> => {
        try {
            const section = await this._formSectionRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!section) {
                ErrorHandler.throwNotFoundError('Form section not found!');
            }
            if (model.Title != null) {
                section.Title = model.Title;
            }
            if (model.Description != null) {
                section.Description = model.Description;
            }
            if (model.DisplayCode != null) {
                section.DisplayCode = model.DisplayCode;
            }
            if (model.Sequence != null) {
                section.Sequence = parseInt(model.Sequence);
            }
            if (model.ParentSectionId != null) {
                section.ParentSectionId = model.ParentSectionId;
            }
            var record = await this._formSectionRepository.save(section);
            return FormSectionMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating form section: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._formSectionRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._formSectionRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting form section: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: FormSectionSearchFilters) => {

        var search: FindManyOptions<FormSection> = {
            relations: {
                FormTemplate: true,
                ParentSection: true,
                ChildSections: true,
            },
            where: {
            }
        };

        if (filters.ParentFormTemplateId) {
            search.where['FormTemplateId'] = filters.ParentFormTemplateId;
        }
        if (filters.Title) {
            search.where['Title'] = filters.Title;
        }
        if (filters.Description) {
            search.where['Description'] = filters.Description;
        }
        if (filters.DisplayCode) {
            search.where['DisplayCode'] = filters.DisplayCode;
        }
        if (filters.Sequence) {
            search.where['Sequence'] = filters.Sequence;
        }
        if (filters.ParentSectionId) {
            search.where['ParentSectionId'] = filters.ParentSectionId;
        }

        return search;
    };
}
