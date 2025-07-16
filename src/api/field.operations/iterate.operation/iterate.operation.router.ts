import express from 'express';
import { IterateOperationController } from './iterate.operation.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new IterateOperationController();

    // Iterate Operation routes
    router.get('/search', controller.searchIterateOperation);
    router.post('/', controller.createIterateOperation);
    router.put('/:id', controller.updateIterateOperation);
    router.get('/:id', controller.getIterateOperationById);
    router.delete('/:id', controller.deleteIterateOperation);

    app.use('/api/v1/field-iterate-operations', router);
};
