import express from 'express';
import { FormSectionController } from './form.section.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FormSectionController();

    router.get('/search', controller.search);
    // router.get('/all', controller.getAll);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.get('/:id', controller.getById);
    router.get('/templateId/:templateId', controller.getByTemplateId);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/form-sections', router);
};
