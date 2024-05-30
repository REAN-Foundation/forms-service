import express from 'express';
import { Router } from './startup/router';
import { execSync } from 'child_process';
import { Logger } from './startup/logger';

export default class Application {

    public _app: express.Application = null;

    private _router: Router = null;

    private static _instance: Application = null;

    private constructor() {
        this._app = express();
        this._router = new Router(this._app);
    }

    public static instance(): Application {
        // if (this._instance === null) {
        //     this._instance = new this();
        //     return this._instance;
        // }
        // else {
        //     return this._instance;
        // }
        return this._instance || (this._instance = new this())
    }

    start = async () => {
        try {
            this._app.use(express.json());
            this._app.use(express.urlencoded());

            this.migrate();
            this._router.init();
            this.listen();
        }
        catch (error) {
        }
    }

    private listen = async () => {
        return new Promise((resolve, reject) => {
            try {
                this._app.listen(process.env.PORT, () => {
                    Logger.instance().log(`Form Service is running and listening on PORT ${process.env.PORT}`);
                });
            }
            catch (error) {
                Logger.instance().log("Error in Starting the server");
            }
        })
    }

    public migrate = async () => {
        try {
            const output = execSync('npx prisma migrate dev --name init');

            const str = output.toString();
            Logger.instance().log('Database migrated successfully!');
            Logger.instance().log(str);

            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

}