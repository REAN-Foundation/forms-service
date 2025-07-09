import {
    TemplateFolderCreateModel,
    TemplateFolderResponseDto,
    TemplateFolderSearchFilters,
    TemplateFolderUpdateModel
} from "../../domain.types/forms/template.folder.domain.types";
import { ITemplateFolderRepo } from "../../database/repository.interfaces/template.folder/template.folder.repo.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class TemplateFolderService {
    constructor(@inject('ITemplateFolderRepo') private _templateFolderRepo: ITemplateFolderRepo) { }

    create = async (model: TemplateFolderCreateModel): Promise<TemplateFolderResponseDto> => {
        return await this._templateFolderRepo.create(model);
    };

    update = async (id: string, model: TemplateFolderUpdateModel): Promise<TemplateFolderResponseDto> => {
        return await this._templateFolderRepo.update(id, model);
    };

    getById = async (id: string): Promise<TemplateFolderResponseDto> => {
        return await this._templateFolderRepo.getById(id);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._templateFolderRepo.delete(id);
    };

    search = async (filters: TemplateFolderSearchFilters): Promise<any> => {
        return await this._templateFolderRepo.search(filters);
    };
} 