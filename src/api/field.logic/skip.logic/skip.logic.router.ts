import express from 'express';
import { SkipLogicController } from './skip.logic.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new SkipLogicController();

    // Skip Logic routes
    router.get('/search', controller.searchSkipLogic);
    router.post('/', controller.createSkipLogic);
    router.put('/:id', controller.updateSkipLogic);
    router.get('/:id', controller.getSkipLogicById);
    router.delete('/:id', controller.deleteSkipLogic);

    app.use('/api/v1/field-skip-logic', router);
};
