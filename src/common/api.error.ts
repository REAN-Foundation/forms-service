
export class ApiError extends Error {

    Trace: any = null;
    Code = 500;

    constructor(message: any, errorCode: any, error: any = null) {
        super();
        this.message = message ?? 'An unexpected error has occurred. ';
        this.message = this.message + (error != null ? '> ' + error.message : '');
        this.Trace = error != null ? error.stack : '';
        this.Code = errorCode ?? 500;
    }

}
