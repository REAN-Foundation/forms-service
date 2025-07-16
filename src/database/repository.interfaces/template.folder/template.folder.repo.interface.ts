import {
    TemplateFolderCreateModel,
    TemplateFolderResponseDto,
    TemplateFolderSearchFilters,
    TemplateFolderUpdateModel,
} from '../../../domain.types/forms/template.folder.domain.types';

export interface ITemplateFolderRepo {
    create(
        model: TemplateFolderCreateModel
    ): Promise<TemplateFolderResponseDto>;

    update(
        id: string,
        model: TemplateFolderUpdateModel
    ): Promise<TemplateFolderResponseDto>;

    getById(id: string): Promise<TemplateFolderResponseDto>;

    delete(id: string): Promise<boolean>;

    search(filters: TemplateFolderSearchFilters): Promise<any>;
}
