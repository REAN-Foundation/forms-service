import { QuestionCreateModel, QuestionResponseDto, QuestionSearchFilters, QuestionUpdateModel } from "../../../domain.types/forms/question.domain.types";



export interface IQuestionRepo{
  
    create(model: QuestionCreateModel) : Promise<QuestionResponseDto>;

    update(id: string, model: QuestionUpdateModel) : Promise<QuestionResponseDto>;

    getById(id: string) : Promise<QuestionResponseDto>;

    getByTemplateId(id: string) : Promise<QuestionResponseDto>;

    delete(id: string) : Promise<boolean>;

    search(filters: QuestionSearchFilters) : Promise<any>;
}