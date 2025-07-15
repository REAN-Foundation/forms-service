import { QuestionResponseCreateModel, QuestionResponseResponseDto, QuestionResponseSearchFilters, QuestionResponseUpdateModel } from "../../domain.types/forms/response.domain.types";
import { inject, injectable } from "tsyringe";
import { IResponseRepo } from "../../database/repository.interfaces/question.response/question.response.repo.interface";
import { QuestionResponseDto } from "../../domain.types/forms/question.domain.types";

@injectable()
export class ResponseService {

   constructor(@inject('IResponseRepo') private _respRepo: IResponseRepo) {
   }

   create = async (model: QuestionResponseCreateModel): Promise<QuestionResponseResponseDto> => {
      const dto = await this._respRepo.create(model);
      return dto;
   };

   save = async (model: any) => {
      const dto = await this._respRepo.save(model);
      return dto;
   };

   update = async (id: string, model: QuestionResponseUpdateModel): Promise<QuestionResponseResponseDto> => {
      const dto = await this._respRepo.update(id, model);
      return dto;
   };

   getById = async (id: string): Promise<QuestionResponseResponseDto> => {
      const dto = await this._respRepo.getById(id);
      return dto;
   };

   getQuestionById = async (id: string): Promise<QuestionResponseDto> => {
      const dto = await this._respRepo.getQuestionById(id);
      return dto;
   };

   delete = async (id: string): Promise<boolean> => {
      const dto = await this._respRepo.delete(id);
      return dto;
   };

   getAll = async () => {
      const dto = await this._respRepo.getAll();
      return dto;
   };

   exportCsv = async (): Promise<string> => {

      const dto = await this._respRepo.exportCsv();
      return dto;
   };

   exportPdf = async (): Promise<string> => {
      const dto = await this._respRepo.exportPdf();
      return dto;
   };


   public search = async (filters: QuestionResponseSearchFilters) => {
      const dto = await this._respRepo.search(filters);
      return dto;
   };

}
