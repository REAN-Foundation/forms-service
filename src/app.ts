import express from 'express';
import { Router } from './startup/router';
import { execSync } from 'child_process';
// import { Logger } from './startup/logger';
import mysql from 'mysql2/promise';
import { Logger } from './common/logger';
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


    start = async () => {
        try {
            this._app.use(express.json());
            this._app.use(express.urlencoded());

            // errsole.initialize({
            //     storage: new ErrsoleMySQL({
            //         host: 'localhost',
            //         user: 'root',
            //         password: process.env.PASSWORD,
            //         database: process.env.DATABASE
            //     })
            // });

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


    public migrate = async () => {
        const databaseUrl = process.env.DATABASE_URL;

        if (!databaseUrl) {
            throw new Error('DATABASE_URL is not defined in the .env file');
        }

        // Parse the database URL to extract connection parameters
        const regex = /mysql:\/\/(.*?):(.*?)@(.*?):(.*?)\/(.*?)$/;
        const matches = databaseUrl.match(regex);

        if (!matches) {
            throw new Error('DATABASE_URL format is incorrect');
        }

        const [_, user, password, tail, host, port, database] = matches;

        try {
            const connection = await mysql.createConnection({
                host,
                port: parseInt(port),
                user,
                password
            });
            // Directly construct the query string without placeholders
            const query = `SHOW DATABASES LIKE '${database}'`;
            const [rows]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(query);
            if (rows.length > 0) {
                Logger.instance().log(`Database ${database} already exists. Connecting and syncing...`);
                // Here you would add code to sync with the existing database if needed
            } else {
                Logger.instance().log(`Database ${database} does not exist. Migrating and syncing...`);
                execSync('npx prisma migrate dev --name init');
                Logger.instance().log('Database migrated and synced successfully!');
            }

            await connection.end();
            return true;
        } catch (error) {
            Logger.instance().error('Migration failed:', 500, error.message);
            Logger.instance().error('Migration failed:', 500, error.stack);
            // Logger.instance().log(error.message);
            // Logger.instance().log(error.stack); // Log stack trace for debugging purposes
            return false;
        }
    };


}