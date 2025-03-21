import express from 'express';
import {
    FormController
} from './form.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new FormController();
    
    router.get('/search', controller.search);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.get('/:id', controller.getById);
    router.delete('/:id', controller.delete);
    router.post('/:id/submit', controller.submit);

    app.use('/api/v1/form-submissions', router);
};
