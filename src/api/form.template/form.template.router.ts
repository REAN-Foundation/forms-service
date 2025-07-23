import express from 'express';
import { FormTemplateController } from './form.template.controller';
import { context } from '../../auth/context.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FormTemplateController();
    const contextBase = 'FormTemplate';

    router.get('/search', context(`${contextBase}.Search`), controller.search);
    router.post('/', context(`${contextBase}.Create`), controller.create);
    router.put('/:id', context(`${contextBase}.Update`), controller.update);
    router.get('/:id', context(`${contextBase}.GetById`), controller.getById);
    router.delete('/:id', context(`${contextBase}.Delete`), controller.delete);
    router.get('/:id/details', context(`${contextBase}.GetDetailsById`), controller.getDetailsById);

    app.use('/api/v1/form-templates', router);
};
