import { ApiError } from "./api.error";

export class ErrorHandler {

    static throwInputValidationError = (errorMessages: any) => {
        var message = 'Validation error has occurred!\n';
        if (errorMessages) {
            message = message + ' ' + Array.isArray(errorMessages) ? errorMessages.join(' ') : errorMessages.toString();
            message = message.split('"').join('');
        }
        throw new ApiError(message, 422);
    }

    static throwDuplicateUserError = (message: any) => {
        throw new ApiError(message, 422);
    }

    static throwNotFoundError = (message: any) => {
        throw new ApiError(message, 404);
    }

    static throwUnauthorizedUserError = (message: any) => {
        throw new ApiError(message, 401);
    }

    static throwForebiddenAccessError = (message: any) => {
        throw new ApiError(message, 403);
    }

    static throwDbAccessError = (message: any, error: any) => {
        throw new ApiError(message, 503, error);
    }

    static throwConflictError = (message: any) => {
        throw new ApiError(message, 409);
    }

    static throwFailedPreconditionError = (message: any) => {
        throw new ApiError(message, 412);
    }

    static throwInternalServerError = (message: any, error: any) => {
        throw new ApiError(message, 500, error);
    }

    static handleValidationError = (error: any) => {
        if (error.isJoi === true) {
            //Logger.instance().log(error.message);
            const errorMessages = error.details.map((x: { message: any }) => x.message);
            ErrorHandler.throwInputValidationError(errorMessages);
        }
        else {
            ErrorHandler.throwInputValidationError(error.message);
        }
    }

}
