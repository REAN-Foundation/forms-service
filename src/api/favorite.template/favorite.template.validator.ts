import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/handlers/error.handler';
import BaseValidator from '../base.validator';
import { FavoriteTemplateCreateModel, FavoriteTemplateSearchFilters, FavoriteTemplateUpdateModel } from '../../domain.types/forms/favorite.template.domain.types';
import { ParsedQs } from 'qs';

export class FavoriteTemplateValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<FavoriteTemplateCreateModel> => {
        try {
            const schema = joi.object({
                UserId: joi.string().uuid().required(),
                TemplateId: joi.string().uuid().required()
            });
            await schema.validateAsync(request.body);
            return {
                UserId: request.body.UserId,
                TemplateId: request.body.TemplateId
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<FavoriteTemplateUpdateModel> => {
        try {
            const schema = joi.object({
                UserId: joi.string().uuid().optional(),
                TemplateId: joi.string().uuid().optional()
            });
            await schema.validateAsync(request.body);
            return {
                UserId: request.body.UserId ?? null,
                TemplateId: request.body.TemplateId ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<FavoriteTemplateSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                userId: joi.string().uuid().optional(),
                templateId: joi.string().uuid().optional(),
                itemsPerPage: joi.number().optional(),
                pageIndex: joi.number().optional(),
                orderBy: joi.string().optional(),
                order: joi.string().optional()
            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: ParsedQs): FavoriteTemplateSearchFilters => {
        const filters: any = {};

        const id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }

        const userId = query.userId ? query.userId : null;
        if (userId != null) {
            filters['UserId'] = userId;
        }

        const templateId = query.templateId ? query.templateId : null;
        if (templateId != null) {
            filters['TemplateId'] = templateId;
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