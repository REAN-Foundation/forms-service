import express from 'express';
import { CompositionOperationController } from './composition.operation.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new CompositionOperationController();

    // Composition Operation routes
    router.get('/search', controller.searchCompositionOperation);
    router.post('/', controller.createCompositionOperation);
    router.put('/:id', controller.updateCompositionOperation);
    router.get('/:id', controller.getCompositionOperationById);
    router.delete('/:id', controller.deleteCompositionOperation);

    app.use('/api/v1/field-composition-operations', router);
}; 