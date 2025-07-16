import express from 'express';
import { CalculationLogicController } from './calculation.logic.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new CalculationLogicController();

    // Calculation Logic routes
    router.get('/search', controller.searchCalculationLogic);
    router.post('/', controller.createCalculationLogic);
    router.put('/:id', controller.updateCalculationLogic);
    router.get('/:id', controller.getCalculationLogicById);
    router.delete('/:id', controller.deleteCalculationLogic);

    app.use('/api/v1/field-calculation-logic', router);
};
