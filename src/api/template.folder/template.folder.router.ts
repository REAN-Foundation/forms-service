import express from 'express';
import { TemplateFolderController } from './template.folder.controller';

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new TemplateFolderController();

    router.get('/search', controller.search);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.get('/:id', controller.getById);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/template-folders', router);
};
