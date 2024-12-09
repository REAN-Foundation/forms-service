import express from 'express';
import { FormTemplateController } from './form.template.controller';
import { TemplateAuth } from './form.template.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new FormTemplateController();

    router.get('/search', auth(TemplateAuth.search), controller.search);
    router.post('/', auth(TemplateAuth.create), controller.create);
    router.put('/:id', auth(TemplateAuth.update), controller.update);
    router.get('/:id/details', auth(TemplateAuth.getDetailsById), controller.getDetailsById);
    router.get('/:id', auth(TemplateAuth.getById), controller.getById);
    router.delete('/:id', auth(TemplateAuth.delete), controller.delete);
    router.get('/:id/submissions', auth(TemplateAuth.submission), controller.submissions)
    router.get('/:id/export', auth(TemplateAuth.export), controller.exportTemplate)

    app.use('/api/v1/form-templates', router);
};
