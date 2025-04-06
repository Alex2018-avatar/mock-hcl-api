import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { addFolder } from '../../../middleware/auth.js';
import { FileService } from '../../../services/FileService.js';
import { logger } from '../../../config/logger.js';

const parametersRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /api/resources/store/10251/xparameters/STORE_CONF?langId=-5
parametersRouter.get('/:storeId/xparameters/:group', addFolder, async (req, res) => {
  const { storeId, emsName } = req.params;
  const _folder = req._folder;
  logger.warn(`***********> _folder === ${_folder}`);
  if (_folder === 'empresas') {
    const filePath = FileService.getFilePath(_folder, `xparameters.json`);
    const response = await FileService.readAndParseJSON(filePath);
    console.log('response: ', response);
    return res.status(200).json(response);
  }
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/xparameters.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  res.status(200).json(response);
});

export default parametersRouter;
