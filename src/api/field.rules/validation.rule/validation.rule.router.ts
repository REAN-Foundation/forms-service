import express from 'express';
import { ValidationRuleController } from './validation.rule.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new ValidationRuleController();

    // Validation Rule routes
    router.get('/search', controller.searchValidationRule);
    router.post('/', controller.createValidationRule);
    router.put('/:id', controller.updateValidationRule);
    router.get('/:id', controller.getValidationRuleById);
    router.delete('/:id', controller.deleteValidationRule);

    app.use('/api/v1/field-validation-rules', router);
};
