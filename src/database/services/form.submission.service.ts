import {
    FormSubmissionCreateModel,
    FormSubmissionDto,
    FormSubmissionSearchFilters,
    FormSubmissionUpdateModel,
    FormSubmissionSearchResults,
} from '../../domain.types/form.submission.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { FormSubmission } from '../models/form.submission/form.submission.model';
import { FormSubmissionMapper } from '../mappers/form.submission.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { FormStatus } from '../../domain.types/form.submission.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormService extends BaseService {

    _formSubmissionRepository: Repository<FormSubmission> = Source.getRepository(FormSubmission);

    // Form Submission operations
    public create = async (createModel: FormSubmissionCreateModel)
        : Promise<FormSubmissionDto> => {

        const submission = this._formSubmissionRepository.create({
            FormTemplateId: createModel.FormTemplateId,
            UserId: createModel.UserId,
            Title: createModel.Title,
            Encrypted: createModel.Encrypted,
            Unencrypted: createModel.Unencrypted,
            Link: createModel.Link,
            LinkQueryParams: JSON.stringify(createModel.LinkQueryParams),
            ValidTill: createModel.ValidTill,
            SubmittedAt: createModel.SubmittedAt,
            Status: createModel.Status ?? FormStatus.LinkShared,
            Type: createModel.Category,
        });
        const record = await this._formSubmissionRepository.save(submission);

        return FormSubmissionMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<FormSubmissionDto> => {
        try {
            const submission = await this._formSubmissionRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    FormTemplate: true,
                    QuestionResponses: true,
                }
            });

            return FormSubmissionMapper.toDto(submission);
        } catch (error) {
            logger.error(`❌ Error getting form submission by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: FormSubmissionSearchFilters)
        : Promise<FormSubmissionSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._formSubmissionRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => FormSubmissionMapper.toDto(x)) as any,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching form submissions: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: FormSubmissionUpdateModel)
        : Promise<FormSubmissionDto> => {
        try {
            const submission = await this._formSubmissionRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!submission) {
                ErrorHandler.throwNotFoundError('Form submission not found!');
            }
            if (model.UserId != null) {
                submission.UserId = model.UserId;
            }
            if (model.FormTemplateId != null) {
                submission.FormTemplateId = model.FormTemplateId;
            }
            if (model.Encrypted != null) {
                submission.Encrypted = model.Encrypted;
            }
            if (model.Unencrypted != null) {
                submission.Unencrypted = model.Unencrypted;
            }
            if (model.Link != null) {
                submission.Link = model.Link;
            }
            if (model.LinkQueryParams != null) {
                submission.LinkQueryParams = model.LinkQueryParams;
            }
            if (model.ValidTill != null) {
                submission.ValidTill = model.ValidTill;
            }
            if (model.SubmittedAt != null) {
                submission.SubmittedAt = model.SubmittedAt;
            }
            if (model.Status != null) {
                submission.Status = model.Status;
            }
            if (model.Category != null) {
                submission.Type = model.Category;
            }
            var record = await this._formSubmissionRepository.save(submission);
            return FormSubmissionMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating form submission: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public submit = async (id: uuid): Promise<FormSubmissionDto> => {
        try {
            const submission = await this._formSubmissionRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!submission) {
                ErrorHandler.throwNotFoundError('Form submission not found!');
            }
            submission.Status = FormStatus.Submitted;
            submission.SubmittedAt = new Date();

            var record = await this._formSubmissionRepository.save(submission);
            return FormSubmissionMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error submitting form: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._formSubmissionRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._formSubmissionRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting form submission: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: FormSubmissionSearchFilters) => {

        var search: FindManyOptions<FormSubmission> = {
            relations: {
                FormTemplate: true,
                QuestionResponses: true,
            },
            where: {
            }
        };

        if (filters.FormTemplateId) {
            search.where['FormTemplateId'] = filters.FormTemplateId;
        }
        if (filters.UserId) {
            search.where['UserId'] = filters.UserId;
        }
        if (filters.Status) {
            search.where['Status'] = filters.Status;
        }


        return search;
    };
}
