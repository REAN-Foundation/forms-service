import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import {
    TemplateFolderCreateModel,
    TemplateFolderSearchFilters,
    TemplateFolderUpdateModel,
} from '../../domain.types/template.folder.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class TemplateFolderValidator extends BaseValidator {
    //#region member variables and constructors

    //#endregion

    public validateCreateRequest = async (
        request: express.Request
    ): Promise<TemplateFolderCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().max(128).required(),
                Description: joi.string().max(512).optional(),
                ParentFolderId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                ParentFolderId: request.body.ParentFolderId,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (
        request: express.Request
    ): Promise<TemplateFolderUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().max(128).optional(),
                Description: joi.string().max(512).optional(),
                ParentFolderId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name ?? null,
                Description: request.body.Description ?? null,
                ParentFolderId: request.body.ParentFolderId ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (
        request: express.Request
    ): Promise<TemplateFolderSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
                parentFolderId: joi.string().uuid().optional(),
                itemsPerPage: joi.number().optional(),
                pageIndex: joi.number().optional(),
                orderBy: joi.string().optional(),
                order: joi.string().optional(),
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

    private getSearchFilters = (
        query: any
    ): TemplateFolderSearchFilters => {
        const filters: any = {};
        const id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }
        const name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        const parentFolderId = query.parentFolderId
            ? query.parentFolderId
            : null;
        if (parentFolderId != null) {
            filters['ParentFolderId'] = parentFolderId;
        }
        const itemsPerPage = query.itemsPerPage ? query.itemsPerPage : 25;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = Number(itemsPerPage);
        }
        const orderBy = query.orderBy ? query.orderBy : 'CreatedAt';
        if (orderBy != null) {
            filters['OrderBy'] = orderBy;
        }
        const order = query.order ? query.order : 'ASC';
        if (order != null) {
            filters['Order'] = order;
        }
        const pageIndex = query.pageIndex ? query.pageIndex : 0;
        if (pageIndex != null) {
            filters['PageIndex'] = pageIndex;
        }
        return filters;
    };
}
