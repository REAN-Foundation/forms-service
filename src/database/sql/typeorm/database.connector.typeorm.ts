import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
// import { Dialect } from 'sequelize';
// import { Sequelize } from 'sequelize-typescript';
// import { Logger } from '../../../common/logger';
import { IPrimaryDatabaseConnector } from '../../database.connector.interface';
import { DatabaseSchemaType, databaseConfig } from '../../../common/database.utils/database.config';
import { DataSource } from 'typeorm';
import { FavoriteTemplate } from './models/favorite.template/favorite.template.model';
import { FormSection } from './models/form.section/form.section.model';
import { FormSubmission } from './models/form.submission/form.submission.model';
import { FormTemplate } from './models/form.template/form.template.model';
import { FormTemplateApproval } from './models/form.template.approval/form.template.approval.model';
import { InputUnitList } from './models/input.unit.list/input.unit.list.model';
import { Question } from './models/question/question.model';
import { QuestionResponse } from './models/question.response/question.response.model';
import { TemplateFolder } from './models/template.folder/template.folder.model';
import { User } from './models/user/user.model';
import { Logger } from '../../../startup/logger';

const Config = databaseConfig(DatabaseSchemaType.Primary);

//////////////////////////////////////////////////////////////

export class DatabaseConnector_TypeOrm implements IPrimaryDatabaseConnector {
  // private _sequelize: Sequelize = null;

  // public static db: Sequelize = null;

  public _source = new DataSource({
    name: Config.Dialect,
    type: Config.Dialect as any,
    host: Config.Host,
    port: Config.Port,
    username: Config.Username,
    password: Config.Password,
    database: Config.DatabaseName,
    synchronize: true,
    entities: [
      FavoriteTemplate,
      FormSection,
      FormSubmission,
      FormTemplate,
      FormTemplateApproval,
      InputUnitList,
      Question,
      QuestionResponse,
      TemplateFolder,
      User,
    ],
    migrations: [],
    subscribers: [],
    // logger: new DBLogger(),
     logger: Logger.instance(),
    logging: true,
    poolSize: Config.Pool.Max,
    cache: true,
  });

  // public connect = async (): Promise<boolean> => {
  //     try {

  //         const config = databaseConfig(DatabaseSchemaType.Primary);
  //         const modelsFolder = path.join(__dirname, '/models');
  //         const modelsPath = getFoldersRecursively(modelsFolder);
  //         const options = {
  //             host    : config.Host,
  //             dialect : config.Dialect,
  //             models  : modelsPath,
  //             pool    : {
  //                 max     : config.Pool.Max,
  //                 min     : config.Pool.Min,
  //                 acquire : config.Pool.Acquire,
  //                 idle    : config.Pool.Idle,
  //             },
  //             logging : false, //TODO: Please provide a function here to handle logging...
  //         };

  //         const sequelize = new Sequelize(config.DatabaseName, config.Username, config.Password, options);
  //         this._sequelize = sequelize;

  //         Logger.instance().log(`Connecting to database '${config.DatabaseName}' ...`);

  //         const databaseClient = Injector.Container.resolve(DatabaseClient);
  //         await databaseClient.createDb(DatabaseSchemaType.Primary);

  //         await this._sequelize.authenticate();
  //         await this._sequelize.sync({ force: false, alter: true });

  //         Logger.instance().log(`Connected to database '${config.DatabaseName}'.`);

  //         DatabaseConnector_Sequelize.db = this._sequelize;

  //         return true;

  //     } catch (error) {
  //         Logger.instance().log(error.message);
  //         return false;
  //     }
  // };

  public connect = async (): Promise<boolean> => {
    try {
      const config = databaseConfig(DatabaseSchemaType.Primary);
      const entitiesFolder = path.join(__dirname, "/models");
      const entitiesPath = getFoldersRecursively(entitiesFolder);

      Logger.instance().log(
        `Connecting to database '${config.DatabaseName}' ...`
      );

      const options = {
        type: config.Dialect as any,
        host: config.Host,
        port: config.Port || 3306,
        username: config.Username,
        password: config.Password,
        database: config.DatabaseName,
        entity: entitiesPath,
        entities: [
            path.join(entitiesFolder, '**/*.model{.ts,.js}') // Common TypeORM entity pattern
        ],
        synchronize: true,
        logging: false,
        poolSize: config.Pool?.Max || 10,
        extra: {
          connectionLimit: config.Pool?.Max || 10,
          idleTimeout: config.Pool?.Idle || 10000,
          acquireTimeout: config.Pool?.Acquire || 30000,
        },
      };

      this._source = new DataSource(options);
      await this._source.initialize();

      Logger.instance().log(`Connected to database '${config.DatabaseName}'.`);

      return true;
    } catch (error) {
      Logger.instance().log(
        error instanceof Error
          ? error.message
          : "Unknown database connection error"
      );
      return false;
    }
  };

  // public db = (): Sequelize => {
  //     return this._sequelize;
  // };

  // public sync = async () => {
  //     try {
  //         await this._sequelize.sync({ alter: true });
  //         return true;
  //     } catch (error) {
  //         Logger.instance().log(error.message);
  //     }
  //     return false;
  // };

  public sync = async () => {
    try {
      if (!this._source.isInitialized) {
        await this._source.initialize();
      }

      await this._source.synchronize();

      return true;
    } catch (error) {
      Logger.instance().log(
        error instanceof Error ? error.message : "Unknown synchronization error"
      );
      return false;
    }
  };

  // public migrate = async () => {
  //     try {
  //         const output = execSync('npx sequelize-cli db:migrate');

  //         const str = output.toString();
  //         Logger.instance().log('Database migrated successfully!');
  //         Logger.instance().log(str);

  //         return true;
  //     } catch (error) {
  //         Logger.instance().log(error.message);
  //     }
  //     return false;
  // };
  public migrate = async (): Promise<boolean> => {
    try {
      if (!this._source.isInitialized) {
        await this._source.initialize();
      }

      // Run pending migrations
      const migrations = await this._source.runMigrations();

      if (migrations.length > 0) {
        Logger.instance().log("Database migrated successfully!");
        migrations.forEach((migration) => {
          Logger.instance().log(`Executed migration: ${migration.name}`);
        });
      } else {
        Logger.instance().log("No pending migrations found.");
      }

      return true;
    } catch (error) {
      Logger.instance().log(
        error instanceof Error ? error.message : "Migration error"
      );
      return false;
    }
  };

//   public executeQuery = async (query: string): Promise<any> => {
//     try {
//       const result = await this._sequelize.query(query);
//       return result;
//     } catch (error) {
//       Logger.instance().log(error.message);
//       Logger.instance().log(`Error trace: ${error.stack}`);
//     }
//     return null;
//   };

   public executeQuery = async (query: string): Promise<any> => {
    try {
        if (!this._source.isInitialized) {
            await this._source.initialize();
        }

        // For SELECT queries that return data
        const result = await this._source.query(query);
        return result;
        
    } catch (error) {
        Logger.instance().log(error instanceof Error ? error.message : 'Query execution error');
        Logger.instance().log(`Error trace: ${error instanceof Error ? error.stack : 'No stack trace'}`);
        throw error; // Consider throwing instead of returning null
    }
};
}

///////////////////////////////////////////////////////////////////////////////////////////

function getFoldersRecursively(location: string) {
    const items = fs.readdirSync(location, { withFileTypes: true });
    let paths = [];
    for (const item of items) {
        if (item.isDirectory()) {
            const fullPath = path.join(location, item.name);
            const childrenPaths = getFoldersRecursively(fullPath);
            paths = [
                ...paths,
                fullPath,
                ...childrenPaths,
            ];
        }
    }
    return paths;
}

const dbTypeOrm= new DatabaseConnector_TypeOrm();

export const Source = dbTypeOrm._source;
