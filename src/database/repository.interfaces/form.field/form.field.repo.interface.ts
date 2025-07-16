import {
    FormFieldCreateModel,
    FormFieldResponseDto,
    FormFieldSearchFilters,
    FormFieldUpdateModel,
} from '../../../domain.types/forms/form.field.domain.types';

export interface IFormFieldRepo {
    create(model: FormFieldCreateModel): Promise<FormFieldResponseDto>;

    update(
        id: string,
        model: FormFieldUpdateModel
    ): Promise<FormFieldResponseDto>;

    getById(id: string): Promise<FormFieldResponseDto>;

    getByTemplateId(id: string): Promise<FormFieldResponseDto>;

    delete(id: string): Promise<boolean>;

    search(filters: FormFieldSearchFilters): Promise<any>;
}
