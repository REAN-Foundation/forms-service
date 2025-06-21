
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// import mysql, { Connection } from 'mysql2/promise';
// import { Logger } from '../../logger';
// import { DatabaseSchemaType, databaseConfig } from '../database.config';
// import { IDatabaseClient } from './database.client.interface';

// //////////////////////////////////////////////////////////////////////////////

// export class MysqlClient implements IDatabaseClient {

//     private connection: Connection = null;

//     private static instance: MysqlClient = null;
   
//     private constructor() {}

//     public static getInstance() {
//         return this.instance || (this.instance = new MysqlClient());
//     }

//     public connect = async (schemaType: DatabaseSchemaType): Promise<any> => {
//         try {
//             const config = databaseConfig(schemaType);
//             this.connection = await mysql.createConnection({
//                 database : config.DatabaseName,
//                 host     : config.Host,
//                 user     : config.Username,
//                 password : config.Password,
//             });

//         } catch (error) {
//             Logger.instance().log(error.message);
//             Logger.instance().log(`Error trace: ${error.stack}`);
//         }
//     };

//     public createDb = async (schemaType: DatabaseSchemaType): Promise<boolean> => {
//         try {
//             const config = databaseConfig(schemaType);
//             //var query = `CREATE DATABASE ${config.database} CHARACTER SET utf8 COLLATE utf8_general_ci;`;
//             const query = `CREATE DATABASE ${config.DatabaseName}`;
//             return await this.execute(schemaType, query);
//         } catch (error) {
//             Logger.instance().log(error.message);
//         }
//     };

//     public dropDb = async (schemaType: DatabaseSchemaType): Promise<boolean> => {
//         try {
//             const config = databaseConfig(schemaType);
//             const query = `DROP DATABASE IF EXISTS ${config.DatabaseName}`;
//             return await this.execute(schemaType, query);
//         } catch (error) {
//             Logger.instance().log(error.message);
//         }
//     };

//     public executeQuery = async (query: string): Promise<any> => {
//         try {
//             const result = await this.connection.query(query);
//             return result;
//         } catch (error) {
//             Logger.instance().log(error.message);
//             Logger.instance().log(`Error trace: ${error.stack}`);
//         }
//         return null;
//     };

//     public execute = async (schemaType: DatabaseSchemaType, query: string): Promise<boolean> => {

//         try {
//             const config = databaseConfig(schemaType);

//             const connection = await mysql.createConnection({
//                 host     : config.Host,
//                 user     : config.Username,
//                 password : config.Password,
//             });

//             await connection.query(query);
//             return true;
//         } catch (error) {
//             Logger.instance().log(error.message);
//         }
//     };

//     public closeDbConnection = async () => {
//         try {
//             await this.connection.end();
//         } catch (error) {
//             Logger.instance().log(error.message);
//         }
//     };

// }

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const mysql = require('mysql2');
import mysql from 'mysql2';
import { Logger } from '../../../startup/logger';
// import { Logger } from '../../../common/logger';
import { Config } from '../database.config';

////////////////////////////////////////////////////////////////

export class MysqlClient {

    public createDb = async () => {
        try {
            const query = `CREATE DATABASE ${Config.database}`;
            await this.executeQuery(query);
            Logger.instance().log(`Database ${Config.database} created successfully!`);
        } catch (error) {
            Logger.instance().log(error.message);
        }
    };

    public dropDb = async () => {
        try {
            const query = `DROP DATABASE IF EXISTS ${Config.database}`;
            await this.executeQuery(query);
        } catch (error) {
            Logger.instance().log(error.message);
        }
    };

    public executeQuery = (query): Promise<unknown> => {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, reject) => {
            try {
                const connection = mysql.createConnection({
                    host     : Config.host,
                    user     : Config.username,
                    password : Config.password,
                });

                connection.connect(function (err) {
                    if (err) {
                        Logger.instance().log(err.message);
                        reject(err);
                    }

                    connection.query(query, function (err, result) {
                        if (err) {
                            Logger.instance().log(err.message);

                            var str = (result !== undefined && result !== null) ? result.toString() : null;
                            if (str != null) {
                                Logger.instance().log(str);
                            }
                            else {
                                Logger.instance().log(`Query: ${query}`);
                            }
                            reject(err);
                        }
                        resolve(true);
                    });
                });

            }
            catch (error) {
                Logger.instance().log(error.message);
            }
        });

    };

}

