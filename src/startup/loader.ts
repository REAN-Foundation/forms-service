import 'reflect-metadata';
import { Logger } from '../common/logger';
import { Injector } from './injector';

export class Loader {

    public static init = async (): Promise<boolean> => {
        try {

            //Register injections here...
            Injector.registerInjections();
            return true;

        } catch (error) {
            Logger.instance().log(error.message);
            return false;
        }
    };

}
