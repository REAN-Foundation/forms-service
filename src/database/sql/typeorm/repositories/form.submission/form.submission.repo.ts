import { FormSubmissionCreateModel, FormSubmissionSearchFilters, FormSubmissionUpdateModel } from "../../../../../domain.types/forms/form.submission.domain.types";
import { IFormSubmissionRepo } from "../../../../repository.interfaces/form.submission/form.submission.repo.interface";
import { FormSubmissionDto } from "../../../../../domain.types/forms/form.submission.domain.types";
import { FormStatus, FormSubmission } from "../../models/form.submission/form.submission.model";
import { Source } from "../../database.connector.typeorm";
import { FormMapper } from "../../mappers/form.submission.mapper";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { Logger } from "../../../../../common/logger";
import { FindManyOptions } from "typeorm";
import { uuid } from "../../../../../domain.types/miscellaneous/system.types";
import { BaseRepo } from "../base.repo";

export class FormSubmissionRepo extends BaseRepo implements IFormSubmissionRepo{

     _formSubmissionRepo = Source.getRepository(FormSubmission);

    create=async (model: FormSubmissionCreateModel) : Promise<FormSubmissionDto> => {
       try {
                  const data = await this._formSubmissionRepo.create({
                      //  FormTemplate: {
                      //     connect: { id: model.ParentFormTemplateId }
                      // },
                      // SectionIdentifier: model.SectionIdentifier,
                    //  FormTemplate: {
                    //     connect: { id: model.FormTemplateId }
                    //    },
                      
                      UserId: model.UserId,
                      Status: model.Status,
                      ValidTill: model.ValidTill,

                  });
                  const record = await this._formSubmissionRepo.save(data);
                  return FormMapper.toDto(record);
            } 
            
            catch (error) {
                ErrorHandler.throwInternalServerError(error.message, 500);
              }
                 
    };
    
    update=async (id: string, model: FormSubmissionUpdateModel) : Promise<FormSubmissionDto> => {
       try {
                    const updateData = await this._formSubmissionRepo.findOne({
                       where : {
                           id : id,
                           DeletedAt: null,
                       },
                   });
                   if (!updateData) {
                       ErrorHandler.throwNotFoundError('Form Section Data not found!');
                   }
                   // if (model.SectionIdentifier) {
                   //     updateData.SectionIdentifier = model.SectionIdentifier;
                   // }
                   if (model.UserId) {
                       updateData.UserId = model.UserId;
                   }
                   if ( model.Encrypted) {
                       updateData.Encrypted = model.Encrypted;
                   }
                   if (model.Unencrypted) {
                       updateData.Unencrypted = model.Unencrypted;
                   }
       
                   if (model.Link) {
                       updateData.Link = model.Link;
                   }

                //    if (model.QueryParams) {
                //        updateData.QueryParams = model.QueryParams;
                //    }
       
                   if (model.LinkQueryParams) {
                       updateData.LinkQueryParams = model.LinkQueryParams;
                   }

                   if (model.ValidTill) {
                       updateData.ValidTill = model.ValidTill;
                   }

                   if (model.SubmittedAt) {
                       updateData.SubmittedAt = model.SubmittedAt;
                   }

                //    if (model.Status) {
                //        updateData.Status = model.Status;
                //    }

                //    if (model.Category) {
                //        updateData.Category = model.Category;
                //    }

                   var record = await this._formSubmissionRepo.save(updateData);
                   return FormMapper.toDto(record);
            } 
            catch (error) 
            {
               ErrorHandler.throwInternalServerError(error.message, 500);
            }
    };
    
     getById=async (id: string) : Promise<FormSubmissionDto> => {
       try {
         var record = await this._formSubmissionRepo.findOne({
           where: {
             id: id,
             DeletedAt: null,
           },
         });
         return FormMapper.toDto(record);
       } catch (error) {
         Logger.instance().log(error.message);
         ErrorHandler.throwInternalServerError(error.message, 500);
       }
     };
    
     delete=async (id: string) : Promise<boolean> => {
        try {
            var record = await this._formSubmissionRepo.findOne({
                where : {
                    id : id,
                    DeletedAt: null,
                },
            });
            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._formSubmissionRepo.save(record);
            return true; // Soft delete successful
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
     };
    
    submit=async (id: uuid) : Promise<FormSubmissionDto> => {
        try {
          const record = await this._formSubmissionRepo.findOne({
            where: {
              id: id,
              DeletedAt: null,
            },
          });
          if (!record) {
            ErrorHandler.throwNotFoundError("Form Section Data not found!");
          }

          record.SubmittedAt= new Date();
          record.Status=FormStatus.Submitted;
          record.UpdatedAt=new Date();

          var submittedData = await this._formSubmissionRepo.save(record);
          return FormMapper.toDto(submittedData);
        } catch (error) {
          ErrorHandler.throwInternalServerError(error.message, 500);
        } 
    };
    
    search=async (filters: FormSubmissionSearchFilters) : Promise<any> => {
       try {
                   var search = this.getSearchModel(filters);
                  var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
                  const [list, count] = await this._formSubmissionRepo.findAndCount(search);
      
                  const searchResults = {
                      TotalCount     : count,
                      RetrievedCount : list.length,
                      PageIndex      : pageIndex,
                      ItemsPerPage   : limit,
                      Order          : order === 'DESC' ? 'descending' : 'ascending',
                      OrderedBy      : orderByColumn,
                      Items          : list.map(x => FormMapper.toDto(x)),
                  };
                  return searchResults;
              } catch (error) {
                  Logger.instance().log(error.message);
                  ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
              }
    };

    private getSearchModel = (filters: FormSubmissionSearchFilters) => {
    
            var search: FindManyOptions<FormSubmission> = {
              relations: {},
              where: {},
            };

            if (filters.FormTemplateId) {
              search.where["FormTemplateId"] = filters.FormTemplateId;
            }

            if (filters.UserId) {
              search.where["UserId"] = filters.UserId;
            }

            if (filters.Encrypted) {
              search.where["Encrypted"] = filters.Encrypted;
            }

            if (filters.Status) {
              search.where["Status"] = filters.Status;
            }

            if (filters.ValidTill) {
              search.where["ValidTill"] = filters.ValidTill;
            }

            if (filters.SubmittedAt) {
              search.where["SubmittedAt"] = filters.SubmittedAt;
            }

    
            return search;
        };
    
}