import express from 'express';
import {
    FormController
} from './form.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new FormController();

    router.get('/all', controller.getAll);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.get('/:id', controller.getById);
    router.delete('/:id', controller.delete);
    router.get('/by-template/:templateId', controller.getByTemplateId);
    router.post('/:id/submit', controller.submit);
    router.get('/get-by-date/:date', controller.getFormByDate);

    app.use('/api/v1/form-submissions', router);
};
