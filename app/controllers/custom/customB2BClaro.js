import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { logger } from '../../config/logger.js';
import { buildCheckCreditResponse } from '../../utils/custom-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromises = fs.promises;

export class CustomB2BClaroController {
  static async getOrderTrackingHandler(req, res) {
    const { storeId, orderId } = req.params;
    console.log('orderId: ', orderId);
    if (orderId === '1001') {
      res.status(200).send({
        code: 'SUCCESS'
      })
    } else {
      res.status(200).send({
        code: 'ORDER_NOT_FOUND'
      })
    }
  }
  static async getCupoClaroCreditHandler(req, res) {
    const { storeId, orderId } = req.params;
    console.log('orderId: ', orderId);
    // Sin deuda y con cupo disponible
    res.status(200).json(buildCheckCreditResponse(1240.5, 6000000.00));
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
  }
}