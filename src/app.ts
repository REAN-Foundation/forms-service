import express from 'express';
import "reflect-metadata";
import cors from 'cors';
import { Router } from './startup/router';
import { execSync } from 'child_process';
// import { Logger } from './startup/logger';
import mysql from 'mysql2/promise';
import { Logger } from './common/logger';
import helmet from 'helmet';
import { ConfigurationManager } from './config/configuration.manager';
import { Loader } from './startup/loader';
import { Injector } from './startup/injector';
import { DatabaseClient } from './common/database.utils/dialect.clients/database.client';
// import { DatabaseSchemaType } from './common/database.utils/database.config';
import { PrimaryDatabaseConnector } from './database/database.connector';
import { DBConnector } from './database/sql/typeorm/database.connector.typeorm';
// import ErrsoleMySQL from 'errsole-mysql';
// import errsole from 'errsole';

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


    start = async (): Promise<void> => {
        try {

            // errsole.initialize({
            //     storage: new ErrsoleMySQL({
            //         host: 'localhost',
            //         user: 'root',
            //         password: process.env.PASSWORD,
            //         database: process.env.DATABASE
            //     })
            // });

             //Load configurations
            ConfigurationManager.loadConfigurations();

             //Load the modules
            await Loader.init();

            //Connect databases
            await connectDatabase_Primary();

             //Set-up middlewares
            await this.setupMiddlewares();

             



            // this.migrate();


            //Set the routes
            await this._router.init();

            //Seed the service
            // await Loader.seeder.init();

            //Start listening
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
                this._app.use(express.json( { limit: '50mb' }));
                this._app.use(helmet());
                this._app.use(cors());

                //TODO: Move this to upload specific routes. Use router.use() method
                // this.useFileUploadMiddleware();
                
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
                this._app.listen(process.env.PORT, () => {
                    Logger.instance().log(`Form Service is running and listening on PORT ${process.env.PORT}`);
                });
            }
            catch (error) {
                Logger.instance().error("Error in Starting the server", 500, error);
            }
        })
    }

    // public migrate = async () => {
    //     try {
    //         const output = execSync('npx prisma migrate dev --name init');

    //         const str = output.toString();
    //         Logger.instance().log('Database migrated successfully!');
    //         Logger.instance().log(str);

    //         return true;
    //     } catch (error) {
    //         Logger.instance().log(error.message);
    //     }
    //     return false;
    // };


    // public migrate = async () => {
    //     const databaseUrl = process.env.DATABASE_URL;

    //     if (!databaseUrl) {
    //         throw new Error('DATABASE_URL is not defined in the .env file');
    //     }

    //     // Parse the database URL to extract connection parameters
    //     const regex = /mysql:\/\/(.*?):(.*?)@(.*?):(.*?)\/(.*?)$/;
    //     const matches = databaseUrl.match(regex);
    //     if (!matches) {
    //         throw new Error('DATABASE_URL format is incorrect');
    //     }
    //     const [_, user, password, host, port, database] = matches;

    //     try {
    //         const connection = await mysql.createConnection({
    //             host,
    //             port: parseInt(port),
    //             user,
    //             password
    //         });
    //         // Directly construct the query string without placeholders
    //         const query = `SHOW DATABASES LIKE '${database}'`;
    //         const [rows]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(query);
    //         if (rows.length > 0) {
    //             Logger.instance().log(`Database ${database} already exists. Connecting and syncing...`);
    //             // Here you would add code to sync with the existing database if needed
    //         } else {
    //             Logger.instance().log(`Database ${database} does not exist. Migrating and syncing...`);
    //             execSync('npx prisma migrate dev --name init');
    //             Logger.instance().log('Database migrated and synced successfully!');
    //         }

    //         await connection.end();
    //         return true;
    //     } catch (error) {
    //         Logger.instance().error('Migration failed:', 500, error.message);
    //         Logger.instance().error('Migration failed:', 500, error.stack);
    //         // Logger.instance().log(error.message);
    //         // Logger.instance().log(error.stack); // Log stack trace for debugging purposes
    //         return false;
    //     }
    // };


}

async function connectDatabase_Primary() {
    if (process.env.NODE_ENV === 'test') {
        // const databaseClient = Injector.Container.resolve(DatabaseClient);
        // await databaseClient.dropDb(DatabaseSchemaType.Primary);
        await DatabaseClient.dropDatabase();
    }
    // const primaryDatabaseConnector = Injector.Container.resolve(PrimaryDatabaseConnector);
    DatabaseClient.createDatabase();
    await DBConnector.initialize();
}
