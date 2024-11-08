import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const addressRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/9701/person/addressInfoByType/BLOQUE_O_INTERIOR
addressRouter.get('/:storeId/person/addressInfoByType/:addressType', async (req, res) => {
  try {
    const { storeId, addressType } = req.params;
    const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/address-info/${addressType}.json`);
    const data = await fsPromises.readFile(filePath, 'utf8');
    const response = JSON.parse(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({});
  }
});

export default addressRouter;
