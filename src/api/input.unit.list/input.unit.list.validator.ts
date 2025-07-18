import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import {
    InputUnitListCreateModel,
    InputUnitListSearchFilters,
    InputUnitListUpdateModel,
} from '../../domain.types/input.unit.list.domain.types';
import BaseValidator from '../base.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class InputUnitListValidator extends BaseValidator {
    //#region member variables and constructors

    //#endregion

    public validateCreateRequest = async (
        request: express.Request
    ): Promise<InputUnitListCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().max(128).required(),
                Description: joi.string().max(512).required(),
                Units: joi.array().required(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Units: request.body.Units,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (
        request: express.Request
    ): Promise<InputUnitListUpdateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string().max(128).optional(),
                Description: joi.string().max(512).optional(),
                Units: joi.array().optional(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name ?? null,
                Description: request.body.Description ?? null,
                Units: request.body.Units ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (
        request: express.Request
    ): Promise<InputUnitListSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                name: joi.string().optional(),
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
    ): InputUnitListSearchFilters => {
        const filters: any = {};
        const id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }
        const name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
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
