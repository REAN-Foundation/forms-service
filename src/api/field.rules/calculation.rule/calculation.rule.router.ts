import express from 'express';
import { CalculationRuleController } from './calculation.rule.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new CalculationRuleController();

    // Calculation Rule routes
    router.get('/search', controller.searchCalculationRule);
    router.post('/', controller.createCalculationRule);
    router.put('/:id', controller.updateCalculationRule);
    router.get('/:id', controller.getCalculationRuleById);
    router.delete('/:id', controller.deleteCalculationRule);

    app.use('/api/v1/field-calculation-rules', router);
};
