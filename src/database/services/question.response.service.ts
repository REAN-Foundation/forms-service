import {
    QuestionResponseCreateModel,
    QuestionResponseResponseDto,
    QuestionResponseSearchFilters,
    QuestionResponseUpdateModel,
    QuestionResponseSearchResults,
} from '../../domain.types/response.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { QuestionResponse } from '../models/question.response/question.response.model';
import { ResponseMapper } from '../mappers/question.response.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ResponseService extends BaseService {

    _questionResponseRepository: Repository<QuestionResponse> = Source.getRepository(QuestionResponse);

    // Question Response operations
    public create = async (createModel: QuestionResponseCreateModel)
        : Promise<QuestionResponseResponseDto> => {

        const response = this._questionResponseRepository.create({
            FormSubmissionId: createModel.FormSubmissionId,
            // QuestionId: createModel.QuestionId,
            FormFieldId: createModel.FormFieldId,
            ResponseType: createModel.ResponseType,
            IntegerValue: createModel.IntegerValue,
            FloatValue: createModel.FloatValue,
            BooleanValue: createModel.BooleanValue,
            DateTimeValue: createModel.DateTimeValue,
            Url: createModel.Url,
            FileResourceId: createModel.FileResourceId,
            TextValue: createModel.TextValue,
            UserResponse: createModel.UserResponse,
        });
        const record = await this._questionResponseRepository.save(response);

        return ResponseMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<QuestionResponseResponseDto> => {
        try {
            const response = await this._questionResponseRepository.findOne({
                where: {
                    id: id
                }
            });

            return ResponseMapper.toDto(response);
        } catch (error) {
            logger.error(`❌ Error getting question response by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getQuestionById = async (id: string): Promise<QuestionResponseResponseDto> => {
        try {
            const response = await this._questionResponseRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    FormField: true,
                }
            });

            return ResponseMapper.toDto(response) as any;
        } catch (error) {
            logger.error(`❌ Error getting question response by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getAll = async (): Promise<QuestionResponseResponseDto[]> => {
        try {
            const responses = await this._questionResponseRepository.find();
            return responses.map(response => ResponseMapper.toDto(response));
        } catch (error) {
            logger.error(`❌ Error getting all question responses: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: QuestionResponseSearchFilters)
        : Promise<QuestionResponseSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._questionResponseRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => ResponseMapper.toDto(x)) as any,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching question responses: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: QuestionResponseUpdateModel)
        : Promise<QuestionResponseResponseDto> => {
        try {
            const response = await this._questionResponseRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!response) {
                ErrorHandler.throwNotFoundError('Question response not found!');
            }
            if (model.ResponseType != null) {
                response.ResponseType = model.ResponseType;
            }
            if (model.IntegerValue != null) {
                response.IntegerValue = model.IntegerValue;
            }
            if (model.FloatValue != null) {
                response.FloatValue = model.FloatValue;
            }
            if (model.BooleanValue != null) {
                response.BooleanValue = model.BooleanValue;
            }
            if (model.DateTimeValue != null) {
                response.DateTimeValue = model.DateTimeValue;
            }
            if (model.Url != null) {
                response.Url = model.Url;
            }
            if (model.FileResourceId != null) {
                response.FileResourceId = model.FileResourceId;
            }
            if (model.TextValue != null) {
                response.TextValue = model.TextValue;
            }
            if (model.UserResponse != null) {
                response.UserResponse = model.UserResponse;
            }
            var record = await this._questionResponseRepository.save(response);
            return ResponseMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating question response: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public save = async (model: any): Promise<QuestionResponseResponseDto> => {
        try {
            const record = await this._questionResponseRepository.save(model);
            return ResponseMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error saving question response: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._questionResponseRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._questionResponseRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting question response: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: QuestionResponseSearchFilters) => {

        var search: FindManyOptions<QuestionResponse> = {
            relations: {
                FormField: true,
                FormSubmission: true,
            },
            where: {
            }
        };

        if (filters.FormSubmissionId) {
            search.where['FormSubmissionId'] = filters.FormSubmissionId;
        }
        // if (filters.QuestionId) {
        //     search.where['QuestionId'] = filters.QuestionId;
        // }
        if (filters.FormFieldId) {
            search.where['FormFieldId'] = filters.FormFieldId;
        }
        if (filters.ResponseType) {
            search.where['ResponseType'] = filters.ResponseType;
        }
        if (filters.IntegerValue) {
            search.where['IntegerValue'] = filters.IntegerValue;
        }
        if (filters.FloatValue) {
            search.where['FloatValue'] = filters.FloatValue;
        }
        if (filters.BooleanValue) {
            search.where['BooleanValue'] = filters.BooleanValue;
        }
        if (filters.DateTimeValue) {
            search.where['DateTimeValue'] = filters.DateTimeValue;
        }
        if (filters.Url) {
            search.where['Url'] = filters.Url;
        }

        return search;
    };
}
