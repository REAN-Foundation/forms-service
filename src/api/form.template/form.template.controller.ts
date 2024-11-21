import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { FormTemplateValidator } from './form.template.validator';
import { BaseController } from '../base.controller';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { error } from 'console';
import { FormTemplateService } from '../../services/form.template.service';
import { FormTemplateCreateModel, FormTemplateSearchFilters, FormTemplateUpdateModel } from '../../domain.types/forms/form.template.domain.types';
import { FormSectionService } from '../../services/form.section.service';
import { generateDisplayCode } from '../../domain.types/miscellaneous/display.code';
import { ApiError } from '../../common/api.error';
import { Helper } from '../../domain.types/miscellaneous/helper';
import fs from 'fs';

///////////////////////////////////////////////////////////////////////////////////////

export class FormTemplateController extends BaseController {

    _service: FormTemplateService = new FormTemplateService();

    _section: FormSectionService = new FormSectionService();

    _validator: FormTemplateValidator = new FormTemplateValidator();

    constructor() {
        super();
    }

    //#endregion

    // getAll = async (request: express.Request, response: express.Response) => {
    //     try {
    //         const record = await this._service.allFormTemplates();
    //         if (record === null) {
    //             ErrorHandler.throwInternalServerError('Unable to add Form!', error);
    //         }
    //         const message = 'All Form templates retrived successfully!';
    //         return ResponseHandler.success(request, response, message, 201, record);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // }

    create = async (request: express.Request, response: express.Response) => {
        try {
            let model: FormTemplateCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Form!', error);
            }

            const displayCode = generateDisplayCode(25, 'SECTION_#');
            const sectionModel = {
                ParentFormTemplateId: record.id,
                SectionIdentifier: "Root Section",
                Title: "Assessment Root Section",
                Description: "This is root section for this template Description",
                DisplayCode: displayCode,
                Sequence: 'A1'
            }
            const section = await this._section.create(sectionModel)
            const message = 'Form template added successfully!';
            let templateModel = {
                RootSectionId: section.id
            }
            const rec = await this._service.update(record.id, templateModel)
            return ResponseHandler.success(request, response, message, 201, rec);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'Form template retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getDetailsById = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getDetailsById(id);
            const message = 'Form template and its data retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    exportTemplate = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // Validate 'id' as a UUID
            const id: string = await this._validator.validateParamAsUUID(request, 'id');

            // Fetch assessment template
            const assessmentTemplate = await this._service.getById(id);
            if (!assessmentTemplate) {
                throw new ApiError('Cannot find assessment template!', 404);
            }

            // Retrieve and prepare the template object for export
            const templateObj = await this._service.readTemplateObjToExport(assessmentTemplate.id);

            // Store template as a file locally
            const { dateFolder, filename, sourceFileLocation } = await Helper.storeTemplateToFileLocally(templateObj);

            // Set response headers for file download
            const mimeType = Helper.getMimeType(sourceFileLocation);
            response.setHeader('Content-Type', mimeType);
            response.setHeader('Content-Disposition', `attachment; filename=${filename}`);

            // Stream the file to the response
            const filestream = fs.createReadStream(sourceFileLocation);
            filestream.pipe(response);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: FormTemplateUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Form templated updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Form template deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    submissions = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.submissions(id);
            const message = 'Form retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: FormTemplateSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Form template retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}