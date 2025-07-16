import {
    FormTemplateApprovalCreateModel,
    FormTemplateApprovalResponseDto,
    FormTemplateApprovalSearchFilters,
    FormTemplateApprovalUpdateModel,
} from '../../../domain.types/forms/form.template.approval.domain.types';

export interface IFormTemplateApprovalRepo {
    create(
        model: FormTemplateApprovalCreateModel
    ): Promise<FormTemplateApprovalResponseDto>;

    update(
        id: string,
        model: FormTemplateApprovalUpdateModel
    ): Promise<FormTemplateApprovalResponseDto>;

    getById(id: string): Promise<FormTemplateApprovalResponseDto>;

    getByTemplateId(
        templateId: string
    ): Promise<FormTemplateApprovalResponseDto>;

    delete(id: string): Promise<boolean>;

    search(filters: FormTemplateApprovalSearchFilters): Promise<any>;
}
