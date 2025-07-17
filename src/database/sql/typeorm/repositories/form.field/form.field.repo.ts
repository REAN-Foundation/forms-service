import {
    FormFieldCreateModel,
    FormFieldOption,
} from '../../../../../domain.types/forms/form.field.domain.types';
import { IFormFieldRepo } from '../../../../repository.interfaces/form.field/form.field.repo.interface';
import { FormFieldResponseDto } from '../../../../../domain.types/forms/form.field.domain.types';
import { FormFieldUpdateModel } from '../../../../../domain.types/forms/form.field.domain.types';
import { FormFieldSearchFilters } from '../../../../../domain.types/forms/form.field.domain.types';
import { Source } from '../../database.connector.typeorm';
import { FormFieldEntity } from '../../models/form.field/form.field.model';
import { FormFieldMapper } from '../../mappers/form.field.mapper';
import { Logger } from '../../../../../common/logger';
import { ErrorHandler } from '../../../../../common/res.handlers/error.handler';
import { FindManyOptions, Repository } from 'typeorm';
import { BaseRepo } from '../base.repo';
import { QueryResponseType } from '../../../../../domain.types/forms/query.response.types';

export class FormFieldRepo extends BaseRepo implements IFormFieldRepo {
    _formFieldRepo: Repository<FormFieldEntity> =
        Source.getRepository(FormFieldEntity);

    create = async (
        model: FormFieldCreateModel
    ): Promise<FormFieldResponseDto> => {
        try {
            let jsonData: FormFieldOption[] | undefined;

            if (model.Options && model.Options.length > 0) {
                jsonData = model.Options.map(option => ({
                    Text: option.Text,
                    Sequence: option.Sequence,
                    ImageUrl: option.ImageUrl,
                }));
            }

            const data = await this._formFieldRepo.create({
                Title: model.Title,
                Description: model.Description,
                TemplateId: model.ParentTemplateId,
                ParentSectionId: model.ParentSectionId,
                DisplayCode: model.DisplayCode,
                ResponseType: model.ResponseType as QueryResponseType,
                Score: model.Score,
                IsRequired: model.IsRequired,
                Hint: model.Hint,
                Sequence: model.Sequence,
                Options: JSON.stringify(jsonData),
                RangeMax: model.RangeMax,
                RangeMin: model.RangeMin,
                CreatedAt: new Date(),
            });
            const record = await this._formFieldRepo.save(data);
            return FormFieldMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    update = async (
        id: string,
        model: FormFieldUpdateModel
    ): Promise<FormFieldResponseDto> => {
        try {
            let jsonData: FormFieldOption[] | undefined;

            if (model.Options && model.Options.length > 0) {
                jsonData = model.Options.map(option => ({
                    Text: option.Text,
                    Sequence: option.Sequence,
                    ImageUrl: option.ImageUrl,
                }));
            }

            const updateData = await this._formFieldRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError('FormField Data not found!');
            }
            if (model.Title) {
                updateData.Title = model.Title;
            }
            if (model.Description) {
                updateData.Description = model.Description;
            }
            if (model.DisplayCode) {
                updateData.DisplayCode = model.DisplayCode;
            }

            if (model.Score) {
                updateData.Score = model.Score;
            }

            if (model.IsRequired) {
                updateData.IsRequired = model.IsRequired;
            }

            if (model.Hint) {
                updateData.Hint = model.Hint;
            }

            updateData.Options = JSON.stringify(jsonData);

            if (model.RangeMax) {
                updateData.RangeMax = model.RangeMax;
            }

            if (model.RangeMin) {
                updateData.RangeMin = model.RangeMin;
            }

            updateData.UpdatedAt = new Date();

            var record = await this._formFieldRepo.save(updateData);
            return FormFieldMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<FormFieldResponseDto> => {
        try {
            var record = await this._formFieldRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
                relations: ['ParentFormSection', 'FormTemplate'],
            });
            return FormFieldMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getByTemplateId = async (id: string): Promise<any> => {
        try {
            var records = await this._formFieldRepo.find({
                where: {
                    TemplateId: id,
                    DeletedAt: null,
                },
                relations: ['ParentFormSection', 'FormTemplate'],
            });

            const searchResults = {
                TotalCount: records.length,
                RetrievedCount: records.length,
                PageIndex: 1,
                ItemsPerPage: records.length,
                Order: 'ASC',
                OrderedBy: 'CreatedAt',
                Items: FormFieldMapper.toArrayDto(records),
            };

            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._formFieldRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!record) {
                return false;
            }
            record.DeletedAt = new Date();
            await this._formFieldRepo.save(record);
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    search = async (filters: FormFieldSearchFilters): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] =
                await this._formFieldRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order,
                OrderedBy: orderByColumn,
                Items: FormFieldMapper.toArrayDto(list),
            };

            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    private getSearchModel = (filters: FormFieldSearchFilters) => {
        const search: FindManyOptions<FormFieldEntity> = {
            where: {
                DeletedAt: null,
            },
        };

        if (filters.id) {
            search.where['id'] = filters.id;
        }
        if (filters.parentTemplateId) {
            search.where['TemplateId'] = filters.parentTemplateId;
        }
        if (filters.parentSectionId) {
            search.where['ParentSectionId'] = filters.parentSectionId;
        }
        if (filters.title) {
            search.where['Title'] = filters.title;
        }
        if (filters.description) {
            search.where['Description'] = filters.description;
        }
        if (filters.displayCode) {
            search.where['DisplayCode'] = filters.displayCode;
        }
        if (filters.responseType) {
            search.where['ResponseType'] = filters.responseType;
        }
        if (filters.score) {
            search.where['Score'] = filters.score;
        }
        if (filters.correctAnswer) {
            search.where['ExpectedAnswer'] = filters.correctAnswer;
        }
        if (filters.isRequired) {
            search.where['IsRequired'] = filters.isRequired;
        }
        if (filters.hint) {
            search.where['Hint'] = filters.hint;
        }
        if (filters.questionImageUrl) {
            search.where['ImageResourceId'] = filters.questionImageUrl;
        }
        if (filters.rangeMin) {
            search.where['RangeMin'] = filters.rangeMin;
        }
        if (filters.rangeMax) {
            search.where['RangeMax'] = filters.rangeMax;
        }

        return search;
    };
}
