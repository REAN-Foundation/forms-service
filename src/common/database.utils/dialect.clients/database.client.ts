// import { DatabaseSchemaType } from "../database.config";
import { Logger } from '../../../common/logger';
import { DatabaseDialect } from '../../../domain.types/miscellaneous/system.types';
import { IDatabaseClient } from './database.client.interface';
import { MysqlClient } from "./mysql.client";
// import { PostgresqlClient } from "./postgresql.client";

//////////////////////////////////////////////////////////////////////////////

export class DatabaseClient {

    // _client = null;

    // constructor() {
    //     const dialect = process.env.DB_DIALECT as DatabaseDialect;
    //     if (dialect === 'mysql') {
    //         this._client = MysqlClient.getInstance();
    //     } else if (dialect === 'postgres') {
    //         this._client = PostgresqlClient.getInstance();
    //     } else {
    //         // this._client = SQLiteClient.getInstance();
    //     }

    // }

    // public createDb = async (schemaType: DatabaseSchemaType): Promise<boolean> => {
    //     return await this._client.createDb(schemaType);
    // };

    // public dropDb = async (schemaType: DatabaseSchemaType): Promise<boolean> => {
    //     return await this._client.dropDb(schemaType);
    // };

    // public executeQuery = async (schemaType: DatabaseSchemaType, query: string): Promise<boolean> => {
    //     return await this._client.executeQuery(schemaType, query);
    // };

     static _client: IDatabaseClient =  new MysqlClient();

    //Creates DB if does not exist
    public static createDatabase = async () => {
        try {
            await this._client.createDb();
            return true;
        } catch (error) {
             Logger.instance().log(error.message);
        }
        return false;
    };

    //Drops DB if exists
    public static dropDatabase = async () => {
        try {
            await this._client.dropDb();
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

    //Drops DB if exists
    public static executeQuery = async (query: string) => {
        try {
            await this._client.executeQuery(query);
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

    // public static migrate = async () => {
    //     try {
    //         const output = execSync('npx sequelize-cli db:migrate');
    //         const str = output.toString();
    //         logger.info('Database migrated successfully!');
    //         logger.info(str);
    //         return true;
    //     } catch (error) {
    //         logger.error(error.message);
    //     }
    //     return false;
    // };

}
