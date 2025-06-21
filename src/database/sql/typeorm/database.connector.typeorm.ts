// import "reflect-metadata";
// import * as fs from 'fs';
// import * as path from 'path';
// import { execSync } from 'child_process';
// // import { Dialect } from 'sequelize';
// // import { Sequelize } from 'sequelize-typescript';
// // import { Logger } from '../../../common/logger';
// import { IPrimaryDatabaseConnector } from '../../database.connector.interface';
// import { DatabaseSchemaType, databaseConfig } from '../../../common/database.utils/database.config';
// import { DataSource, DataSourceOptions } from 'typeorm';
// import { FavoriteTemplate } from './models/favorite.template/favorite.template.model';
// import { FormSection } from './models/form.section/form.section.model';
// import { FormSubmission } from './models/form.submission/form.submission.model';
// import { FormTemplate } from './models/form.template/form.template.model';
// import { FormTemplateApproval } from './models/form.template.approval/form.template.approval.model';
// import { InputUnitList } from './models/input.unit.list/input.unit.list.model';
// import { Question } from './models/question/question.model';
// import { QuestionResponse } from './models/question.response/question.response.model';
// import { TemplateFolder } from './models/template.folder/template.folder.model';
// import { User } from './models/user/user.model';
// import { Logger } from '../../../startup/logger';
// import { Injector } from "../../../startup/injector";
// import { DatabaseClient } from "../../../common/database.utils/dialect.clients/database.client";

// const Config = databaseConfig(DatabaseSchemaType.Primary);

// //////////////////////////////////////////////////////////////

// export class DatabaseConnector_TypeOrm implements IPrimaryDatabaseConnector {
//   // private _sequelize: Sequelize = null;

//   // public static db: Sequelize = null;

//   public static _source = new DataSource({
//     name: Config.Dialect,
//     type: Config.Dialect,
//     host: Config.Host,
//     port: Config.Port,
//     username: Config.Username,
//     password: Config.Password,
//     database: Config.DatabaseName,
//     synchronize: true,
//     entities: [
//       // FavoriteTemplate,
//       // FormSection,
//       // FormSubmission,
//       // FormTemplate,
//       // FormTemplateApproval,
//       // InputUnitList,
//       // Question,
//       // QuestionResponse,
//       // TemplateFolder,
//       User,
//     ],
//     migrations: [],
//     subscribers: [],
//     // logger: new DBLogger(),
//      logger: Logger.instance(),
//     logging: true,
//     // poolSize: Config.Pool.Max,
//     cache: true,
//   });

//   // public connect = async (): Promise<boolean> => {
//   //     try {

//   //         const config = databaseConfig(DatabaseSchemaType.Primary);
//   //         const modelsFolder = path.join(__dirname, '/models');
//   //         const modelsPath = getFoldersRecursively(modelsFolder);
//   //         const options = {
//   //             host    : config.Host,
//   //             dialect : config.Dialect,
//   //             models  : modelsPath,
//   //             pool    : {
//   //                 max     : config.Pool.Max,
//   //                 min     : config.Pool.Min,
//   //                 acquire : config.Pool.Acquire,
//   //                 idle    : config.Pool.Idle,
//   //             },
//   //             logging : false, //TODO: Please provide a function here to handle logging...
//   //         };

//   //         const sequelize = new Sequelize(config.DatabaseName, config.Username, config.Password, options);
//   //         this._sequelize = sequelize;

//   //         Logger.instance().log(`Connecting to database '${config.DatabaseName}' ...`);

//   //         const databaseClient = Injector.Container.resolve(DatabaseClient);
//   //         await databaseClient.createDb(DatabaseSchemaType.Primary);

//   //         await this._sequelize.authenticate();
//   //         await this._sequelize.sync({ force: false, alter: true });

//   //         Logger.instance().log(`Connected to database '${config.DatabaseName}'.`);

//   //         DatabaseConnector_Sequelize.db = this._sequelize;

//   //         return true;

//   //     } catch (error) {
//   //         Logger.instance().log(error.message);
//   //         return false;
//   //     }
//   // };

//   public connect = async (): Promise<boolean> => {
//     try {
//       const config = databaseConfig(DatabaseSchemaType.Primary);
//       // const entitiesFolder = path.join(__dirname, "/models");
//       // const entitiesPath = getFoldersRecursively(entitiesFolder);

//       Logger.instance().log(
//         `Connecting to database '${config.DatabaseName}' ...`
//       );

//       // const options : DataSourceOptions= {
//       //   name: Config.Dialect,
//       //   type: config.Dialect,
//       //   host: config.Host,
//       //   port: config.Port || 3306,
//       //   username: config.Username,
//       //   password: config.Password,
//       //   database: config.DatabaseName,
//       //   entities: [
//       //     // FormTemplate,
//       //     // FavoriteTemplate,
//       //     // FormSection,
//       //     // FormSubmission,
//       //     // FormTemplateApproval,
//       //     // InputUnitList,
//       //     // Question,
//       //     // QuestionResponse,
//       //     // TemplateFolder,
//       //     User,
//       //   ],
//       //   synchronize: true,
//       //   logging: true,
//       //   migrations: [],
//       //   subscribers: [],
//       //   // logger: new DBLogger(),
//       //   logger: Logger.instance(),
//       //   cache: true
//       //   // poolSize: config.Pool?.Max || 10,
//       //   // extra: {
//       //   //   connectionLimit: config.Pool?.Max || 10,
//       //   //   idleTimeout: config.Pool?.Idle || 10000,
//       //   //   // acquireTimeout: config.Pool?.Acquire || 30000,
//       //   // },
//       // };

//       // this._source = new DataSource(options);

//       const databaseClient = Injector.Container.resolve(DatabaseClient);
//       await databaseClient.createDb(DatabaseSchemaType.Primary);

//       await this.initialize();

//       // await this._source.initialize();

//       Logger.instance().log(
//         `${FormTemplate}`
//       );

//       // Logger.instance().log(`Connected to database '${config.DatabaseName}'.`);

//       return true;
//     } catch (error) {
//       Logger.instance().log(
//         error instanceof Error
//           ? error.message
//           : "Unknown database connection error"
//       );
//       return false;
//     }
//   };

//    private initialize = (): Promise<boolean> => {
//         return new Promise((resolve, reject) => {
//             this._source
//                 .initialize()
//                 .then(() => {
//                     Logger.instance().log('Database connection has been established successfully.');
//                     resolve(true);
//                 })
//                 .catch((error) => {
//                     Logger.instance().log('Unable to connect to the database:' + error.message);
//                     reject(false);
//                 });
//         });
//     };

//   // public db = (): Sequelize => {
//   //     return this._sequelize;
//   // };

//   // public sync = async () => {
//   //     try {
//   //         await this._sequelize.sync({ alter: true });
//   //         return true;
//   //     } catch (error) {
//   //         Logger.instance().log(error.message);
//   //     }
//   //     return false;
//   // };

//   public sync = async () => {
//     try {
//       if (!this._source.isInitialized) {
//         await this._source.initialize();
//       }

//       await this._source.synchronize();

//       return true;
//     } catch (error) {
//       Logger.instance().log(
//         error instanceof Error ? error.message : "Unknown synchronization error"
//       );
//       return false;
//     }
//   };

//   // public migrate = async () => {
//   //     try {
//   //         const output = execSync('npx sequelize-cli db:migrate');

//   //         const str = output.toString();
//   //         Logger.instance().log('Database migrated successfully!');
//   //         Logger.instance().log(str);

//   //         return true;
//   //     } catch (error) {
//   //         Logger.instance().log(error.message);
//   //     }
//   //     return false;
//   // };
//   public migrate = async (): Promise<boolean> => {
//     try {
//       if (!this._source.isInitialized) {
//         await this._source.initialize();
//       }

//       // Run pending migrations
//       const migrations = await this._source.runMigrations();

//       if (migrations.length > 0) {
//         Logger.instance().log("Database migrated successfully!");
//         migrations.forEach((migration) => {
//           Logger.instance().log(`Executed migration: ${migration.name}`);
//         });
//       } else {
//         Logger.instance().log("No pending migrations found.");
//       }

//       return true;
//     } catch (error) {
//       Logger.instance().log(
//         error instanceof Error ? error.message : "Migration error"
//       );
//       return false;
//     }
//   };

// //   public executeQuery = async (query: string): Promise<any> => {
// //     try {
// //       const result = await this._sequelize.query(query);
// //       return result;
// //     } catch (error) {
// //       Logger.instance().log(error.message);
// //       Logger.instance().log(`Error trace: ${error.stack}`);
// //     }
// //     return null;
// //   };

//    public executeQuery = async (query: string): Promise<any> => {
//     try {
//         if (!this._source.isInitialized) {
//             await this._source.initialize();
//         }

//         // For SELECT queries that return data
//         const result = await this._source.query(query);
//         return result;
        
//     } catch (error) {
//         Logger.instance().log(error instanceof Error ? error.message : 'Query execution error');
//         Logger.instance().log(`Error trace: ${error instanceof Error ? error.stack : 'No stack trace'}`);
//         throw error; // Consider throwing instead of returning null
//     }
// };
// }

// ///////////////////////////////////////////////////////////////////////////////////////////

// function getFoldersRecursively(location: string) {
//     const items = fs.readdirSync(location, { withFileTypes: true });
//     let paths = [];
//     for (const item of items) {
//         if (item.isDirectory()) {
//             const fullPath = path.join(location, item.name);
//             const childrenPaths = getFoldersRecursively(fullPath);
//             paths = [
//                 ...paths,
//                 fullPath,
//                 ...childrenPaths,
//             ];
//         }
//     }
//     return paths;
// }

// // const dbTypeOrm= new DatabaseConnector_TypeOrm();

// // export const Source = dbTypeOrm._source;

// const Source = DatabaseConnector_TypeOrm._source;

// export { DatabaseConnector as DBConnector, Source };

/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import { Config } from "../../../common/database.utils/database.config";
import { Logger } from "../../../startup/logger";
import { DataSource } from "typeorm";
import path from "path";
import fs from 'fs';
import { User } from "./models/user/user.model";
import { IPrimaryDatabaseConnector } from "../../../database/database.connector.interface";
import { FormTemplate } from "./models/form.template/form.template.model";
import { FavoriteTemplate } from "./models/favorite.template/favorite.template.model";
import { FormSection } from "./models/form.section/form.section.model";
import { FormSubmission } from "./models/form.submission/form.submission.model";
import { FormTemplateApproval } from "./models/form.template.approval/form.template.approval.model";
import { InputUnitList } from "./models/input.unit.list/input.unit.list.model";
import { Question } from "./models/question/question.model";
import { QuestionResponse } from "./models/question.response/question.response.model";
import { TemplateFolder } from "./models/template.folder/template.folder.model";

///////////////////////////////////////////////////////////////////////////////////

 Logger.instance().log(`environment : ${process.env.NODE_ENV}`);
 Logger.instance().log(`db name     : ${Config.database}`);
 Logger.instance().log(`db username : ${Config.username}`);
 Logger.instance().log(`db host     : ${Config.host}`);

///////////////////////////////////////////////////////////////////////////////////

class DatabaseConnector implements IPrimaryDatabaseConnector {

    static _source = new DataSource({
        name        : Config.dialect,
        type        : Config.dialect,
        host        : Config.host,
        port        : Config.port,
        username    : Config.username,
        password    : Config.password,
        database    : Config.database,
        synchronize : true,
        entities    : [
           FormTemplate,
           FavoriteTemplate,
           FormSection,
           FormSubmission,
           FormTemplateApproval,
           InputUnitList,
           Question,
           QuestionResponse,
           TemplateFolder,
           User
        ],
        migrations  : [],
        subscribers : [],
        logger      : Logger.instance(),
        logging     : true,
        poolSize    : Config.pool.max,
        cache       : true,
    });

    static getFoldersRecursively(location: string) {
        const items = fs.readdirSync(location, { withFileTypes: true });
        let paths = [];
        for (const item of items) {
            if (item.isDirectory()) {
                const fullPath = path.join(location, item.name);
                const childrenPaths = this.getFoldersRecursively(fullPath);
                paths = [
                    ...paths,
                    fullPath,
                    ...childrenPaths,
                ];
            }
        }
        return paths;
    }

    public connect=async (): Promise<boolean> => {
        
        DatabaseConnector.initialize();

        return true;
    }

    static initialize = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            this._source
                .initialize()
                .then(() => {
                     Logger.instance().log('Database connection has been established successfully.');
                    resolve(true);
                })
                .catch(error => {
                     Logger.instance().log('Unable to connect to the database:' + error.message);
                    reject(false);
                });
        });

    };



    public sync = async () => {
    try {
      if (!DatabaseConnector._source.isInitialized) {
        await DatabaseConnector._source.initialize();
      }

      await DatabaseConnector._source.synchronize();

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
      if (!DatabaseConnector._source.isInitialized) {
        await DatabaseConnector._source.initialize();
      }

      // Run pending migrations
      const migrations = await DatabaseConnector._source.runMigrations();

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

}

///////////////////////////////////////////////////////////////////////////////////

const Source = DatabaseConnector._source;

export { DatabaseConnector as DBConnector, Source };
