import express from 'express';
import { InputUnitListController } from './input.unit.list.controller';
import { context } from '../../auth/context.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    //#region member variables and constructors
    const router = express.Router();
    const controller = new InputUnitListController();
    const contextBase = 'InputUnitList';

    router.get('/search', context(`${contextBase}.Search`), controller.search);
    router.post('/', context(`${contextBase}.Create`), controller.create);
    router.put('/:id', context(`${contextBase}.Update`), controller.update);
    router.get('/:id', context(`${contextBase}.GetById`), controller.getById);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/input-units', router);
};
