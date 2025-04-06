import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { CustomB2BClaroController } from '../../../controllers/custom/customB2BClaro.js';
import { addFolder } from '../../../middleware/auth.js';

const app = express();
const customRouter = app.router;
const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/14125/check/cupo
customRouter.post('/:storeId/check/cupo', CustomB2BClaroController.getCupoClaroCreditHandler)

customRouter.get('/:storeId/guest_orders/:orderId/tracking', addFolder, CustomB2BClaroController.getOrderTrackingHandler)

export default customRouter