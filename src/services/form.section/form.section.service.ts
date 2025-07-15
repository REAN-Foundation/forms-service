import { FormSectionCreateModel, FormSectionResponseDto, FormSectionSearchFilters, FormSectionUpdateModel } from "../../domain.types/forms/form.section.domain.types";
import { inject, injectable } from "tsyringe";
import { IFormSectionRepo } from "../../database/repository.interfaces/form.section/form.section.repo.interface";

@injectable()
export class FormSectionService {

    constructor(@inject('IFormSectionRepo') private _formSectionRepo: IFormSectionRepo) {
    }

    create = async (model: FormSectionCreateModel): Promise<FormSectionResponseDto> => {
        var dto = await this._formSectionRepo.create(model);
        return dto;
    };

    update = async (id: string, model: FormSectionUpdateModel): Promise<FormSectionResponseDto> => {
        var dto = await this._formSectionRepo.update(id, model);
        return dto;
    };

    getById = async (id: string): Promise<FormSectionResponseDto> => {
        var dto = await this._formSectionRepo.getById(id);
        return dto;
    };

    delete = async (id: string): Promise<boolean> => {
        var dto = await this._formSectionRepo.delete(id);
        return dto;
    };

    getByTemplateId = async (id: string): Promise<any> => {
        var dto = await this._formSectionRepo.getByTemplateId(id);
        return dto;
    };

    public search = async (filters: FormSectionSearchFilters): Promise<any> => {
        var dto = await this._formSectionRepo.search(filters);
        return dto;
    }

}
