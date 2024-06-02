import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../common/error.handler';
import { uuid } from '../domain.types/miscellaneous/system.types';
import { DownloadDisposition, FileResourceMetadata } from '../domain.types/general/file.resource/file.resource.types';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

//////////////////////////////////////////////////////////////////

export default class BaseValidator {

    public validateParamAsUUID = async (request: express.Request, paramName: string): Promise<uuid> => {
        try {
            const schema = joi.string().uuid({ version: 'uuidv4' }).required();
            const param = request.params[paramName];
            await schema.validateAsync(param);
            return request.params[paramName];
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    getByVersionName = async (request: express.Request): Promise<FileResourceMetadata> => {

        var disposition = this.getDownloadDisposition(request);

        var metadata: FileResourceMetadata = {
            ResourceId: request.params.id,
            Version: request.params.version,
            Disposition: disposition
        };

        return metadata;
    };

    public getDownloadDisposition(request: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
        var disposition = DownloadDisposition.Auto;
        if (request.query.disposition) {
            if (request.query.disposition === 'inline') {
                disposition = DownloadDisposition.Inline;
            }
            else if (request.query.disposition === 'stream') {
                disposition = DownloadDisposition.Stream;
            }
            else {
                disposition = DownloadDisposition.Attachment;
            }
        }
        return disposition;
    }

}
