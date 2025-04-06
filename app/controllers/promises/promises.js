import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { logger } from '../../config/logger.js';
import { FileService } from '../../services/FileService.js';
import { getAddressId } from '../../utils/address-utils.js';
import { ADDRESS_ID_NOT_AVAILABLE } from '../../config/promises.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromises = fs.promises;

export class PromisesController {
  static async getPromises(req, res) {
    const _folder = req.storeIdentifier;
    const storeId = req.params.storeId;
    const way = 'NOT_AVL_01';
    const cart = req.session.carts ? req.session.carts[storeId] : null;
    const orderItem = cart?.orderItem ?? [];
    const addressId = getAddressId(orderItem);
    const promiseNotAvailable = addressId === ADDRESS_ID_NOT_AVAILABLE;

    try {
      // SUCCESS
      if (way === 'SUCCESS') {
        const filePath = FileService.getFilePath(_folder, `promises/${way}.json`);
        const response = await FileService.readAndParseJSON(filePath);
        return res.status(200).json(response);
      }

      if (way === 'SUCCESS_M') {
        const filePath = FileService.getFilePath(_folder, `promises/${way}.json`);
        const response = await FileService.readAndParseJSON(filePath);
        return res.status(200).json(response);
      }

      // ERROR 500,408
      if (way === 'ERR_GENERIC_03') {
        const filePath = FileService.getFilePath(_folder, `promises/${way}.json`);
        const response = await FileService.readAndParseJSON(filePath);
        return res.status(500).json(response);
      }

      // 201 * Sin cobertura
      // if (way === 'NOT_AVL_01') {
      //   const filePath = FileService.getFilePath(_folder, `promises/${way}.json`);
      //   const response = await FileService.readAndParseJSON(filePath);
      //   return res.status(201).json(response);
      // }
      if (promiseNotAvailable) {
        const filePath = FileService.getFilePath(_folder, `promises/${way}.json`);
        const response = await FileService.readAndParseJSON(filePath);
        return res.status(201).json(response);
      }
      // 201 Un solo producto en la orden, sin stock
      if (way === 'NOT_AVL_02') {
        const filePath = FileService.getFilePath(_folder, `promises/${way}.json`);
        const response = await FileService.readAndParseJSON(filePath);
        return res.status(201).json(response);
      }
      if (way === 'NOT_AVL_02_M') {
        const filePath = FileService.getFilePath(_folder, `promises/${way}.json`);
        const response = await FileService.readAndParseJSON(filePath);
        return res.status(201).json(response);
      }

      // 201 2 Productos, 1 sin stock
      if (way === 'NOT_AVL_03') {
        const filePath = FileService.getFilePath(_folder, `promises/${way}.json`);
        const response = await FileService.readAndParseJSON(filePath);
        return res.status(201).json(response);
      }
      if (way === 'NOT_AVL_03_M') {
        const filePath = FileService.getFilePath(_folder, `promises/${way}.json`);
        const response = await FileService.readAndParseJSON(filePath);
        return res.status(201).json(response);
      }

      // DEFAULT SUCCESS
      const filePath = FileService.getFilePath(_folder, `promises/SUCCESS.json`);
      const response = await FileService.readAndParseJSON(filePath);
      return res.status(200).json(response);

    } catch (error) {
      logger.error(error.message)
      res.status(404).json({});
    }
  }
}