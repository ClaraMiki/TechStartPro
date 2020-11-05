import express from 'express';
import ClassesControllers from './controllers/ClassesControllers';

const routes = express.Router();
const classesControllers = new ClassesControllers();

routes.post('/categories-csv', classesControllers.createCsv);
routes.post('/categories', classesControllers.create);
routes.delete('/categories/:id', classesControllers.delete);
routes.put('/categories/:id/:description', classesControllers.update);
routes.get('/categories', classesControllers.index);

export default routes;