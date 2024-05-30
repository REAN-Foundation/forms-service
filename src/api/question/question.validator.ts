import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { QuestionCreateModel, QuestionSearchFilters, QuestionUpdateModel } from '../../domain.types/forms/question.domain.types';
import { generateDisplayCode } from '../../domain.types/miscellaneous/display.code';
import { ParsedQs } from 'qs';

///////////////////////////////////////////////////////////////////////////////////////////////

export class QuestionValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<QuestionCreateModel> => {
        try {
            const schema = joi.object({
                ParentTemplateId: joi.string().uuid().required(),
                ParentSectionId: joi.string().uuid().required(),
                Title: joi.string(),
                Description: joi.string().optional(),
                DisplayCode: joi.string().optional(),
                ResponseType: joi.string().required(),
                Score: joi.number().optional(),
                CorrectAnswer: joi.string().optional(),
                Hint: joi.string().optional(),
                Options: joi.array().items(joi.string()).optional(),
                // FileResourceId  : joi.string().uuid(),
                QuestionImageUrl: joi.string().optional(),
                RangeMin: joi.string().optional(),
                RangeMax: joi.number().optional()
            });
            await schema.validateAsync(request.body);
            return {
                ParentTemplateId: request.body.ParentTemplateId,
                ParentSectionId: request.body.ParentSectionId,
                Title: request.body.Title,
                Description: request.body.Description,
                DisplayCode: request.body.DisplayCode ?? generateDisplayCode(25, 'QUESTION_#'),
                ResponseType: request.body.ResponseType,
                Score: request.body.Score,
                CorrectAnswer: request.body.CorrectAnswer,
                Hint: request.body.Hint,
                Options: request.body.Options,
                // FileResourceId  : request.body.FileResourceId,
                QuestionImageUrl: request.body.QuestionImageUrl,
                RangeMin: request.body.RangeMin ?? null,
                RangeMax: request.body.RangeMax ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<QuestionUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                Title: joi.string().optional(),
                Description: joi.string().optional(),
                DisplayCode: joi.string().optional(),
                ResponseType: joi.string().optional(),
                Score: joi.number().optional(),
                CorrectAnswer: joi.string().optional(),
                Hint: joi.string().optional(),
                Options: joi.array().items(joi.string().optional()).optional(),
                // FileResourceId  : joi.string().uuid().optional(),
                QuestionImageUrl: joi.string().optional(),
                RangeMin: joi.number().optional(),
                RangeMax: joi.number().optional()
            });
            await schema.validateAsync(request.body);
            return {
                Title: request.body.Title ?? null,
                Description: request.body.Description ?? null,
                DisplayCode: request.body.DisplayCode ?? null,
                ResponseType: request.body.ResponseType ?? null,
                Score: request.body.Score ?? null,
                CorrectAnswer: request.body.CorrectAnswer ?? null,
                Hint: request.body.Hint ?? null,
                Options: request.body.Options ?? null,
                // FileResourceId  : request.body.FileResourceId ?? null,
                QuestionImageUrl: request.body.QuestionImageUrl ?? null,
                RangeMin: request.body.RangeMin ?? null,
                RangeMax: request.body.RangeMax ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<QuestionSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                parentTemplateId: joi.string().uuid().optional(),
                parentSectionId: joi.string().uuid().optional(),
                title: joi.string().optional(),
                description: joi.string().optional(),
                displayCode: joi.string().optional(),
                responseType: joi.string().optional(),
                score: joi.number().optional(),
                correctAnswer: joi.string().optional(),
                hint: joi.string().optional(),
                options: joi.array().items(joi.string().optional()).optional(),
                // FileResourceId  : joi.string().uuid().optional(),
                questionImageUrl: joi.string().optional(),
                rangeMin: joi.number().optional(),
                rangeMax: joi.number().optional()

            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: ParsedQs): QuestionSearchFilters => {
        var filters: any = {};

        var id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }
        var parentTemplateId = query.parentTemplateId ? query.parentTemplateId : null;
        if (parentTemplateId != null) {
            filters['parentTemplateId'] = parentTemplateId;
        }
        var parentSectionId = query.parentSectionId ? query.parentSectionId : null;
        if (parentSectionId != null) {
            filters['parentSectionId'] = parentSectionId;
        }
        var title = query.title ? query.title : null;
        if (title != null) {
            filters['title'] = title;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['description'] = description;
        }
        var displayCode = query.displayCode ? query.displayCode : null;
        if (displayCode != null) {
            filters['displayCode'] = displayCode;
        }
        var responseType = query.responseType ? query.responseType : null;
        if (responseType != null) {
            filters['responseType'] = responseType;
        }
        var score = query.score ? query.score : null;
        if (score != null) {
            filters['score'] = score;
        }

        var correctAnswer = query.correctAnswer ? query.correctAnswer : null;
        if (correctAnswer != null) {
            filters['correctAnswer'] = correctAnswer;
        }
        var hint = query.hint ? query.hint : null;
        if (hint != null) {
            filters['hint'] = hint;
        }
        var options = query.options ? query.options : null;
        if (options != null) {
            filters['options'] = options;
        }
        var questionImageUrl = query.questionImageUrl ? query.questionImageUrl : null;
        if (questionImageUrl != null) {
            filters['questionImageUrl'] = questionImageUrl;
        }
        var rangeMin = query.rangeMin ? query.rangeMin : null;
        if (rangeMin != null) {
            filters['rangeMin'] = rangeMin;
        }
        var rangeMax = query.rangeMax ? query.rangeMax : null;
        if (rangeMax != null) {
            filters['rangeMax'] = rangeMax;
        }

        var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : 25;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = itemsPerPage;
        }
        var orderBy = query.orderBy ? query.orderBy : 'CreatedAt';
        if (orderBy != null) {
            filters['OrderBy'] = orderBy;
        }
        var order = query.order ? query.order : 'ASC';
        if (order != null) {
            filters['Order'] = order;
        }
        return filters;
    };

}
