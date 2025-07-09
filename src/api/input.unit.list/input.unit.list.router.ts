import express from 'express';
import { InputUnitListController } from './input.unit.list.controller';

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new InputUnitListController();

    router.get('/search', controller.search);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.get('/:id', controller.getById);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/input-unit-lists', router);
}; 