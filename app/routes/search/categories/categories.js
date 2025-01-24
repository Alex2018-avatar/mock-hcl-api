import express from 'express';
import { CategoryController } from '../../../controllers/category/Category.js';
import { addFolder } from '../../../middleware/auth.js';

const app = express();
const categoriesRouter = app.router;

// /search/resources/api/v2/categories?storeId=11&depthAndLimit=11%2C11&contractId=-11005&langId=-1
categoriesRouter.get('/categories', addFolder, CategoryController.getCategory);

export default categoriesRouter;
