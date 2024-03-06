import express from 'express';
import { UserController } from './user.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new UserController();

    router.get('/all', controller.getAll);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.get('/:id', controller.getById);
    router.delete('/:id', controller.delete);
    // router.post('/login-with-password', controller.loginWithPassword);
    // router.post('/logout', controller.logout);

    app.use('/api/v1/users', router);
};
