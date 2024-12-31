import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { logger } from '../../config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromises = fs.promises;

export class ShippingInfoController {
  static async getShippingInfoByType(req, res) {
    const _folder = req.storeIdentifier;
    const { type } = req.params;
    const filePath = path.resolve(__dirname, `../../data/${_folder}/address/${type}.json`);

    // read file
    try {
      const data = await fsPromises.readFile(filePath, 'utf8');
      const response = JSON.parse(data);
      res.status(200).json(response);
    } catch (error) {
      logger.error(error.message)
      res.status(404).json({ "contents": [] });
    }
  }

  static async getAddressInfoByType(req, res) {
    const { addressType } = req.params;
    const _folder = req.storeIdentifier;
    try {
      const filePath = path.resolve(__dirname, `../../data/${_folder}/address/address-info/${addressType}.json`);
      const data = await fsPromises.readFile(filePath, 'utf8');
      const response = JSON.parse(data);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({});
    }
  }

  static async saveB2BShippingInfo(req, res) {
    const { storeId } = req.params;
    res.status(200).json({ "code": "SUCCESS" });
    // ERROR RESPONSES
    // res.status(400).json({
    //   "code": "SERVICE_EXCEPTION",
    //   "message": "<p class='bold'>Inténtalo más tarde</p><p>Algo salió mal al procesar tu solicitud.</p>"
    // });
  }
}