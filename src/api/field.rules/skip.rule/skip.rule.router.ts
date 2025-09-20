import express from 'express';
import { SkipRuleController } from './skip.rule.controller';
import { context } from '../../../auth/context.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new SkipRuleController();
    const contextBase = 'SkipRule';

    router.get('/search', context(`${contextBase}.Search`), controller.search);
    router.post('/', context(`${contextBase}.Create`), controller.create);
    router.put('/:id', context(`${contextBase}.Update`), controller.update);
    router.get('/:id', context(`${contextBase}.GetById`), controller.getById);
    router.get('/:id/details', context(`${contextBase}.GetDetailsById`), controller.getDetailsById);
    router.delete('/:id', context(`${contextBase}.Delete`), controller.delete);

    app.use('/api/v1/field-skip-rules', router);
};
