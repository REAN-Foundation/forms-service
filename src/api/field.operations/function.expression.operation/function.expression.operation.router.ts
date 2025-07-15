import express from 'express';
import { FunctionExpressionOperationController } from './function.expression.operation.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new FunctionExpressionOperationController();

    // Function Expression Operation routes
    router.get('/search', controller.searchFunctionExpressionOperation);
    router.post('/', controller.createFunctionExpressionOperation);
    router.put('/:id', controller.updateFunctionExpressionOperation);
    router.get('/:id', controller.getFunctionExpressionOperationById);
    router.delete('/:id', controller.deleteFunctionExpressionOperation);

    app.use('/api/v1/field-function-expression-operations', router);
}; 