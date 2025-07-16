import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/handlers/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { error } from 'console';
import { FormSectionValidator } from './form.section.validator';
import { FormSectionService } from '../../services/form.section/form.section.service';
import {
    FormSectionCreateModel,
    FormSectionSearchFilters,
    FormSectionUpdateModel,
} from '../../domain.types/forms/form.section.domain.types';
import { Injector } from '../../startup/injector';
import { FormTemplateService } from '../../services/form.template/form.template.service';

///////////////////////////////////////////////////////////////////////////////////////

export class FormSectionController extends BaseController {
    //#region member variables and constructors

    // _service: FormSectionService = new FormSectionService();

    _service: FormSectionService =
        Injector.Container.resolve(FormSectionService);

    _templService: FormTemplateService =
        Injector.Container.resolve(FormTemplateService);

    _validator: FormSectionValidator = new FormSectionValidator();

    constructor() {
        super();
    }

    //#endregion

    // getAll = async (request: express.Request, response: express.Response) => {
    //     try {
    //         const record = await this._service.allFormSections();
    //         if (record === null) {
    //             ErrorHandler.throwInternalServerError('Unable to Load all sections!', error);
    //         }
    //         const message = 'All form sections retrived successfully!';
    //         return ResponseHandler.success(request, response, message, 201, record);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // }

    // create = async (request: express.Request, response: express.Response) => {
    //     try {
    //         // Validate the request body
    //         const model: FormSectionCreateModel = await this._validator.validateCreateRequest(request);

    //         const parentTemplateId: string = request.body.ParentFormTemplateId;
    //         const parentSectionId: string = request.body.ParentSectionId;

    //         let sequence: string;

    //         // Fetch sections by parentTemplateId
    //         const sectionsByTemplateId = await this._service.getByTemplateId(parentTemplateId);

    //         // Check if DefaultSectionNumbering is false
    //         if (sectionsByTemplateId[0]?.ParentFormTemplate.DefaultSectionNumbering === false) {
    //             // Use the sequence provided in the request body
    //             sequence = request.body.Sequence;
    //         } else {
    //             // Check if parentSectionId exists
    //             if (parentSectionId) {
    //                 // Fetch the parent section details
    //                 const parentSectionResponse = await this._service.search({ parentSectionId });

    //                 // Debugging log to check the items
    //                 console.log('ParentSectionId:', parentSectionId);
    //                 console.log('ParentSectionResponse Items:', parentSectionResponse?.Items);

    //                 // Initialize parentSection as null
    //                 let parentSection = null;

    //                 // Iterate through Items to find the matching parentSectionId
    //                 for (const section of parentSectionResponse?.Items || []) {
    //                     if (section.id === parentSectionId) {
    //                         parentSection = section;
    //                         break; // Exit the loop once the section is found
    //                     }
    //                 }

    //                 if (!parentSection) {
    //                     throw new Error(`Parent section with ID ${parentSectionId} not found.`);
    //                 }

    //                 // Check if the parent section is 'Assessment Root Section'
    //                 if (parentSection.Title === 'Assessment Root Section') {
    //                     // Fetch all child sections of this parentSectionId
    //                     const childSections = parentSectionResponse?.Items || [];

    //                     // Calculate sequence for root sections (S1, S2, ...)
    //                     sequence = `S${childSections.length + 1}`;
    //                 } else {
    //                     // Fetch all child sections of this parentSectionId
    //                     const childSections = parentSectionResponse?.Items || [];

    //                     // Calculate sequence for non-root sections (SS1, SS2, ...)
    //                     sequence = `SS${childSections.length + 1}`;
    //                 }
    //             }
    //             else {
    //                 // If no parentSectionId, calculate sequence using ParentTemplateId
    //                 sequence = `A${sectionsByTemplateId.length + 1}`;
    //             }
    //         }

    //         model.Sequence = sequence;

    //         // Create the section record
    //         const record = await this._service.create(model);

    //         if (record === null) {
    //             ErrorHandler.throwInternalServerError('Unable to add Form section!', error);
    //         }

    //         const message = 'Form section added successfully!';
    //         return ResponseHandler.success(request, response, message, 201, record);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };
    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: FormSectionCreateModel =
                await this._validator.validateCreateRequest(request);
            const parentTemplateId: string = request.body.ParentFormTemplateId;
            const sectionsByTemplateId =
                await this._service.getByTemplateId(parentTemplateId);

            let sequence;

            // sectionsByTemplateId.forEach(element => {
            //     if (element.ParentFormTemplate.DefaultSectionNumbering === true) {
            //         sequence = (sectionsByTemplateId.length + 1);
            //     } else {
            //         sequence = request.body.Sequence;
            //     }
            // });

            const templateData =
                await this._templService.getById(parentTemplateId);

            if (templateData.DefaultSectionNumbering === true) {
                sequence = Object.keys(sectionsByTemplateId).length + 1;
            } else {
                sequence = request.body.Sequence;
            }

            model.Sequence = sequence;
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError(
                    'Unable to add Form section!',
                    error
                );
            }
            const message = 'Form section added successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                201,
                record
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.GetById', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const record = await this._service.getById(id);
            const message = 'Form section retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                record
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Update', request, response);
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: FormSectionUpdateModel =
                await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Form section updated successfully!';
            ResponseHandler.success(
                request,
                response,
                message,
                200,
                updatedRecord
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        try {
            // await this.authorize('Form.Delete', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(
                request,
                'id'
            );
            const result = await this._service.delete(id);
            const message = 'Form section deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByTemplateId = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            var id: uuid = await this._validator.validateParamAsUUID(
                request,
                'templateId'
            );
            // var ida :uuid = request.params.templateId;
            const record = await this._service.getByTemplateId(id);
            const message =
                'Form section by templateId retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                record
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: FormSectionSearchFilters =
                await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Form section retrieved successfully!';
            ResponseHandler.success(
                request,
                response,
                message,
                200,
                searchResults
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
