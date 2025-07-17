/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import { Config } from './database.config';
import { logger } from '../logger/logger';
import { DataSource } from "typeorm";
import path from "path";
import { User } from './models/user/user.model';
import { FormTemplate } from './models/form.template/form.template.model';
import { FavoriteTemplate } from './models/favorite.template/favorite.template.model';
import { FormSection } from './models/form.section/form.section.model';
import { FormSubmission } from './models/form.submission/form.submission.model';
import { FormTemplateApproval } from './models/form.template.approval/form.template.approval.model';
import { InputUnitList } from './models/input.unit.list/input.unit.list.model';
import { QuestionResponse } from './models/question.response/question.response.model';
import { FormFieldEntity } from './models/form.field/form.field.model';
import { TemplateFolder } from './models/template.folder/template.folder.model';
import { ValidationLogicEntity } from './models/logic/validation.logic.model';
import { CalculationLogicEntity } from './models/logic/calculation.logic.model';
import { SkipLogicEntity } from './models/logic/skip.logic.model';
import { CalculationRuleEntity } from './models/rule/calculation.rule.model';
import { SkipRuleEntity } from './models/rule/skip.rule.model';
import { ValidationRuleEntity } from './models/rule/validation.rule.model';

import { CompositionOperationEntity } from './models/operation/composition.operation.model';
import { FunctionExpressionOperationEntity } from './models/operation/function.expression.operation.model';
import { IterateOperationEntity } from './models/operation/iterate.operation.model';
import { LogicalOperationEntity } from './models/operation/logical.operation.model';
import { MathematicalOperationEntity } from './models/operation/mathematical.operation.model';
import { DBLogger } from "./database.logger";
import { DbClient } from "./db.clients/db.client";

///////////////////////////////////////////////////////////////////////////////////

logger.info(`Environment : ${process.env.NODE_ENV}`);
logger.info(`Database Name : ${Config.database}`);
logger.info(`Database Username : ${Config.username}`);
logger.info(`Database Host : ${Config.host}`);

///////////////////////////////////////////////////////////////////////////////////

class DatabaseConnector {

    static _basePath = path.join(process.cwd(), 'src/database/models').replace(/\\/g, '/');

    static _source = new DataSource({
        name        : Config.dialect,
        type        : Config.dialect,
        host        : Config.host,
        port        : Config.port,
        username    : Config.username,
        password    : Config.password,
        database    : Config.database,
        synchronize : true,
        //entities    : [this._basePath + '/**/*.model{.ts,.js}'],
        entities    : [
            FormTemplate,
            FavoriteTemplate,
            FormSection,
            FormSubmission,
            FormTemplateApproval,
            InputUnitList,
            QuestionResponse,
            FormFieldEntity,
            TemplateFolder,
            User,

            SkipLogicEntity,
            CalculationLogicEntity,
            ValidationLogicEntity,
            ValidationRuleEntity,
            CalculationRuleEntity,
            SkipRuleEntity,

            CompositionOperationEntity,
            FunctionExpressionOperationEntity,
            IterateOperationEntity,
            LogicalOperationEntity,
            MathematicalOperationEntity,
        ],
        migrations  : [],
        subscribers : [],
        // logger      : 'advanced-console', //Use console for the typeorm logging
        logger      : new DBLogger(),
        logging     : false,
        poolSize    : Config.pool.max,
        cache       : true,
    });

    private static initialize = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            this._source
                .initialize()
                .then(() => {
                    logger.info('🔄 Database connection has been established successfully.');
                    resolve(true);
                })
                .catch((error) => {
                    logger.error('❌ Unable to connect to the database:' + error.message);
                    reject(false);
                });
        });
    };

    static setup = async (): Promise<boolean> => {
        logger.info('🛢️ Setting up the database...');
        if (process.env.NODE_ENV === 'test') {
            //Note: This is only for test environment
            //Drop all tables in db
            await DbClient.dropDatabase();
        }
        await DbClient.createDatabase();
        await DatabaseConnector.initialize();
        return true;
    };

    static close = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            this._source
                .destroy()
                .then(() => {
                    logger.info('🔄 Database connection has been closed successfully.');
                    resolve(true);
                })
                .catch((error) => {
                    logger.error('❌ Unable to close the database connection:' + error.message);
                    reject(false);
                });
        });
    };

}

///////////////////////////////////////////////////////////////////////////////////

// function getFoldersRecursively(location: string) {
//     const items = fs.readdirSync(location, { withFileTypes: true });
//     let paths = [];
//     for (const item of items) {
//         if (item.isDirectory()) {
//             const fullPath = path.join(location, item.name);
//             const childrenPaths = this.getFoldersRecursively(fullPath);
//             paths = [
//                 ...paths,
//                 fullPath,
//                 ...childrenPaths,
//             ];
//         }
//     }
//     return paths;
// }
//Usage
// static _folders = this.getFoldersRecursively(this._basePath)
//     .map(y => y.replace(/\\/g, '/'))
//     .map(x => '"' + x + '/*.js"');

///////////////////////////////////////////////////////////////////////////////////

const Source = DatabaseConnector._source;

export { DatabaseConnector, Source };
