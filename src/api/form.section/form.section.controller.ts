import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { error } from 'console';
import { FormSectionValidator } from './form.section.validator';
import { FormSectionService } from '../../services/form.section.service';
import { FormSectionCreateModel, FormSectionSearchFilters, FormSectionUpdateModel } from '../../domain.types/forms/form.section.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class FormSectionController extends BaseController {

    //#region member variables and constructors

    _service: FormSectionService = new FormSectionService();

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

    create = async (request: express.Request, response: express.Response) => {
        try {
            const model: FormSectionCreateModel = await this._validator.validateCreateRequest(request);

            const parentTemplateId: string = request.body.ParentFormTemplateId;
            const parentSectionId: string = request.body.ParentSectionId;

            let sequence: string;

            const sectionsByTemplateId = await this._service.getByTemplateId(parentTemplateId);

            const rootSectionResponse = await this._service.search({ title: 'Assessment Root Section', parentFormTemplateId: parentTemplateId });
            const rootSection = rootSectionResponse.Items[0];

            const defaultNumbering = sectionsByTemplateId[0]?.ParentFormTemplate.DefaultSectionNumbering;

            if (defaultNumbering) {
                if (parentSectionId === rootSection?.id) {
                    const parentSectionsResponse = await this._service.search({ parentSectionId });
                    const parentSections = parentSectionsResponse?.Items || [];

                    sequence = parentSections.length === 0 ? 'S1' : `S${parentSections.length + 1}`;
                } else {
                    const parentSectionsResponse = await this._service.search({ parentSectionId });
                    const parentSections = parentSectionsResponse?.Items || [];

                    sequence = parentSections.length === 0 ? 'SS1' : `SS${parentSections.length + 1}`;
                }
            } else {
                sequence = request.body.Sequence;
            }

            model.Sequence = sequence;

            const record = await this._service.create(model);

            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Form section!', error);
            }

            const message = 'Form section added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };


    /*
    find all sectios by template id
    find root section by Title as Assessment Root Section
    check for default section numbering 
    if yes{
        if parentSectionId === rootSectionId{

            find sections by parentSectionId

            if parentSections === null{
                sequence = s1
            }
            else {
                sequence = parentSections.length + 1}
            }
        } else {
            find sections by parentSectionId

            if parentSections === null{
                sequence = ss1
            } else {
                sequence = parentSections.length + 1}
        }
    }
    else {
    sequence = model.sequence
    }
    */

    getById = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.GetById', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'Form section retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Form.Update', request, response);
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: FormSectionUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Form section updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // await this.authorize('Form.Delete', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Form section deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByTemplateId = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.validateParamAsUUID(request, 'templateId');
            // var ida :uuid = request.params.templateId;
            const record = await this._service.getByTemplateId(id);
            const message = 'Form section by templateId retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: FormSectionSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Form section retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
