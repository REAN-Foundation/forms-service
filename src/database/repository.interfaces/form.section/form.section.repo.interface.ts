import {
    FormSectionCreateModel,
    FormSectionResponseDto,
    FormSectionSearchFilters,
    FormSectionUpdateModel,
} from '../../../domain.types/forms/form.section.domain.types';

export interface IFormSectionRepo {
    create(model: FormSectionCreateModel): Promise<FormSectionResponseDto>;

    update(
        id: string,
        model: FormSectionUpdateModel
    ): Promise<FormSectionResponseDto>;

    getById(id: string): Promise<FormSectionResponseDto>;

    delete(id: string): Promise<boolean>;

    getByTemplateId(id: string): Promise<FormSectionResponseDto>;

    search(filters: FormSectionSearchFilters): Promise<any>;
}
