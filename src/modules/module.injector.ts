import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { FileStorageInjector } from './storage/file.storage.injector';
// import { CommunicationInjector } from './communication/communication.injector';
// import { EhrInjector } from './ehr/ehr.injector';
// import { FileStorageInjector } from './storage/file.storage.injector';

////////////////////////////////////////////////////////////////////////////////

export class ModuleInjector {

    static registerInjections(container: DependencyContainer) {

        // EhrInjector.registerInjections(container);
        // CommunicationInjector.registerInjections(container);
        FileStorageInjector.registerInjections(container);

    }

}
