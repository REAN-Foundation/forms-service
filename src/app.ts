// import express from 'express';
// import 'reflect-metadata';
// import cors from 'cors';
// import { Router } from './startup/router';
// import { Logger } from './common/logger';
// import helmet from 'helmet';
// import { ConfigurationManager } from './config/configuration.manager';
// import { Loader } from './startup/loader';
// import { Injector } from './startup/injector';
// import { DatabaseClient } from './common/database.utils/dialect.clients/database.client';
// import { DBConnector } from './database/sql/typeorm/database.connector.typeorm';

// /////////////////////////////////////////////////////////////////////////////////////

// export default class Application {
//     public _app: express.Application = null;

//     private _router: Router = null;

//     private static _instance: Application = null;

//     private constructor() {
//         this._app = express();
//         this._router = new Router(this._app);
//     }

//     public static instance(): Application {
//         return this._instance || (this._instance = new this());
//     }

//     start = async (): Promise<void> => {
//         try {
//             ConfigurationManager.loadConfigurations();

//             Injector.registerInjections();

//             await Loader.init();

//             await connectDatabase_Primary();

//             await this.setupMiddlewares();

//             await this._router.init();

//             await this.listen();
//         } catch (error) {
//             Logger.instance().log(
//                 'An error occurred while starting Forms Service.' +
//                     error.message
//             );
//         }
//     };

//     private setupMiddlewares = async (): Promise<boolean> => {
//         return new Promise((resolve, reject) => {
//             try {
//                 this._app.use(
//                     express.urlencoded({ limit: '50mb', extended: true })
//                 );
//                 this._app.use(express.json({ limit: '50mb' }));
//                 this._app.use(helmet());
//                 this._app.use(cors());

//                 // Serve documentation
//                 this._app.use('/api/docs', express.static('docs'));
//                 this._app.get('/api/docs', (req, res) => {
//                     res.sendFile('docs/index.html', { root: process.cwd() });
//                 });

//                 resolve(true);
//             } catch (error) {
//                 reject(error);
//             }
//         });
//     };

//     private listen = async () => {
//         return new Promise((resolve, reject) => {
//             try {
//                 const port = process.env.PORT || 3000;
//                 this._app.listen(port, () => {
//                     Logger.instance().log(
//                         `Form Service is running and listening on PORT ${port}`
//                     );
//                     resolve(true);
//                 });
//             } catch (error) {
//                 Logger.instance().error(
//                     'Error in Starting the server',
//                     500,
//                     error
//                 );
//                 reject(error);
//             }
//         });
//     };
// }

// async function connectDatabase_Primary() {
//     if (process.env.NODE_ENV === 'test') {
//         await DatabaseClient.dropDatabase();
//     }
//     await DatabaseClient.createDatabase();
//     await DBConnector.initialize();
// }


import "reflect-metadata";
import express from 'express';
import { RouteHandler } from './startup/route.handler';
import { logger } from './logger/logger';
import { Scheduler } from './startup/scheduler';
import { Seeder } from './startup/seeder';
import { DatabaseConnector } from "./database/database.connector";
import { Injector } from "./startup/injector";
import { MiddlewareHandler } from "./startup/middleware.handler";
import { notFoundHandler } from "./startup/middlewares/not.found.handler";
import { errorHandler } from "./startup/middlewares/error.handler";

///////////////////////////////////////////////////////////////////////////////////////////

export default class Application {

    //#region Construction

    private _app: express.Application = null;

    private static _instance: Application = null;

    private constructor() {
        this._app = express();
    }

    public static instance(): Application {
        return this._instance || (this._instance = new this());
    }

    //#endregion

    public app(): express.Application {
        return this._app;
    }

    public start = async(): Promise<void> => {
        try {
            await this.warmUp();
            await this.listen();
        }
        catch (error){
            logger.error(`❌ An error occurred while starting ${process.env.SERVICE_NAME}.` + error.message);
        }
    };

    warmUp = async () => {
        await Injector.registerInjections();
        await DatabaseConnector.setup();
        await MiddlewareHandler.setup(this.app());
        await RouteHandler.setup(this.app());
        await this.initializeErrorHandlerMiddlewares();
        await Seeder.seed();
        await Scheduler.instance().schedule();
    };

    private listen = () => {
        return new Promise((resolve, reject) => {
            try {
                const port = process.env.PORT;
                const server = this._app.listen(port, () => {
                    const serviceName = `${process.env.SERVICE_NAME}-[${process.env.NODE_ENV}]`;
                    logger.info(`🚀 ${serviceName} is up and listening on port ${process.env.PORT.toString()}`);
                    logger.info(`📊 Environment: ${process.env.NODE_ENV}`);
                    logger.info(`✅ Health check: http://localhost:${port}/health-check`);
                    this._app.emit("server_started");
                });
                module.exports.server = server;
                resolve(this._app);
            }
            catch (error) {
                logger.error(`❌ An error occurred while listening on port ${process.env.PORT.toString()}.` + error.message);
                reject(error);
            }
        });
    };

    private initializeErrorHandlerMiddlewares(): void { 
        logger.info('🔥 Initializing error handler middlewares...');
        // 404 handler middleware
        this._app.use(notFoundHandler);

        // Global error handler middleware
        this._app.use(errorHandler);
    }

}
