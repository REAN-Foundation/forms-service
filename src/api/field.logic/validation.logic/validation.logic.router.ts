import express from 'express';
import { ValidationLogicController } from './validation.logic.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new ValidationLogicController();

    // Validation Logic routes
    router.get('/search', controller.searchValidationLogic);
    router.post('/', controller.createValidationLogic);
    router.put('/:id', controller.updateValidationLogic);
    router.get('/:id', controller.getValidationLogicById);
    router.delete('/:id', controller.deleteValidationLogic);

    app.use('/api/v1/field-validation-logic', router);
};
