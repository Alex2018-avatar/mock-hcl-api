import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { logger } from '../../config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromises = fs.promises;

export class CustomClaroController {
  static async getClaroCupoHandler(req, res) {
    const _folder = req.storeIdentifier;
    const { cupo } = req.params;
    const filePath = path.resolve(__dirname, `../../data/${_folder}/custom/ClaroCupoHandler-F.json`);

    // read file
    try {
      const data = await fs.promises.readFile(filePath, 'utf8');
      const response = JSON.parse(data);
      res.status(200).json(response);
    } catch (error) {
      logger.error(error.message)
      res.status(404).json({ "contents": [] });
    }
  }

  static async getClaroReserveAndFinancialHandler(req, res) {
    const _folder = req.storeIdentifier;
    const filePath = path.resolve(__dirname, `../../data/${_folder}/custom/ClaroReserveAndFinancialHandler.json`);

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

  static async getClaroFinancialTermHandler(req, res) {
    const _folder = req.storeIdentifier;
    const { cupo } = req.params;
    const filePath = path.resolve(__dirname, `../../data/${_folder}/custom/ClaroFinancialTermHandler.json`);

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

  static async getClaroValidateHomeAddressHandler(req, res) {
    const _folder = req.storeIdentifier;
    const filePath = path.resolve(__dirname, `../../data/${_folder}/custom/ClaroValidateHomeAddressHandler.json`);

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

  static async getB2BGatewayUrlHandler(req, res) {
    const _folder = req.storeIdentifier;
    const filePath = path.resolve(__dirname, `../../data/${_folder}/custom/B2BGatewayUrlHandler.json`);

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
}