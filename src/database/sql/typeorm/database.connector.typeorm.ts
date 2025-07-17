/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import { Config } from '../../../database/database.config';
import { logger } from '../../../logger/logger';
import { DataSource } from 'typeorm';
import path from 'path';
import fs from 'fs';
import { User } from './models/user/user.model';
import { IPrimaryDatabaseConnector } from '../../../database/database.connector.interface';
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

///////////////////////////////////////////////////////////////////////////////////

Logger.instance().log(`environment : ${process.env.NODE_ENV}`);
Logger.instance().log(`db name     : ${Config.database}`);
Logger.instance().log(`db username : ${Config.username}`);
Logger.instance().log(`db host     : ${Config.host}`);

///////////////////////////////////////////////////////////////////////////////////

class DatabaseConnector implements IPrimaryDatabaseConnector {
    static _source = new DataSource({
        name: Config.dialect,
        type: Config.dialect,
        host: Config.host,
        port: Config.port,
        username: Config.username,
        password: Config.password,
        database: Config.database,
        synchronize: true,
        entities: [
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
        migrations: [],
        subscribers: [],
        logger: Logger.instance(),
        logging: true,
        poolSize: Config.pool.max,
        cache: true,
    });

    static getFoldersRecursively(location: string) {
        const items = fs.readdirSync(location, { withFileTypes: true });
        let paths = [];
        for (const item of items) {
            if (item.isDirectory()) {
                const fullPath = path.join(location, item.name);
                const childrenPaths = this.getFoldersRecursively(fullPath);
                paths = [...paths, fullPath, ...childrenPaths];
            }
        }
        return paths;
    }

    public connect = async (): Promise<boolean> => {
        DatabaseConnector.initialize();

        return true;
    };

    static initialize = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            this._source
                .initialize()
                .then(() => {
                    Logger.instance().log(
                        'Database connection has been established successfully.'
                    );
                    resolve(true);
                })
                .catch(error => {
                    Logger.instance().log(
                        'Unable to connect to the database:' + error.message
                    );
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
                error instanceof Error
                    ? error.message
                    : 'Unknown synchronization error'
            );
            return false;
        }
    };

    public migrate = async (): Promise<boolean> => {
        try {
            if (!DatabaseConnector._source.isInitialized) {
                await DatabaseConnector._source.initialize();
            }

            // Run pending migrations
            const migrations = await DatabaseConnector._source.runMigrations();

            if (migrations.length > 0) {
                Logger.instance().log('Database migrated successfully!');
                migrations.forEach(migration => {
                    Logger.instance().log(
                        `Executed migration: ${migration.name}`
                    );
                });
            } else {
                Logger.instance().log('No pending migrations found.');
            }

            return true;
        } catch (error) {
            Logger.instance().log(
                error instanceof Error ? error.message : 'Migration error'
            );
            return false;
        }
    };
}

///////////////////////////////////////////////////////////////////////////////////

const Source = DatabaseConnector._source;

export { DatabaseConnector as DBConnector, Source };
