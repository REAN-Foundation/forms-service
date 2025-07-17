import {
    FormTemplateApprovalCreateModel,
    FormTemplateApprovalResponseDto,
    FormTemplateApprovalSearchFilters,
    FormTemplateApprovalUpdateModel,
} from '../../domain.types/forms/form.template.approval.domain.types';
import { IFormTemplateApprovalRepo } from '../../database/repository.interfaces/form.template.approval/form.template.approval.repo.interface';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FormTemplateApprovalService {
    constructor(
        @inject('IFormTemplateApprovalRepo')
        private _formTemplateApprovalRepo: IFormTemplateApprovalRepo
    ) {}

    create = async (
        model: FormTemplateApprovalCreateModel
    ): Promise<FormTemplateApprovalResponseDto> => {
        return await this._formTemplateApprovalRepo.create(model);
    };

    update = async (
        id: string,
        model: FormTemplateApprovalUpdateModel
    ): Promise<FormTemplateApprovalResponseDto> => {
        return await this._formTemplateApprovalRepo.update(id, model);
    };

    getById = async (id: string): Promise<FormTemplateApprovalResponseDto> => {
        return await this._formTemplateApprovalRepo.getById(id);
    };

    getByTemplateId = async (
        templateId: string
    ): Promise<FormTemplateApprovalResponseDto> => {
        return await this._formTemplateApprovalRepo.getByTemplateId(templateId);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._formTemplateApprovalRepo.delete(id);
    };

    search = async (
        filters: FormTemplateApprovalSearchFilters
    ): Promise<any> => {
        return await this._formTemplateApprovalRepo.search(filters);
    };
}
