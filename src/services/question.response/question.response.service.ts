import { QuestionResponseCreateModel, QuestionResponseResponseDto, QuestionResponseSearchFilters, QuestionResponseUpdateModel } from "../../domain.types/forms/response.domain.types";
import { inject, injectable } from "tsyringe";
import { IResponseRepo } from "../../database/repository.interfaces/question.response/question.response.repo.interface";
import { QuestionResponseDto } from "../../domain.types/forms/question.domain.types";

@injectable()
export class ResponseService {
   // prisma: PrismaClient = null;
   // private exportDirectory = path.join(__dirname, '../exports');

   constructor(@inject('IResponseRepo') private _respRepo: IResponseRepo) {
      // this.prisma = PrismaClientInit.instance().getPrismaInstance();
      // if (!fs.existsSync(this.exportDirectory)) {
      //     fs.mkdirSync(this.exportDirectory);
      // }
   }

   // allResponses = async (): Promise<any> => {
   //     const response = await this.prisma.questionResponse.findMany({
   //         include: {
   //             FormSubmission: true,
   //             Question: true
   //         },
   //         where: {
   //             DeletedAt: null
   //         }
   //     });
   //     return ResponseMapper.toArrayDto(response);
   // };

   // create = async (model: QuestionResponseCreateModel) => {
   //     const response = await this.prisma.questionResponse.create({
   //         data: {
   //             Question: {
   //                 connect: { id: model.QuestionId }
   //             },
   //             FormSubmission: {
   //                 connect: { id: model.FormSubmissionId }
   //             },
   //             ResponseType: model.ResponseType as QueryResponseType,
   //             IntegerValue: model.IntegerValue,
   //             FloatValue: model.FloatValue,
   //             BooleanValue: model.BooleanValue,
   //             DateTimeValue: model.DateTimeValue,
   //             Url: model.Url,
   //             FileResourceId: model.FileResourceId,
   //             TextValue: model.TextValue,
   //             SubmissionTimestamp: null,
   //             LastSaveTimestamp: new Date(),
   //             // DeletedAt          : null,
   //         },
   //         include: {
   //             FormSubmission: true,
   //             Question: true
   //         }
   //     });
   //     return ResponseMapper.toDto(response);
   // };

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
