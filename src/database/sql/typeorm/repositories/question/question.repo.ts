import { QuestionCreateModel, QuestionOption } from "../../../../../domain.types/forms/question.domain.types";
import { IQuestionRepo } from "../../../../repository.interfaces/question/question.repo.interface";
import { QuestionResponseDto } from "../../../../../domain.types/forms/question.domain.types";
import { QuestionUpdateModel } from "../../../../../domain.types/forms/question.domain.types";
import { QuestionSearchFilters } from "../../../../../domain.types/forms/question.domain.types";
import { Source } from "../../database.connector.typeorm";
import { Question } from "../../models/question/question.model";
import { QuestionMapper } from "../../mappers/question.mapper";
import { Logger } from "../../../../../common/logger";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { FindManyOptions } from "typeorm";
import { BaseRepo } from "../base.repo";
import { QueryResponseType } from "../../models/question/question.model";

export class QuestionRepo extends BaseRepo implements IQuestionRepo{

    _questionRepo = Source.getRepository(Question);

     create=async (model: QuestionCreateModel) : Promise<QuestionResponseDto> => {
        try {

            //   let jsonData: Prisma.JsonValue | undefined;

            let jsonData: QuestionOption[] | undefined;

            // Map model.Options to the appropriate structure for JSON storage
            if (model.Options && model.Options.length > 0) {
                  jsonData = model.Options.map((option) => ({
                     Text: option.Text,
                     Sequence: option.Sequence,
                     ImageUrl: option.ImageUrl,
             }));
           }

                const data = await this._questionRepo.create({
                  Title: model.Title,
                  Description: model.Description,
                  DisplayCode: model.DisplayCode,
                  ResponseType: model.ResponseType as QueryResponseType,
                  Score: model.Score,
                  // CorrectAnswer: model.CorrectAnswer,
                  IsRequired: model.IsRequired,
                  Hint: model.Hint,
                  Sequence: model.Sequence,
                  Options: JSON.stringify(jsonData), // Only assign if jsonData is defined
                  // QuestionImageUrl: model.QuestionImageUrl,
                  RangeMax: model.RangeMax,
                  RangeMin: model.RangeMin,
                  CreatedAt: new Date(),
                  // UpdatedAt: new Date(), // Uncomment and modify as needed
                  // DeletedAt: null, // Uncomment and modify as needed
                });
                const record = await this._questionRepo.save(data);
                return QuestionMapper.toDto(record);
              } catch (error) {
                ErrorHandler.throwInternalServerError(error.message, 500);
              }
     };
    
     update=async (id: string, model: QuestionUpdateModel) : Promise<QuestionResponseDto> => {
        try {

           //   let jsonData: Prisma.JsonValue | undefined;

            let jsonData: QuestionOption[] | undefined;

            // Map model.Options to the appropriate structure for JSON storage
            if (model.Options && model.Options.length > 0) {
                  jsonData = model.Options.map((option) => ({
                     Text: option.Text,
                     Sequence: option.Sequence,
                     ImageUrl: option.ImageUrl,
             }));
           }
           
           
          const updateData = await this._questionRepo.findOne({
            where: {
              id: id,
              DeletedAt: null,
            },
          });
          if (!updateData) {
            ErrorHandler.throwNotFoundError("Question Data not found!");
          }
          // if (model.SectionIdentifier) {
          //     updateData.SectionIdentifier = model.SectionIdentifier;
          // }
          if (model.Title) {
            updateData.Title = model.Title;
          }
          if (model.Description) {
            updateData.Description = model.Description;
          }
          if (model.DisplayCode) {
            updateData.DisplayCode = model.DisplayCode;
          }

          if (model.Score) {
            updateData.Score = model.Score;
          }

        //   if (model.CorrectAnswer) {
        //     updateData.CorrectAnswer = model.CorrectAnswer;
        //   }

          if (model.IsRequired) {
            updateData.IsRequired = model.IsRequired;
          }

          if (model.Hint) {
            updateData.Hint = model.Hint;
          }

          updateData.Options=JSON.stringify(jsonData);

          //  if (model.QuestionImageUrl) {
          //   updateData.QuestionImageUrl = model.QuestionImageUrl;
          // }

          if (model.RangeMax) {
            updateData.RangeMax = model.RangeMax;
          }

          if (model.RangeMin) {
            updateData.RangeMin = model.RangeMin;
          }

          updateData.UpdatedAt=new Date();

          var record = await this._questionRepo.save(updateData);
          return QuestionMapper.toDto(record);
        } catch (error) {
          ErrorHandler.throwInternalServerError(error.message, 500);
        }
     };
    
     getById=async (id: string) : Promise<QuestionResponseDto> => {
        try {
                var record = await this._questionRepo.findOne({
                     where: {
                          id: id,
                          DeletedAt: null,
                        },
                  });
                  return QuestionMapper.toDto(record);
            } 
            catch (error) 
            {
               Logger.instance().log(error.message);
               ErrorHandler.throwInternalServerError(error.message, 500);
            }
     };
    
     getByTemplateId=async (id: string) : Promise<QuestionResponseDto> => {
        try {
                   var record = await this._questionRepo.findOne({
                       where : {
                           TemplateId : id
                       },
                   });
                   return QuestionMapper.toDto(record);
            } 
            catch (error) {
                   Logger.instance().log(error.message);
                   ErrorHandler.throwInternalServerError(error.message, 500);
               }
     };
    
     delete=async (id: string) : Promise<boolean> => {
        try {
                   var record = await this._questionRepo.findOne({
                       where : {
                           id : id,
                           DeletedAt: null,
                       },
                   });
                   if (!record) {
                       return false; // Record not found
                   }
                   record.DeletedAt = new Date(); // Soft delete
                   await this._questionRepo.save(record);
                   return true; // Soft delete successful
            } catch (error) {
                   Logger.instance().log(error.message);
                   ErrorHandler.throwInternalServerError(error.message, 500);
            }
     };
    
    search=async (filters: QuestionSearchFilters) : Promise<any> => {
        try {
                var search = this.getSearchModel(filters);
                var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
                const [list, count] = await this._questionRepo.findAndCount(search);
                   
                const searchResults = {
                      TotalCount     : count,
                      RetrievedCount : list.length,
                      PageIndex      : pageIndex,
                      ItemsPerPage   : limit,
                      Order          : order === 'DESC' ? 'descending' : 'ascending',
                      OrderedBy      : orderByColumn,
                      Items          : list.map(x => QuestionMapper.toDto(x)),
                };
                               
                return searchResults;
            } 
            
            catch (error) {
                   Logger.instance().log(error.message);
                   ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
             }
    };

    private getSearchModel = (filters: QuestionSearchFilters) => {
            
            var search: FindManyOptions<Question> = {
                relations: {},
                where: {},
             };
        
             if (filters.id) {
                search.where['id'] = filters.id
            }
    
            if (filters.parentTemplateId) {
                search.where['ParentTemplateId'] = filters.parentTemplateId
            }
    
            if (filters.parentSectionId) {
                search.where['ParentSectionId'] = filters.parentSectionId
            }
    
            if (filters.title) {
                search.where['Title'] = filters.title
            }
    
            if (filters.description) {
                search.where['Description'] = filters.description
            }
    
            if (filters.displayCode) {
                search.where['DisplayCode'] = filters.displayCode
            }
    
            if (filters.responseType) {
                search.where['ResponseType'] = filters.responseType
            }
    
            if (filters.score) {
                search.where['Score'] = filters.score
            }
            if (filters.isRequired) {
                search.where['IsRequired'] = filters.isRequired
            }
            if (filters.hint) {
                search.where['Hint'] = filters.hint
            }

            if (filters.questionImageUrl) {
                search.where['QuestionImageUrl'] = filters.questionImageUrl
            }

            if (filters.rangeMin) {
                search.where['RangeMin'] = filters.rangeMin
            }

            if (filters.rangeMax) {
                search.where['RangeMax'] = filters.rangeMax
            }

            if (filters.correctAnswer) {
                search.where['CorrectAnswer'] = filters.correctAnswer
            }
            
             return search;
          };
}