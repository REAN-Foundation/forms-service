import { FormFieldCreateModel, FormFieldResponseDto, FormFieldSearchFilters, FormFieldUpdateModel } from "../../domain.types/forms/form.field.domain.types";
import { inject, injectable } from "tsyringe";
import { IFormFieldRepo } from "../../database/repository.interfaces/form.field/form.field.repo.interface";


@injectable()
export class FormFieldService {

     constructor(@inject('IFormFieldRepo') private _formFieldRepo: IFormFieldRepo) {
     }

     create = async (model: FormFieldCreateModel): Promise<FormFieldResponseDto> => {
          const dto = await this._formFieldRepo.create(model);
          return dto;
     };

     update = async (id: string, model: FormFieldUpdateModel): Promise<FormFieldResponseDto> => {
          const dto = await this._formFieldRepo.update(id, model);
          return dto;
     };

     getById = async (id: string): Promise<FormFieldResponseDto> => {
          const dto = await this._formFieldRepo.getById(id);
          return dto;
     };

     getByTemplateId = async (id: string): Promise<any> => {
          const dto = await this._formFieldRepo.getByTemplateId(id);
          return dto;
     };

     delete = async (id: string): Promise<boolean> => {
          const dto = await this._formFieldRepo.delete(id);
          return true;
     };

     public search = async (filters: FormFieldSearchFilters): Promise<any> => {
          const dto = await this._formFieldRepo.search(filters);
          return dto;
     };
} 