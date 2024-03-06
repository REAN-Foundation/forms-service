import dotenv from 'dotenv'
import Application from './app';

dotenv.config();

(async () => {
    const app = Application.instance();
    app.start();
})();




