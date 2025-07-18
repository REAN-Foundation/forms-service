import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import {
    FormFieldCreateModel,
    FormFieldSearchFilters,
    FormFieldUpdateModel,
} from '../../domain.types/form.field.domain.types';
import { generateDisplayCode } from '../../domain.types/miscellaneous/display.code';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormFieldValidator extends BaseValidator {

    public validateCreateRequest = async (
        request: express.Request
    ): Promise<FormFieldCreateModel> => {
        try {
            const optionSchema = joi.object({
                Text: joi.string().required(),
                Sequence: joi.string().required(),
                ImageUrl: joi.string().optional(),
            });

            const schema = joi.object({
                ParentTemplateId: joi.string().uuid().required(),
                ParentSectionId: joi.string().uuid().required(),
                Title: joi.string(),
                Description: joi.string().optional(),
                DisplayCode: joi.string().optional(),
                ResponseType: joi.string().required(),
                Score: joi.number().optional(),
                CorrectAnswer: joi.string().optional(),
                IsRequired: joi.boolean().optional(),
                Hint: joi.string().optional(),
                Sequence: joi.string().optional(),
                Options: joi.array().items(optionSchema).optional(), // Validate Options as an array of objects
                // FileResourceId: joi.string().uuid(),
                QuestionImageUrl: joi.string().optional(),
                RangeMin: joi.number().optional(), // Should be a number to match the type in FormFieldCreateModel
                RangeMax: joi.number().optional(),
            });

            await schema.validateAsync(request.body);
            return {
                ParentTemplateId: request.body.ParentTemplateId,
                ParentSectionId: request.body.ParentSectionId,
                Title: request.body.Title,
                Description: request.body.Description,
                DisplayCode:
                    request.body.DisplayCode ??
                    generateDisplayCode(25, 'FORMFIELD_#'),
                ResponseType: request.body.ResponseType,
                Score: request.body.Score,
                Sequence: request.body.Sequence,
                CorrectAnswer: request.body.CorrectAnswer,
                IsRequired: request.body.IsRequired ?? false,
                Hint: request.body.Hint,
                Options: request.body.Options, // Options should now be an array of FormFieldOption
                // FileResourceId: request.body.FileResourceId,
                QuestionImageUrl: request.body.QuestionImageUrl,
                RangeMin: request.body.RangeMin ?? null,
                RangeMax: request.body.RangeMax ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (
        request: express.Request
    ): Promise<FormFieldUpdateModel | undefined> => {
        try {
            const optionSchema = joi.object({
                Text: joi.string().required(),
                Sequence: joi.string().required(),
                ImageUrl: joi.string().optional(),
            });
            const schema = joi.object({
                Title: joi.string().optional(),
                Description: joi.string().optional(),
                DisplayCode: joi.string().optional(),
                ResponseType: joi.string().optional(),
                Score: joi.number().optional(),
                CorrectAnswer: joi.string().optional(),
                IsRequired: joi.boolean().optional(),
                Hint: joi.string().optional(),
                // Options: joi.array().items(joi.string().optional()).optional(),
                Options: joi.array().items(optionSchema).optional(), // Validate Options as an array of objects
                // FileResourceId  : joi.string().uuid().optional(),
                QuestionImageUrl: joi.string().optional(),
                RangeMin: joi.number().optional(),
                RangeMax: joi.number().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Title: request.body.Title ?? null,
                Description: request.body.Description ?? null,
                DisplayCode: request.body.DisplayCode ?? null,
                ResponseType: request.body.ResponseType ?? null,
                Score: request.body.Score ?? null,
                CorrectAnswer: request.body.CorrectAnswer ?? null,
                IsRequired: request.body.IsRequired ?? null,
                Hint: request.body.Hint ?? null,
                Options: request.body.Options ?? null,
                // FileResourceId  : request.body.FileResourceId ?? null,
                QuestionImageUrl: request.body.QuestionImageUrl ?? null,
                RangeMin: request.body.RangeMin ?? null,
                RangeMax: request.body.RangeMax ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (
        request: express.Request
    ): Promise<FormFieldSearchFilters> => {
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
                isRequired: joi.boolean().optional(),
                hint: joi.string().optional(),
                options: joi.array().items(joi.string().optional()).optional(),
                // FileResourceId  : joi.string().uuid().optional(),
                questionImageUrl: joi.string().optional(),
                rangeMin: joi.number().optional(),
                rangeMax: joi.number().optional(),
            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            const baseFilters = await this.validateBaseSearchFilters(request);
            return {
                ...baseFilters,
                ...filters
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: any): FormFieldSearchFilters => {
        var filters: any = {};

        var id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }
        var parentTemplateId = query.parentTemplateId
            ? query.parentTemplateId
            : null;
        if (parentTemplateId != null) {
            filters['parentTemplateId'] = parentTemplateId;
        }
        var parentSectionId = query.parentSectionId
            ? query.parentSectionId
            : null;
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
        var isRequired = query.isRequired ? query.isRequired : null;
        if (isRequired != null) {
            filters['isRequired'] = isRequired;
        }
        var hint = query.hint ? query.hint : null;
        if (hint != null) {
            filters['hint'] = hint;
        }
        var options = query.options ? query.options : null;
        if (options != null) {
            filters['options'] = options;
        }
        // var FileResourceId = query.FileResourceId ? query.FileResourceId : null;
        // if (FileResourceId != null) {
        //     filters['FileResourceId'] = FileResourceId;
        // }
        var questionImageUrl = query.questionImageUrl
            ? query.questionImageUrl
            : null;
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

        return filters;
    };
}
