import express from 'express';
import { addFolder } from '../../../middleware/auth.js';
import { PromisesController } from '../../../controllers/promises/promises.js';

const promisesRouter = express.Router();

// /wcs/resources/store/10100/delivery/available_date?langId=-5 
promisesRouter.get('/:storeId/delivery/available_date', addFolder, PromisesController.getPromises);

export default promisesRouter;