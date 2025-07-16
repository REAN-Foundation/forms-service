import express from 'express';
import { MathematicalOperationController } from './mathematical.operation.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new MathematicalOperationController();

    // Mathematical Operation routes
    router.get('/search', controller.searchMathematicalOperation);
    router.post('/', controller.createMathematicalOperation);
    router.put('/:id', controller.updateMathematicalOperation);
    router.get('/:id', controller.getMathematicalOperationById);
    router.delete('/:id', controller.deleteMathematicalOperation);

    app.use('/api/v1/field-mathematical-operations', router);
};
