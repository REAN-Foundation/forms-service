import joi, { optional } from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { FormSectionCreateModel, FormSectionSearchFilters, FormSectionUpdateModel } from '../../domain.types/forms/form.section.domain.types';
import { generateDisplayCode } from '../../domain.types/miscellaneous/display.code';
import { ParsedQs } from 'qs';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormSectionValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<FormSectionCreateModel> => {
        try {
            const schema = joi.object({
                ParentFormTemplateId: joi.string().uuid().optional(), 
                Title: joi.string().optional(),
                Description: joi.string().optional(),
                SectionIdentifier: joi.string().optional(),
                DisplayCode: joi.string().optional(),
                Sequence: joi.string().optional(),
                ParentSectionId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                ParentFormTemplateId: request.body.ParentFormTemplateId,
                SectionIdentifier: request.body.SectionIdentifier ?? null,
                Title: request.body.Title ?? null,
                Description: request.body.Description ?? null,
                DisplayCode: request.body.DisplayCode ?? generateDisplayCode(25, 'SECTION_#'),
                Sequence: request.body.Sequence ?? null,
                ParentSectionId: request.body.ParentSectionId ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<FormSectionUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                // TemplateId: joi.string().uuid().optional(),
                SectionIdentifier: joi.string().optional(),
                Title: joi.string().optional(),
                Description: joi.string().optional(),
                // DisplayCode: joi.string().optional(),
                // Sequence: joi.string().optional(),
                ParentSectionId: joi.string().uuid().optional()
            });
            await schema.validateAsync(request.body);
            return {
                SectionIdentifier: request.body.SectionIdentifier ?? null,
                Title: request.body.Title ?? null,
                Description: request.body.Description ?? null,
                // DisplayCode: request.body.DisplayCode ?? null,
                // Sequence: request.body.Sequence ?? null,
                ParentSectionId: request.body.ParentSectionId ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<FormSectionSearchFilters> => {
        try {
            const schema = joi.object({
                parentFormTemplateId: joi.string().uuid().optional(),
                sectionIdentifier: joi.string().optional(),
                title: joi.string().optional(),
                description: joi.string().optional(),
                displayCode: joi.string().optional(),
                sequence: joi.string().optional(),
                parentSectionId: joi.string().uuid().optional()
            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: ParsedQs): FormSectionSearchFilters => {
        // var filters:FormSectionSearchFilters = {};
        var filters: any = {
            // id,
            // parentFormTemplateId,
            // sectionIdentifier,
            // title,
            // description,
            // displayCode,
            // sequence,
            // parentSectionId,
        };

        var id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }

        var parentFormTemplateId = query.parentFormTemplateId ? query.parentFormTemplateId : null;
        if (parentFormTemplateId != null) {
            filters['parentFormTemplateId'] = parentFormTemplateId;
        }
        var sectionIdentifier = query.sectionIdentifier ? query.sectionIdentifier : null;
        if (sectionIdentifier != null) {
            filters['sectionIdentifier'] = sectionIdentifier;
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
        var sequence = query.sequence ? query.sequence : null;
        if (sequence != null) {
            filters['sequence'] = sequence;
        }
        var parentSectionId = query.parentSectionId ? query.parentSectionId : null;
        if (parentSectionId != null) {
            filters['parentSectionId'] = parentSectionId;
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
