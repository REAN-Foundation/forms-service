import { FormFieldCreateModel, FormFieldOption, FormFieldResponseDto, FormFieldSearchFilters, FormFieldSearchResponseDto, FormFieldUpdateModel } from "../../domain.types/forms/form.field.domain.types";
import { ErrorHandler } from "../../common/handlers/error.handler";
import { inject, injectable } from "tsyringe";
import { IFormFieldRepo } from "../../database/repository.interfaces/form.field/form.field.repo.interface";


@injectable()
export class FormFieldService {

     constructor(@inject('IFormFieldRepo') private _formFieldRepo: IFormFieldRepo) {
     }

     // allFormFields = async (): Promise<any> => {
     //     const response = await this.prisma.formField.findMany({
     //         include: {
     //             ParentFormTemplate: true,
     //             ParentFormSection: true
     //         },
     //         where: {
     //             DeletedAt: null
     //         }
     //     });
     //     return FormFieldMapper.toArrayDto(response);
     // };

     // create = async (model: FormFieldCreateModel) => {

     //     const jsonData: Prisma.JsonValue = {
     //         Sequence: model.Options.Sequence,
     //         Option: model.Options.Data,
     //         ImageUrl: model.Options.ImageUrl,
     //     } as Prisma.JsonObject;

     //     const response = await this.prisma.formField.create({
     //         data: {
     //             ParentFormTemplate: {
     //                 connect: { id: model.ParentTemplateId }
     //             },
     //             ParentFormSection: {
     //                 connect: { id: model.ParentSectionId }
     //             },
     //             Title: model.Title,
     //             Description: model.Description,
     //             DisplayCode: model.DisplayCode,
     //             ResponseType: model.ResponseType as QueryResponseType,
     //             Score: model.Score,
     //             CorrectAnswer: model.CorrectAnswer,
     //             Hint: model.Hint,
     //             Sequence: model.Sequence,
     //             Options: jsonData,
     //             QuestionImageUrl: model.QuestionImageUrl,
     //             RangeMax: model.RangeMax,
     //             RangeMin: model.RangeMin,
     //             CreatedAt: new Date(),
     //             // UpdatedAt: new Date(),
     //             // DeletedAt: null,
     //         },
     //         include: {
     //             ParentFormTemplate: true,
     //             ParentFormSection: true
     //         }
     //     });
     //     return FormFieldMapper.toDto(response);

     // };

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

     // private getSearchModel = (filters: FormFieldSearchFilters): Prisma.FormFieldWhereInput => {
     //     const where: Prisma.FormFieldWhereInput = { DeletedAt: null };

     //     if (filters.id) {
     //         where.id = {
     //             equals: filters.id,
     //         };
     //     }
     //     if (filters.parentTemplateId) {
     //         where.ParentTemplateId = {
     //             equals: filters.parentTemplateId,
     //         };
     //     }
     //     if (filters.parentSectionId) {
     //         where.ParentSectionId = {
     //             equals: filters.parentSectionId,
     //         };
     //     }

     //     if (filters.title) {
     //         where.Title = {
     //             equals: filters.title,
     //         };
     //     }

     //     if (filters.description) {
     //         where.Description = {
     //             equals: filters.description,
     //         };
     //     }

     //     if (filters.displayCode) {
     //         where.DisplayCode = {
     //             equals: filters.displayCode,
     //         };
     //     }

     //     if (filters.responseType) {
     //         where.ResponseType = {
     //             equals: filters.responseType,
     //         };
     //     }

     //     if (filters.score) {
     //         where.Score = {
     //             equals: filters.score,
     //         };
     //     }

     //     if (filters.isRequired) {
     //         where.IsRequired = {
     //             equals: filters.isRequired,
     //         };
     //     }

     //     if (filters.hint) {
     //         where.Hint = {
     //             equals: filters.hint,
     //         };
     //     }
     //     // if (filters.options) {
     //     //     where.Options = {
     //     //         equals: filters.options,
     //     //     };
     //     // }
     //     if (filters.questionImageUrl) {
     //         where.QuestionImageUrl = {
     //             equals: filters.questionImageUrl,
     //         };
     //     }
     //     if (filters.rangeMin) {
     //         where.RangeMin = {
     //             equals: filters.rangeMin,
     //         };
     //     }
     //     if (filters.rangeMax) {
     //         where.RangeMax = {
     //             equals: filters.rangeMax,
     //         };
     //     }
     //     if (filters.correctAnswer) {
     //         where.CorrectAnswer = {
     //             equals: filters.correctAnswer,
     //         };
     //     }

     //     return where;
     // };

} 