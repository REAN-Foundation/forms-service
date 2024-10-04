import express from 'express';
import { QuestionController } from './question.controller';


///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new QuestionController();

    router.get('/search', controller.search);
    
    // router.get('/all', controller.getAll);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.get('/:id', controller.getById);
    router.get('/by-template-id/:templateId', controller.getByTemplateId);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/questions', router);
};
