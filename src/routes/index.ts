import express from 'express';
import imageResizer from './api/images';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome to images Api!');
});

routes.use('/imageResizer', imageResizer);

export default routes;
