import {
    FormSectionCreateModel,
    FormSectionResponseDto,
    FormSectionSearchFilters,
    FormSectionUpdateModel,
} from '../../../../../domain.types/forms/form.section.domain.types';
import { IFormSectionRepo } from '../../../../repository.interfaces/form.section/form.section.repo.interface';
import { FormSection } from '../../models/form.section/form.section.model';
import { FormSectionMapper } from '../../mappers/form.section.mapper';
import { Source } from '../../database.connector.typeorm';
import { ErrorHandler } from '../../../../../common/res.handlers/error.handler';
import { Logger } from '../../../../../common/logger';
import { FindManyOptions, Repository } from 'typeorm';
import { BaseRepo } from '../base.repo';

export class FormSectionRepo extends BaseRepo implements IFormSectionRepo {
    _formSectionRepo: Repository<FormSection> =
        Source.getRepository(FormSection);

    create = async (
        model: FormSectionCreateModel
    ): Promise<FormSectionResponseDto> => {
        try {
            const data = await this._formSectionRepo.create({
                FormTemplateId: model.ParentFormTemplateId,
                Title: model.Title,
                Description: model.Description,
                DisplayCode: model.DisplayCode,
                Sequence: model.Sequence,
                ParentSectionId: model.ParentSectionId,
            });
            const record = await this._formSectionRepo.save(data);
            return FormSectionMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    update = async (
        id: string,
        model: FormSectionUpdateModel
    ): Promise<FormSectionResponseDto> => {
        try {
            const updateData = await this._formSectionRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError('Form Section Data not found!');
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

            if (model.Sequence) {
                updateData.Sequence = parseInt(model.Sequence);
            }

            if (model.ParentSectionId) {
                updateData.ParentSectionId = model.ParentSectionId;
            }
            var record = await this._formSectionRepo.save(updateData);
            return FormSectionMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<FormSectionResponseDto> => {
        try {
            var record = await this._formSectionRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return FormSectionMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._formSectionRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            if (!record) {
                return false;
            }
            record.DeletedAt = new Date();
            await this._formSectionRepo.save(record);
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getByTemplateId = async (id: string): Promise<FormSectionResponseDto> => {
        try {
            var record = await this._formSectionRepo.findOne({
                where: {
                    FormTemplateId: id,
                },
            });
            return FormSectionMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    search = async (filters: FormSectionSearchFilters): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] =
                await this._formSectionRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: FormSectionMapper.toArrayDto(list),
            };
            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwDbAccessError(
                'DB Error: Unable to search records!',
                error
            );
        }
    };

    private getSearchModel = (filters: FormSectionSearchFilters) => {
        var search: FindManyOptions<FormSection> = {
            relations: {},
            where: {},
        };

        if (filters.id) {
            search.where['id'] = filters.id;
        }

        if (filters.parentFormTemplateId) {
            search.where['FormTemplateId'] = filters.parentFormTemplateId;
        }

        if (filters.title) {
            search.where['Title'] = filters.title;
        }

        if (filters.description) {
            search.where['Description'] = filters.description;
        }

        if (filters.sequence) {
            search.where['Sequence'] = filters.sequence;
        }
        if (filters.parentSectionId) {
            search.where['ParentSectionId'] = filters.parentSectionId;
        }

        return search;
    };
}
