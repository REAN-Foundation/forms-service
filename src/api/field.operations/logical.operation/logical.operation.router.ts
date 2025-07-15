import express from 'express';
import { LogicalOperationController } from './logical.operation.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new LogicalOperationController();

    // Logical Operation routes
    router.get('/search', controller.searchLogicalOperation);
    router.post('/', controller.createLogicalOperation);
    router.put('/:id', controller.updateLogicalOperation);
    router.get('/:id', controller.getLogicalOperationById);
    router.delete('/:id', controller.deleteLogicalOperation);

    app.use('/api/v1/field-logical-operations', router);
}; 