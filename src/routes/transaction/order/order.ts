import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const app = express();
const orderRouter = app.router;
const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/41/order/byStatus/N,M,A,B,C,R,S,D,F,G,L,W,APP,RTN
orderRouter.get('/:storeId/order/byStatus/:orderStatus', async (req, res) => {
  const { storeId, orderStatus } = req.params;
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/order/history.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  res.status(200).json(response);
})

// /wcs/resources/store/41/order/16781129755
orderRouter.get('/:storeId/order/:orderId', async (req, res) => {
  const { storeId, orderId } = req.params;
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/order/order-${orderId}.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  res.status(200).json(response);
})

export default orderRouter