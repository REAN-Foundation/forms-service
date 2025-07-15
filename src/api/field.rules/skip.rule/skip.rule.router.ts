import express from 'express';
import { SkipRuleController } from './skip.rule.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new SkipRuleController();

    // Skip Rule routes
    router.get('/search', controller.searchSkipRule);
    router.post('/', controller.createSkipRule);
    router.put('/:id', controller.updateSkipRule);
    router.get('/:id', controller.getSkipRuleById);
    router.delete('/:id', controller.deleteSkipRule);

    app.use('/api/v1/field-skip-rules', router);
}; 