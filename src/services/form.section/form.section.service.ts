import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { FormSectionMapper } from "../../database/sql/typeorm/mappers/form.section.mapper";
import { FormSectionCreateModel, FormSectionResponseDto, FormSectionSearchFilters, FormSectionUpdateModel } from "../../domain.types/forms/form.section.domain.types";
// import { ErrorHandler } from "../../common/error.handler";
import { inject, injectable } from "tsyringe";
import { IFormSectionRepo } from "../../database/repository.interfaces/form.section/form.section.repo.interface";

@injectable()
export class FormSectionService {

    constructor(@inject('IFormSectionRepo') private _formSectionRepo: IFormSectionRepo) {

    }

    // allFormSections = async (): Promise<any> => {
    //     const response = await this.prisma.formSection.findMany({
    //         include: {
    //             ParentFormTemplate: true
    //         },
    //         where: {
    //             DeletedAt: null,
    //         }
    //     });
    //     return FormSectionMapper.toArrayDto(response);
    // };

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
