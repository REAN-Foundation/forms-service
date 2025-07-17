import {
    FormTemplateApprovalCreateModel,
    FormTemplateApprovalResponseDto,
    FormTemplateApprovalSearchFilters,
    FormTemplateApprovalUpdateModel,
} from '../../../../../domain.types/forms/form.template.approval.domain.types';
import { IFormTemplateApprovalRepo } from '../../../../repository.interfaces/form.template.approval/form.template.approval.repo.interface';
import { FormTemplateApproval } from '../../models/form.template.approval/form.template.approval.model';
import { Source } from '../../database.connector.typeorm';
import { FormTemplateApprovalMapper } from '../../mappers/form.template.approval.mapper';
import { ErrorHandler } from '../../../../../common/res.handlers/error.handler';
import { Logger } from '../../../../../common/logger';
import { BaseRepo } from '../base.repo';
import { FindManyOptions, Repository } from 'typeorm';

export class FormTemplateApprovalRepo
    extends BaseRepo
    implements IFormTemplateApprovalRepo
{
    _formTemplateApprovalRepo: Repository<FormTemplateApproval> =
        Source.getRepository(FormTemplateApproval);

    create = async (
        model: FormTemplateApprovalCreateModel
    ): Promise<FormTemplateApprovalResponseDto> => {
        try {
            const data = this._formTemplateApprovalRepo.create({
                ApproverUserId: model.ApproverUserId,
                TemplateId: model.TemplateId,
                Approved: model.Approved,
                ReviewComments: model.ReviewComments,
            });

            const record = await this._formTemplateApprovalRepo.save(data);
            return FormTemplateApprovalMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    update = async (
        id: string,
        model: FormTemplateApprovalUpdateModel
    ): Promise<FormTemplateApprovalResponseDto> => {
        try {
            const record = await this._formTemplateApprovalRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                ErrorHandler.throwNotFoundError(
                    'Form template approval not found!'
                );
            }

            if (model.ApproverUserId !== undefined) {
                record.ApproverUserId = model.ApproverUserId;
            }
            if (model.TemplateId !== undefined) {
                record.TemplateId = model.TemplateId;
            }
            if (model.Approved !== undefined) {
                record.Approved = model.Approved;
            }
            if (model.ReviewComments !== undefined) {
                record.ReviewComments = model.ReviewComments;
            }

            const updatedRecord =
                await this._formTemplateApprovalRepo.save(record);
            return FormTemplateApprovalMapper.toDto(updatedRecord);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<FormTemplateApprovalResponseDto> => {
        try {
            const record = await this._formTemplateApprovalRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return FormTemplateApprovalMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getByTemplateId = async (
        templateId: string
    ): Promise<FormTemplateApprovalResponseDto> => {
        try {
            const record = await this._formTemplateApprovalRepo.findOne({
                where: {
                    TemplateId: templateId,
                    DeletedAt: null,
                },
            });
            return FormTemplateApprovalMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            const record = await this._formTemplateApprovalRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                return false;
            }
            record.DeletedAt = new Date();
            await this._formTemplateApprovalRepo.save(record);

            return true;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    search = async (
        filters: FormTemplateApprovalSearchFilters
    ): Promise<any> => {
        try {
            const search = this.getSearchModel(filters);
            const {
                search: searchWithPagination,
                pageIndex,
                limit,
                order,
                orderByColumn,
            } = this.addSortingAndPagination(search, filters);
            const [list, count] =
                await this._formTemplateApprovalRepo.findAndCount(
                    searchWithPagination
                );

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => FormTemplateApprovalMapper.toDto(x)),
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

    private getSearchModel = (filters: FormTemplateApprovalSearchFilters) => {
        const search: FindManyOptions<FormTemplateApproval> = {
            relations: {},
            where: {},
        };

        if (filters.id) {
            search.where['id'] = filters.id;
        }

        if (filters.ApproverUserId) {
            search.where['ApproverUserId'] = filters.ApproverUserId;
        }

        if (filters.TemplateId) {
            search.where['TemplateId'] = filters.TemplateId;
        }

        if (filters.Approved !== undefined) {
            search.where['Approved'] = filters.Approved;
        }

        return search;
    };
}
