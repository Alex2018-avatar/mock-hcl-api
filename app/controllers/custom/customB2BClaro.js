import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { logger } from '../../config/logger.js';

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
}