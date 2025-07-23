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
import { QueryResponseType } from '../../domain.types/query.response.types';

export class FormFieldValidator extends BaseValidator {

    public validateCreateRequest = async (
        request: express.Request
    ): Promise<FormFieldCreateModel> => {
        try {
            const optionSchema = joi.object({
                Text: joi.string().required(),
                Sequence: joi.number().required(),
                ImageUrl: joi.string().optional(),
            });

            const schema = joi.object({
                ParentTemplateId: joi.string().uuid().required(),
                ParentSectionId: joi.string().uuid().required(),
                Title: joi.string().optional(),
                Description: joi.string().optional(),
                DisplayCode: joi.string().optional(),
                ResponseType: joi.string().valid(...Object.values(QueryResponseType)).required(),
                Score: joi.number().optional(),
                Sequence: joi.number().optional(),
                CorrectAnswer: joi.string().optional(),
                IsRequired: joi.boolean().default(false),
                Hint: joi.string().optional(),
                Options: joi.array().items(optionSchema).optional(),
                ImageResourceId: joi.string().uuid().optional(),
                RangeMin: joi.number().optional(),
                RangeMax: joi.number().optional(),
                DefaultExpectedUnit: joi.string().optional(),
                PageBreakAfter: joi.boolean().default(false),
            });

            await schema.validateAsync(request.body);
            return {
                ParentTemplateId: request.body.ParentTemplateId,
                ParentSectionId: request.body.ParentSectionId,
                Title: request.body.Title,
                Description: request.body.Description,
                DisplayCode: request.body.DisplayCode ?? generateDisplayCode(25, 'FORMFIELD_#'),
                ResponseType: request.body.ResponseType,
                Score: request.body.Score,
                Sequence: request.body.Sequence ?? 0,
                CorrectAnswer: request.body.CorrectAnswer,
                IsRequired: request.body.IsRequired ?? false,
                Hint: request.body.Hint,
                Options: request.body.Options,
                ImageResourceId: request.body.ImageResourceId,
                RangeMin: request.body.RangeMin,
                RangeMax: request.body.RangeMax,
                DefaultExpectedUnit: request.body.DefaultExpectedUnit,
                PageBreakAfter: request.body.PageBreakAfter ?? false,
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
                Sequence: joi.number().required(),
                ImageUrl: joi.string().optional(),
            });

            const schema = joi.object({
                Title: joi.string().optional(),
                Description: joi.string().optional(),
                DisplayCode: joi.string().optional(),
                ResponseType: joi.string().valid(...Object.values(QueryResponseType)).optional(),
                Score: joi.number().optional(),
                CorrectAnswer: joi.string().optional(),
                IsRequired: joi.boolean().optional(),
                Hint: joi.string().optional(),
                Options: joi.array().items(optionSchema).optional(),
                ImageResourceId: joi.string().uuid().optional(),
                RangeMin: joi.number().optional(),
                RangeMax: joi.number().optional(),
                DefaultExpectedUnit: joi.string().optional(),
                PageBreakAfter: joi.boolean().optional(),
            });

            await schema.validateAsync(request.body);
            return {
                Title: request.body.Title,
                Description: request.body.Description,
                DisplayCode: request.body.DisplayCode,
                ResponseType: request.body.ResponseType,
                Score: request.body.Score,
                CorrectAnswer: request.body.CorrectAnswer,
                IsRequired: request.body.IsRequired,
                Hint: request.body.Hint,
                Options: request.body.Options,
                ImageResourceId: request.body.ImageResourceId,
                RangeMin: request.body.RangeMin,
                RangeMax: request.body.RangeMax,
                DefaultExpectedUnit: request.body.DefaultExpectedUnit,
                PageBreakAfter: request.body.PageBreakAfter,
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
                templateId: joi.string().uuid().optional(),
                parentSectionId: joi.string().uuid().optional(),
                title: joi.string().optional(),
                description: joi.string().optional(),
                displayCode: joi.string().optional(),
                responseType: joi.string().valid(...Object.values(QueryResponseType)).optional(),
                score: joi.number().optional(),
                correctAnswer: joi.string().optional(),
                isRequired: joi.boolean().optional(),
                defaultExpectedUnit: joi.string().optional(),
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
        const filters: FormFieldSearchFilters = {};

        if (query.templateId) {
            filters.ParentTemplateId = query.templateId;
        }
        if (query.parentSectionId) {
            filters.ParentSectionId = query.parentSectionId;
        }
        if (query.title) {
            filters.Title = query.title;
        }
        if (query.description) {
            filters.Description = query.description;
        }
        if (query.displayCode) {
            filters.DisplayCode = query.displayCode;
        }
        if (query.responseType) {
            filters.ResponseType = query.responseType;
        }
        if (query.score) {
            filters.Score = query.score;
        }
        if (query.correctAnswer) {
            filters.CorrectAnswer = query.correctAnswer;
        }
        if (query.isRequired !== undefined) {
            filters.IsRequired = query.isRequired === 'true';
        }
        if (query.defaultExpectedUnit) {
            filters.DefaultExpectedUnit = query.defaultExpectedUnit;
        }

        return filters;
    };
}
