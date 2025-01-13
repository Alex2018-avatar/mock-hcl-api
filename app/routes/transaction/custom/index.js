import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { CustomB2BClaroController } from '../../../controllers/custom/customB2BClaro.js';

const app = express();
const customRouter = app.router;
const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/14125/check/cupo
customRouter.post('/:storeId/check/cupo', async (req, res) => {
  const { storeId, orderStatus } = req.params;
  // Sin deuda y con cupo disponible
  res.status(200).json(buildCheckCreditResponse(0, 6000000.00));
  // Con deuda y con cupo disponible
  // res.status(200).json(buildCheckCreditResponse(2268801, 4700000.00));
  // Con deuda y sin cupo disponible
  // res.status(200).json(buildCheckCreditResponse(555539, 0));

  // ERRORS
  // res.status(400).json(generateWCSError("_GENERIC_ERROR", "1001"));
  // res.status(400).json(generateWCSError("_ERROR_HANDLER_KEY_CUPO_CHANNEL_ERROR", "1001"));
  // res.status(400).json(generateWCSError("_ERROR_HANDLER_KEY_CUPO_REQUIRED_FIELDS", "1001"));
  // res.status(400).json(generateWCSError("_ERROR_HANDLER_KEY_CUPO_SERVICE_NOT_AVAILABLE", "1001"));
  // res.status(400).json(generateWCSError("_ERROR_HANDLER_KEY_CUPO_LEGADO", "1001"));
})

customRouter.post('/:storeId/claro_orders/:orderId/tracking', CustomB2BClaroController.getOrderTrackingHandler)

export default customRouter