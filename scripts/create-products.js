
import fs from 'node:fs';
import path from 'node:path';
import https from 'https';
import { logger } from '../config/logger.js';
import { fileURLToPath } from 'url';

const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('__dirname: ', __dirname);
const storeId = '9701';

const ids = [
  '3074457345617889169', 
  '3074457345617885668', 
  '3074457345617899176',
  '3074457345617886669',
  '3074457345617883668',
  '3074457345617895169',
  '3074457345616817089'
]

// /mock-hcl-api/data/9701-store/search/3074457345616680171-by-category.json

const saveData = async (widgetName, data) => {
  const filePath = path.resolve(__dirname, `../data/${storeId}-store/product/${widgetName}.json`);
  try {
    await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
    logger.info(`[SAVED] ${widgetName}`);
    logger.info(`************************************************************`);
  } catch (error) {
    console.error(`Error al guardar el widget ${widgetName}:`, error);
  }
}

const readAndWriteProduct = async (storeId, categoryId) => {
  console.log('categoryId: ', categoryId);
  try {
    logger.info(`************************************************************`);
    const filePath = path.resolve(__dirname, `../data/${storeId}-store/search/${categoryId}-by-category.json`);
    console.log('filePath: ', filePath);
    logger.info(`************************************************************`);
    const data = await fsPromises.readFile(filePath, 'utf8');
    const response = JSON.parse(data);
    const { contents } = response;
    const foundProducts = contents.filter(product => ids.includes(product.id));
    console.log('foundProducts: ', foundProducts.length);
    // save in file  every product found
    foundProducts.forEach(async product => {
      await saveData(product.seo.href ?? product.id, product.productDetail);
    })
    //console.log('response: ', response);
  } catch (error) {
    console.log('error: ', error);

  }
};
readAndWriteProduct(storeId, '3074457345616680171');