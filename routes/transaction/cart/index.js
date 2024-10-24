import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const cartRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/15051/cart/@self?langId=-5&sortOrder=desc
cartRouter.get('/:storeId/cart/@self', async (req, res) => {
  const { storeId, emsName } = req.params;
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/cart/cart.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  res.status(200).json(response);
});

// /wcs/resources/store/15051/cart
cartRouter.post('/:storeId/cart', async (req, res) => {
  const { storeId, emsName } = req.params;
  res.status(200).json({
    "orderId": "369101762825",
    "orderItem": [
      {
        "orderItemId": "1830001"
      }
    ],
    "resourceName": "cart"
  });
});

export default cartRouter;
