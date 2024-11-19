import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { delay } from '../../../utils/product-utils.js';

const cartRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/15051/cart/@self?langId=-5&sortOrder=desc
cartRouter.get('/:storeId/cart/@self', async (req, res) => {
  try {
    const { storeId, emsName } = req.params;
    const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/cart/cart.json`);
    const data = await fsPromises.readFile(filePath, 'utf8');
    const response = JSON.parse(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({});

  }
});

// /wcs/resources/store/15051/cart
cartRouter.post('/:storeId/cart', async (req, res) => {
  const { storeId, emsName } = req.params;
  await delay(1000);
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


// /wcs/resources/store/9701/cart/@self/usable_shipping_info?langId=-5
cartRouter.get('/:storeId/cart/@self/usable_shipping_info', async (req, res) => {
  const { storeId } = req.params;
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/cart/usable_shipping_info.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  res.status(200).json(response);
});

// /wcs/resources/store/9701/cart/@self/payment_instruction?langId=-5
cartRouter.get('/:storeId/cart/@self/usable_payment_info', async (req, res) => {
  const { storeId } = req.params;
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/cart/usable_payment_info.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  res.status(200).json(response);
});

// /wcs/resources/store/9701/cart/@self/payment_instruction?langId=-5
cartRouter.delete('/:storeId/cart/@self/payment_instruction', async (req, res) => {
  res.status(200).json({});
});

// /wcs/resources/store/9701/cart/@self/payment_instruction?langId=-5
cartRouter.post('/:storeId/cart/@self/payment_instruction', async (req, res) => {
  res.status(200).json({
    "orderId": "5245350969",
    "paymentInstruction": [
      {
        "piId": "10501"
      }
    ],
    "resourceName": "cart"
  });
});

// /wcs/resources/store/9701/cart/@self/precheckout
cartRouter.put('/:storeId/cart/@self/precheckout', async (req, res) => {
  res.status(200).json({ "orderId": "5245350969", "resourceName": "cart" });
});

// /wcs/resources/store/9701/cart/@self/checkout
cartRouter.post('/:storeId/cart/@self/checkout', async (req, res) => {
  res.status(200).json({ "orderId": "5245350969", "resourceName": "cart" });
});

// /wcs/resources/store/9701/order/5245350969
cartRouter.get('/:storeId/order/:orderId', async (req, res) => {
  const { storeId, orderId } = req.params;
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/order/order-${orderId}.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  res.status(200).json(response);
});


export default cartRouter;
