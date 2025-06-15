import { FormStatus, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { FormMapper } from "../../database/sql/typeorm/mappers/form.submission.mapper"
import { FormSubmissionCreateModel, FormSubmissionDto, FormSubmissionSearchFilters, FormSubmissionUpdateModel } from "../../domain.types/forms/form.submission.domain.types";
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { ErrorHandler } from "../../common/handlers/error.handler";
import { inject, injectable } from "tsyringe";
import { IFormSubmissionRepo } from "../../database/repository.interfaces/form.submission/form.submission.repo.interface";

///////////////////////////////////////////////////////////////////////////////////////////////
@injectable()
export class FormService {

    constructor(@inject('IFormSubmissionRepo') private _formSubmissionRepo : IFormSubmissionRepo) {
       
    }
    //     const response = await this.prisma.formSubmission.create({
    //         data: {
    //             FormTemplate: {
    //                 connect: { id: model.FormTemplateId }
    //             },
    //             UserId: model.UserId,
    //             Status: model.Status,
    //             ValidTill: model.ValidTill,
    //         },
    //         include: {
    //             FormTemplate: true,
    //         }
    //     });

    //     return FormMapper.toDto(response);
    // };

    create = async (model: FormSubmissionCreateModel) : Promise<FormSubmissionDto> => {
         const dto=await this._formSubmissionRepo.create(model);
         return dto; 
    };

     update = async (id: string, model: FormSubmissionUpdateModel) : Promise<FormSubmissionDto>=> {
         const dto=await this._formSubmissionRepo.update(id,model);
         return dto;
    };

    getById = async (id: string) : Promise<FormSubmissionDto> => {
         const dto=await this._formSubmissionRepo.getById(id);
         return dto;
    };

    delete = async (id: string) : Promise<boolean>=> {
        const dto=await this._formSubmissionRepo.delete(id);
         return dto;
    };


     submit = async (id: uuid) : Promise<FormSubmissionDto>=> {
        const dto=await this._formSubmissionRepo.submit(id);
         return dto;
     };

    public search = async (filters: FormSubmissionSearchFilters) : Promise<any>=> {
         const dto=await this._formSubmissionRepo.search(filters);
         return dto;
    };

}
