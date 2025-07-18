import {
    FormFieldCreateModel,
    FormFieldResponseDto,
    FormFieldSearchFilters,
    FormFieldUpdateModel,
    FormFieldSearchResults,
} from '../../domain.types/form.field.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { FormField } from '../models/form.field/form.field.model';
import { FormFieldMapper } from '../mappers/form.field.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormFieldService extends BaseService {

    _formFieldRepository: Repository<FormField> = Source.getRepository(FormField);

    // Form Field operations
    public create = async (createModel: FormFieldCreateModel)
        : Promise<FormFieldResponseDto> => {

        const field = this._formFieldRepository.create({
            TemplateId: createModel.ParentTemplateId,
            ParentSectionId: createModel.ParentSectionId,
            Title: createModel.Title,
            Description: createModel.Description,
            DisplayCode: createModel.DisplayCode,
            ResponseType: createModel.ResponseType,
            Score: createModel.Score,
            Sequence: createModel.Sequence,
            ExpectedAnswer: createModel.CorrectAnswer,
            IsRequired: createModel.IsRequired,
            Hint: createModel.Hint,
            Options: JSON.stringify(createModel.Options),
            ImageResourceId: createModel.QuestionImageUrl,
            RangeMin: createModel.RangeMin,
            RangeMax: createModel.RangeMax,
        });
        const record = await this._formFieldRepository.save(field);

        return FormFieldMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<FormFieldResponseDto> => {
        try {
            const field = await this._formFieldRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    ParentFormSection: true,
                    FormTemplate: true,
                }
            });

            return FormFieldMapper.toDto(field);
        } catch (error) {
            logger.error(`❌ Error getting form field by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getByTemplateId = async (templateId: string): Promise<FormFieldResponseDto[]> => {
        try {
            const fields = await this._formFieldRepository.find({
                where: {
                    TemplateId: templateId
                },
                relations: {
                    ParentFormSection: true,
                    FormTemplate: true,
                }
            });

            return fields.map(field => FormFieldMapper.toDto(field));
        } catch (error) {
            logger.error(`❌ Error getting form fields by template id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: FormFieldSearchFilters)
        : Promise<FormFieldSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._formFieldRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => FormFieldMapper.toDto(x)) as any,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching form fields: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: FormFieldUpdateModel)
        : Promise<FormFieldResponseDto> => {
        try {
            const field = await this._formFieldRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!field) {
                ErrorHandler.throwNotFoundError('Form field not found!');
            }
            if (model.Title != null) {
                field.Title = model.Title;
            }
            if (model.Description != null) {
                field.Description = model.Description;
            }
            if (model.DisplayCode != null) {
                field.DisplayCode = model.DisplayCode;
            }
            if (model.ResponseType != null) {
                field.ResponseType = model.ResponseType;
            }
            if (model.Score != null) {
                field.Score = model.Score;
            }
            if (model.CorrectAnswer != null) {
                field.ExpectedAnswer = model.CorrectAnswer;
            }
            if (model.IsRequired != null) {
                field.IsRequired = model.IsRequired;
            }
            if (model.Hint != null) {
                field.Hint = model.Hint;
            }
            if (model.Options != null) {
                field.Options = JSON.stringify(model.Options);
            }
            if (model.QuestionImageUrl != null) {
                field.ImageResourceId = model.QuestionImageUrl;
            }
            if (model.RangeMin != null) {
                field.RangeMin = model.RangeMin;
            }
            if (model.RangeMax != null) {
                field.RangeMax = model.RangeMax;
            }
            var record = await this._formFieldRepository.save(field);
            return FormFieldMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating form field: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._formFieldRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._formFieldRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting form field: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: FormFieldSearchFilters) => {

        var search: FindManyOptions<FormField> = {
            relations: {
                ParentFormSection: true,
                FormTemplate: true,
            },
            where: {
            }
        };

        if (filters.ParentTemplateId) {
            search.where['TemplateId'] = filters.ParentTemplateId;
        }
        if (filters.ParentSectionId) {
            search.where['ParentSectionId'] = filters.ParentSectionId;
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
        if (filters.ResponseType) {
            search.where['ResponseType'] = filters.ResponseType;
        }
        if (filters.Score) {
            search.where['Score'] = filters.Score;
        }
        if (filters.CorrectAnswer) {
            search.where['ExpectedAnswer'] = filters.CorrectAnswer;
        }
        if (filters.IsRequired) {
            search.where['IsRequired'] = filters.IsRequired;
        }
        if (filters.Hint) {
            search.where['Hint'] = filters.Hint;
        }
        if (filters.QuestionImageUrl) {
            search.where['ImageResourceId'] = filters.QuestionImageUrl;
        }
        if (filters.RangeMin) {
            search.where['RangeMin'] = filters.RangeMin;
        }
        if (filters.RangeMax) {
            search.where['RangeMax'] = filters.RangeMax;
        }

        return search;
    };
}
