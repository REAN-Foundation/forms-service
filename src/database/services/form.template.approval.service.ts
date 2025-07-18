import {
    FormTemplateApprovalCreateModel,
    FormTemplateApprovalResponseDto,
    FormTemplateApprovalSearchFilters,
    FormTemplateApprovalUpdateModel,
    FormTemplateApprovalSearchResults,
} from '../../domain.types/form.template.approval.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { FormTemplateApproval } from '../models/form.template.approval/form.template.approval.model';
import { FormTemplateApprovalMapper } from '../mappers/form.template.approval.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormTemplateApprovalService extends BaseService {

    _formTemplateApprovalRepository: Repository<FormTemplateApproval> = Source.getRepository(FormTemplateApproval);

    // Form Template Approval operations
    public create = async (createModel: FormTemplateApprovalCreateModel)
        : Promise<FormTemplateApprovalResponseDto> => {

        const approval = this._formTemplateApprovalRepository.create({
            ApproverUserId: createModel.ApproverUserId,
            TemplateId: createModel.TemplateId,
            Approved: createModel.Approved,
            ReviewComments: createModel.ReviewComments,
        });
        const record = await this._formTemplateApprovalRepository.save(approval);

        return FormTemplateApprovalMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<FormTemplateApprovalResponseDto> => {
        try {
            const approval = await this._formTemplateApprovalRepository.findOne({
                where: {
                    id: id
                }
            });

            return FormTemplateApprovalMapper.toDto(approval);
        } catch (error) {
            logger.error(`❌ Error getting form template approval by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getByTemplateId = async (templateId: string): Promise<FormTemplateApprovalResponseDto> => {
        try {
            const approval = await this._formTemplateApprovalRepository.findOne({
                where: {
                    TemplateId: templateId
                }
            });

            return FormTemplateApprovalMapper.toDto(approval);
        } catch (error) {
            logger.error(`❌ Error getting form template approval by template id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: FormTemplateApprovalSearchFilters)
        : Promise<FormTemplateApprovalSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._formTemplateApprovalRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => FormTemplateApprovalMapper.toDto(x)) as any,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching form template approvals: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: FormTemplateApprovalUpdateModel)
        : Promise<FormTemplateApprovalResponseDto> => {
        try {
            const approval = await this._formTemplateApprovalRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!approval) {
                ErrorHandler.throwNotFoundError('Form template approval not found!');
            }
            if (model.ApproverUserId != null) {
                approval.ApproverUserId = model.ApproverUserId;
            }
            if (model.TemplateId != null) {
                approval.TemplateId = model.TemplateId;
            }
            if (model.Approved != null) {
                approval.Approved = model.Approved;
            }
            if (model.ReviewComments != null) {
                approval.ReviewComments = model.ReviewComments;
            }
            var record = await this._formTemplateApprovalRepository.save(approval);
            return FormTemplateApprovalMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating form template approval: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._formTemplateApprovalRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._formTemplateApprovalRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting form template approval: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: FormTemplateApprovalSearchFilters) => {

        var search: FindManyOptions<FormTemplateApproval> = {
            where: {
            }
        };


        if (filters.ApproverUserId) {
            search.where['ApproverUserId'] = filters.ApproverUserId;
        }
        if (filters.TemplateId) {
            search.where['TemplateId'] = filters.TemplateId;
        }
        if (filters.Approved != null) {
            search.where['Approved'] = filters.Approved;
        }

        return search;
    };
}
