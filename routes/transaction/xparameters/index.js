import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const parametersRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /api/resources/store/10251/xparameters/STORE_CONF?langId=-5
parametersRouter.get('/:storeId/xparameters/:group', async (req, res) => {
  const { storeId, emsName } = req.params;
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/xparameters.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  res.status(200).json(response);
});

export default parametersRouter;
