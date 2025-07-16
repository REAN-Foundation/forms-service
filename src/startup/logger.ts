export class Logger {
    private static _instance: Logger = null;

    private constructor() {}

    public static instance(): Logger {
        return this._instance || (this._instance = new this());
    }

    public log = (message: string): void => {
        if (process.env.NODE_ENV === 'test') {
            return;
        }
        const dateTime = new Date().toISOString();
        const temp_str = dateTime + '> ' + message;
        console.log(' ');
        console.log(temp_str);
    };

    public error = (message: string, code: number, details: unknown): void => {
        if (process.env.NODE_ENV === 'test') {
            return;
        }
        const dateTime = new Date().toISOString();
        const err = {
            message: message,
            code: code,
            details: details,
        };
        const temp_str = dateTime + '> ' + JSON.stringify(err, null, '    ');
        console.log(' ');
        console.log(temp_str);
    };

    logQuery(query: string, parameters?: any[]) {
        console.log(`Query: ${query}`, parameters);
    }

    logQueryError(error: string, query: string, parameters?: any[]) {
        console.error(`Error: ${error}`, query, parameters);
    }

    logQuerySlow(time: number, query: string, parameters?: any[]) {
        console.warn(`Slow query (${time}ms): ${query}`, parameters);
    }

    logSchemaBuild(message: string) {
        console.log(message);
    }

    logMigration(message: string) {
        console.log(message);
    }
}
