
export class ApiError extends Error {

    Trace: any = null;
    Code = 500;

    constructor(message: any, errorCode: any, error: any = null) {
        super();
        // console.log(`Message = ${message}  Error Code = ${errorCode}`)
        this.message = message ?? 'An unexpected error has occurred. ';
        this.Trace = error != null ? error.stack : '';
        this.Code = errorCode ?? 500;
    }

}
