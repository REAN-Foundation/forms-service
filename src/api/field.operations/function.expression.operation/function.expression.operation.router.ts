import express from 'express';
import { FunctionExpressionOperationController } from './function.expression.operation.controller';
import { context } from '../../../auth/context.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    
    const router = express.Router();
    const controller = new FunctionExpressionOperationController();
    const contextBase = 'FunctionExpressionOperation';

    router.get('/search', context(`${contextBase}.Search`), controller.search);
    router.post('/', context(`${contextBase}.Create`), controller.create);
    router.put('/:id', context(`${contextBase}.Update`), controller.update);
    router.get('/:id', context(`${contextBase}.GetById`), controller.getById);
    router.delete('/:id', context(`${contextBase}.Delete`), controller.delete);

    app.use('/api/v1/field-function-expression-operations', router);
};
