import {
    ExportFormTemplateDto,
    FormTemplateCreateModel,
    FormTemplateResponseDto,
    FormTemplateSearchFilters,
    FormTemplateUpdateModel,
} from "../../domain.types/forms/form.template.domain.types";
import { IFormTemplateRepo } from "../../database/repository.interfaces/form.template/form.template.repo.interface";
import { inject, injectable } from "tsyringe";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class FormTemplateService {
    constructor(@inject('IFormTemplateRepo') private _formTempRepo: IFormTemplateRepo) {
    }

    create = async (model: FormTemplateCreateModel): Promise<FormTemplateResponseDto> => {
        const dto = await this._formTempRepo.create(model);
        return dto;
    };

    update = async (id: string, model: FormTemplateUpdateModel): Promise<FormTemplateResponseDto> => {
        const dto = await this._formTempRepo.update(id, model);
        return dto;
    };

    getById = async (id: string): Promise<FormTemplateResponseDto> => {
        const dto = await this._formTempRepo.getById(id);
        return dto;
    };

    getDetailsById = async (id: string): Promise<any> => {
        const dto = await this._formTempRepo.getDetailsById(id);
        return dto;

    };

    readTemplateObjToExport = async (id: string): Promise<ExportFormTemplateDto> => {
        const dto = await this._formTempRepo.readTemplateObjToExport(id);
        return dto;
    }

    previewTemplate = async (id: string): Promise<any> => {
        const dto = await this._formTempRepo.previewTemplate(id);
        return dto;
    };


    delete = async (id: string): Promise<boolean> => {
        const dto = await this._formTempRepo.delete(id);
        return dto;
    };

    submissions = async (id: string): Promise<FormTemplateResponseDto[]> => {
        const dto = await this._formTempRepo.submissions(id);
        return dto;
    };

    public search = async (filters: FormTemplateSearchFilters): Promise<any> => {
        const dto = await this._formTempRepo.search(filters);
        return dto;
    };

}
