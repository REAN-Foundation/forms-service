import express from 'express';
import { QuestionResponseController } from './question.response.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new QuestionResponseController();

    router.get('/search', controller.search);
    // router.get('/all', controller.getAll);
    router.post('/', controller.create);
    router.post('/save', controller.save);
    router.put('/:id', controller.update);
    router.get('/:id', controller.getById);
    router.get('/exportcsv/export', controller.exportCSV);
    router.get('/exportpdf/export', controller.exportPDF);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/question-responses', router);
};
