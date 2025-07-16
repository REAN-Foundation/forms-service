import { QuestionResponseDto } from '../../../domain.types/forms/question.domain.types';
import {
    QuestionResponseCreateModel,
    QuestionResponseResponseDto,
    QuestionResponseSearchFilters,
    QuestionResponseUpdateModel,
} from '../../../domain.types/forms/response.domain.types';

export interface IResponseRepo {
    create(
        model: QuestionResponseCreateModel
    ): Promise<QuestionResponseResponseDto>;

    save(model: any): Promise<QuestionResponseResponseDto>;

    update(
        id: string,
        model: QuestionResponseUpdateModel
    ): Promise<QuestionResponseResponseDto>;

    getById(id: string): Promise<QuestionResponseResponseDto>;

    getQuestionById(id: string): Promise<QuestionResponseDto>;

    delete(id: string): Promise<boolean>;

    getAll(): Promise<QuestionResponseResponseDto[]>;

    exportCsv(): Promise<string>;

    exportPdf(): Promise<string>;

    search(filters: QuestionResponseSearchFilters): Promise<any>;
}
