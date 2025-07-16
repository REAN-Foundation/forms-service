import express from 'express';
import { FavoriteTemplateController } from './favorite.template.controller';

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FavoriteTemplateController();

    router.get('/search', controller.search);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.get('/:id', controller.getById);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/favorite-templates', router);
};
