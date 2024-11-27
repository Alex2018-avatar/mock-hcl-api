import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { delay } from '../../../utils/product-utils.js';
import { generateWCSError } from '../../../utils/error-utils.js';
import { addItemToArray, generateOrderItem, updateCartWithNewItem } from '../../../helpers/order-item-generator.js';
import { generateShippingInfo } from '../../../helpers/shipping-info.js';

const cartRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/15051/cart/@self?langId=-5&sortOrder=desc
cartRouter.get('/:storeId/cart/@self', async (req, res, next) => {
  const { storeId } = req.params;
  // Si no hay carrito en sesión para esta tienda, cargarlo del archivo
  if (!req.session.carts) {
    req.session.carts = {};
  }

  if (req.session.carts[storeId]) {
    res.status(200).json(req.session.carts[storeId]);
  } else {
    res.status(404).json({});
  }
});

// /wcs/resources/store/15051/cart
cartRouter.post('/:storeId/cart', async (req, res) => {
  const { storeId, emsName } = req.params;
  const { orderItem } = req.body;
  try {
    const generatedOrderItem = await generateOrderItem(orderItem[0]);
    // ------------------------------------------------------
    if (!req.session.carts) {
      req.session.carts = {};
    }

    if (req.session.carts[storeId]) {
      const cart = req.session.carts[storeId];
      const updatedCart = updateCartWithNewItem(cart, generatedOrderItem);
      req.session.carts[storeId] = updatedCart;
    } else {
      const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/cart/cart-base.json`);
      const data = await fsPromises.readFile(filePath, 'utf8');
      const cart = JSON.parse(data);
      const newCart = { ...cart, orderItem: addItemToArray(cart.orderItem, generatedOrderItem) };
      req.session.carts[storeId] = newCart;
    }
    // ------------------------------------------------------
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

    // Error
    // res.status(400).json(generateWCSError("_ERROR_DIFFERENT_CATEGORIES", "1005"));
  } catch (error) {
    console.log('error: ', error);
  }
});

// /wcs/resources/store/15051/cart
cartRouter.put('/:storeId/cart/@self/update_order_item', async (req, res) => {
  const { storeId } = req.params;
  const { orderId, orderItem } = req.body;
  const { quantity, orderItemId } = orderItem[0];
  const cart = req.session?.carts?.[storeId] || null;

  if (cart) {
    // Buscar el item en el carrito
    const itemIndex = cart.orderItem.findIndex((item) => item.orderItemId === orderItemId);
    await delay(1000);

    if (quantity === '0') {
      // Si la cantidad es 0, eliminar el item
      cart.orderItem.splice(itemIndex, 1);
      return res.json(cart);
    } else {
      // Actualizar la cantidad del item
      cart.orderItem[itemIndex].quantity = quantity;
      return res.json(cart);
    }
  } else {
    res.status(200).json({ "orderId": "33485654", "resourceName": "cart" });
  }
});

// /wcs/resources/store/9701/cart/@self/usable_shipping_info?langId=-5
cartRouter.get('/:storeId/cart/@self/usable_shipping_info', async (req, res) => {
  const { storeId } = req.params;
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/cart/usable_shipping_info.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  const cart = req.session?.carts?.[storeId] || null;
  if (cart) {
    const usableShippingInfo = await generateShippingInfo(response, cart, storeId)
    res.status(200).json(usableShippingInfo);
  } else {
    res.status(404).json({});
  }
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

// /wcs/resources/store/9701/validate/cartOrder
cartRouter.post('/:storeId/validate/cartOrder', async (req, res) => {
  res.status(200).json({
    "success": true,
    "message": "La cantidad y el monto del carrito es válido",
    "status": 200
  });

  // ERRORS
  // Response: Monto excede el límite
  // res.status(400).json(generateWCSError("_ERROR_HANDLER_KEY_CART_LIMIT_EXCEEDED", "1001"));

  // Response: Error Campos obligatorios
  // res.status(400).json(generateWCSError("_ERROR_HANDLER_KEY_REQUIRED_FIELDS", "1001"));

  // Response: Error geérico
  // res.status(400).json(generateWCSError("_GENERIC_ERROR", "1001"));

});

export default cartRouter;
