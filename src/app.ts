import express from 'express';
import "reflect-metadata";
import cors from 'cors';
import { Router } from './startup/router';
import { Logger } from './common/logger';
import helmet from 'helmet';
import { ConfigurationManager } from './config/configuration.manager';
import { Loader } from './startup/loader';
import { Injector } from './startup/injector';
import { DatabaseClient } from './common/database.utils/dialect.clients/database.client';
import { DBConnector } from './database/sql/typeorm/database.connector.typeorm';

/////////////////////////////////////////////////////////////////////////////////////

export default class Application {

    public _app: express.Application = null;

    private _router: Router = null;

    private static _instance: Application = null;

    private constructor() {
        this._app = express();
        this._router = new Router(this._app);
    }

    public static instance(): Application {
        return this._instance || (this._instance = new this())
    }


    start = async (): Promise<void> => {
        try {

            ConfigurationManager.loadConfigurations();

            Injector.registerInjections();

            await Loader.init();

            await connectDatabase_Primary();

            await this.setupMiddlewares();

            await this._router.init();

            await this.listen();
        }
        catch (error) {
            Logger.instance().log('An error occurred while starting Forms Service.' + error.message);
        }
    }

    private setupMiddlewares = async (): Promise<boolean> => {

        return new Promise((resolve, reject) => {
            try {
                this._app.use(express.urlencoded({ limit: '50mb', extended: true }));
                this._app.use(express.json({ limit: '50mb' }));
                this._app.use(helmet());
                this._app.use(cors());
                
                // Serve documentation
                this._app.use('/api/docs', express.static('docs'));
                this._app.get('/api/docs', (req, res) => {
                    res.sendFile('docs/index.html', { root: process.cwd() });
                });
                
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    };

    private listen = async () => {
        return new Promise((resolve, reject) => {
            try {
                const port = process.env.PORT || 3000;
                this._app.listen(port, () => {
                    Logger.instance().log(`Form Service is running and listening on PORT ${port}`);
                    resolve(true);
                });
            }
            catch (error) {
                Logger.instance().error("Error in Starting the server", 500, error);
                reject(error);
            }
        })
    }
}

async function connectDatabase_Primary() {
    if (process.env.NODE_ENV === 'test') {
        await DatabaseClient.dropDatabase();
    }
    await DatabaseClient.createDatabase();
    await DBConnector.initialize();
}
