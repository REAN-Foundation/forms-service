import express from 'express';
// import { Authorizer } from '../auth/authorizer';
import { ErrorHandler } from '../common/error.handler';
import { error } from 'console';
// import { Loader } from '../startup/loader';

///////////////////////////////////////////////////////////////////////////////////////

export class BaseController {

    // _authorizer: Authorizer | null = null;

    constructor() {
        // this._authorizer = Loader.Authorizer;
    }

    authorize = async (
        context: string,
        request: express.Request,
        response: express.Response,
        authorize = true) => {

        if (context === undefined || context === null) {
            ErrorHandler.throwInternalServerError('Invalid request context',error);
        }
        const tokens = context.split('.');
        if (tokens.length < 2) {
            ErrorHandler.throwInternalServerError('Invalid request context', error);
        }
       
    };

}
