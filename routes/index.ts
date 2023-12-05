import { Router } from 'express';
import homeRoutes from './homeRoutes';

const routes = Router();    

routes.use('/', homeRoutes);

export default routes;

