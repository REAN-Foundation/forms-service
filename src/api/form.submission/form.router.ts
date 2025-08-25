import express from 'express';
import { FormController } from './form.controller';
import { context } from '../../auth/context.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FormController();
    const contextBase = 'FormSubmission';

    router.get('/search', context(`${contextBase}.Search`), controller.search);
    router.put('/submit', context(`${contextBase}.Submit`), controller.submit);
    router.post('/', context(`${contextBase}.Create`), controller.create);
    router.put('/:id', context(`${contextBase}.Update`), controller.update);
    router.get('/:id', context(`${contextBase}.GetById`), controller.getById);
    router.delete('/:id', context(`${contextBase}.Delete`), controller.delete);

    app.use('/api/v1/form-submissions', router);
};
