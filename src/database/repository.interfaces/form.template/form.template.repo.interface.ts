import {
    ExportFormTemplateDto,
    FormTemplateCreateModel,
    FormTemplateResponseDto,
    FormTemplateSearchFilters,
    FormTemplateUpdateModel,
} from '../../../domain.types/forms/form.template.domain.types';

export interface IFormTemplateRepo {
    create(model: FormTemplateCreateModel): Promise<FormTemplateResponseDto>;

    update(
        id: string,
        model: FormTemplateUpdateModel
    ): Promise<FormTemplateResponseDto>;

    getById(id: string): Promise<FormTemplateResponseDto>;

    getDetailsById(id: string): Promise<any>;

    readTemplateObjToExport(id: string): Promise<ExportFormTemplateDto>;

    previewTemplate(id: string): Promise<any>;

    delete(id: string): Promise<boolean>;

    submissions(id: string): Promise<FormTemplateResponseDto[]>;

    search(filters: FormTemplateSearchFilters): Promise<any>;
}
