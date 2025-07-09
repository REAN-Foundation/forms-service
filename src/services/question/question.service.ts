import { QuestionCreateModel, QuestionOption, QuestionResponseDto, QuestionSearchFilters, QuestionSearchResponseDto, QuestionUpdateModel } from "../../domain.types/forms/question.domain.types";
import { ErrorHandler } from "../../common/handlers/error.handler";
import { inject, injectable } from "tsyringe";
import { IQuestionRepo } from "../../database/repository.interfaces/question/question.repo.interface";


@injectable()
export class QuestionService {

     constructor(@inject('IQuestionRepo') private _questRepo: IQuestionRepo) {
     }

     // allQuestions = async (): Promise<any> => {
     //     const response = await this.prisma.question.findMany({
     //         include: {
     //             ParentFormTemplate: true,
     //             ParentFormSection: true
     //         },
     //         where: {
     //             DeletedAt: null
     //         }
     //     });
     //     return QuestionMapper.toArrayDto(response);
     // };

     // create = async (model: QuestionCreateModel) => {

     //     const jsonData: Prisma.JsonValue = {
     //         Sequence: model.Options.Sequence,
     //         Option: model.Options.Data,
     //         ImageUrl: model.Options.ImageUrl,
     //     } as Prisma.JsonObject;

     //     const response = await this.prisma.question.create({
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
     //     return QuestionMapper.toDto(response);

     // };

     create = async (model: QuestionCreateModel): Promise<QuestionResponseDto> => {
          const dto = await this._questRepo.create(model);
          return dto;
     };

     update = async (id: string, model: QuestionUpdateModel): Promise<QuestionResponseDto> => {
          const dto = await this._questRepo.update(id, model);
          return dto;
     };

     getById = async (id: string): Promise<QuestionResponseDto> => {
          const dto = await this._questRepo.getById(id);
          return dto;
     };

     getByTemplateId = async (id: string): Promise<QuestionResponseDto> => {
          const dto = await this._questRepo.getByTemplateId(id);
          return dto;
     };

     delete = async (id: string): Promise<boolean> => {
          const dto = await this._questRepo.delete(id);
          return true;
     };

     public search = async (filters: QuestionSearchFilters): Promise<any> => {
          const dto = await this._questRepo.search(filters);
          return dto;
     };

     // private getSearchModel = (filters: QuestionSearchFilters): Prisma.QuestionWhereInput => {
     //     const where: Prisma.QuestionWhereInput = { DeletedAt: null };

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
