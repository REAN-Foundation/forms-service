import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { ConfigurationManager } from '../../config/configuration.manager';
import { TypeOrmInjector } from './typeorm/typeorm.injector';

////////////////////////////////////////////////////////////////////////////////

export class SQLInjector {
    static registerInjections(container: DependencyContainer) {
        const databaseORM = ConfigurationManager.DatabaseORM();
        if (databaseORM === 'TypeORM') {
            TypeOrmInjector.registerInjections(container);
        }
    }
}
