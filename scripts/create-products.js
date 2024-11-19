
import fs from 'node:fs';
import path from 'node:path';
import https from 'https';
import { logger } from '../config/logger.js';
import { fileURLToPath } from 'url';

const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// /mock-hcl-api/data/9701-store/search/3074457345616680171-by-category.json

const readAndWriteProduct = async (storeId, categoryId) => {
  try {
    const filePath = path.resolve(__dirname, `../data/${storeId}-store/search/${categoryId}-by-category.json`);
    const data = await fsPromises.readFile(filePath, 'utf8');
    const response = JSON.parse(data);
    console.log('response: ', response);
  } catch (error) {
    console.log('error: ', error);

  }
};
readAndWriteProduct(9701, 3074457345616680171);