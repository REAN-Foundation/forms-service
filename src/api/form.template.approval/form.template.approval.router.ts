import express from 'express';
import { FormTemplateApprovalController } from './form.template.approval.controller';

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FormTemplateApprovalController();

    router.get('/search', controller.search);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.get('/:id', controller.getById);
    router.get('/template/:templateId', controller.getByTemplateId);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/form-template-approvals', router);
};
