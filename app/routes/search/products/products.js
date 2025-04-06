import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { getProductByIdOrPartNumber } from '../../../utils/product-utils.js';
import { FileService } from '../../../services/FileService.js';
// import onlineStoreJSON from '../../../data/online_store.json' assert { type: "json" };

const productsRouter = express.Router()
const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Products by category id
// /search/resources/api/v2/products?storeId=11&categoryId=10502&limit=12&offset=0&contractId=-11005&currency=USD&langId=-1&profileName=HCL_V2_findProductsByCategoryWithPriceRange
productsRouter.get('/products', async (req, res) => {
  const { storeId, partNumber, id, searchTerm, categoryId } = req.query;
  console.log('id: ', id);
  console.log('partNumber: ', partNumber);
  const isPartNumberArray = Array.isArray(partNumber);

  try {
    if (categoryId) {
      const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/search/${categoryId}-by-category.json`);
      const data = await fsPromises.readFile(filePath, 'utf8');
      const response = JSON.parse(data);
      res.status(200).json(response);
    } else if (isPartNumberArray) {
      const products = await partNumber.reduce(async (accPromise, partNumber) => {
        const acc = await accPromise;
        const data = getProductByIdOrPartNumber(partNumber);
        const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/product/${data.jsonName}.json`);
        const response = await FileService.readAndParseJSON(filePath);
        const product = response?.contents?.[0];
        console.log('response: ', response?.contents?.[0]);
        if (product) {
          acc.contents.push(product);
        }
        return acc;
      }, Promise.resolve({
        contents: [],
        "metaData": {
          "price": "1"
        },
        "total": 2
      }));

      res.status(200).json(products);

    } else if (partNumber || id) {
      const data = getProductByIdOrPartNumber(partNumber || id);
      const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/product/${data.jsonName}.json`);
      const jsonData = await fsPromises.readFile(filePath, 'utf8');
      const response = JSON.parse(jsonData);
      res.status(200).json(response);
    } else if (searchTerm && searchTerm === 'celular') {
      const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/search/3074457345616680171-by-search.json`);
      const data = await fsPromises.readFile(filePath, 'utf8');
      const response = JSON.parse(data);
      res.status(200).json(response);
    } else {
      res.status(200).json({ contents: [] });
    }
  } catch (error) {
    res.status(200).json({ contents: [] });
  }
})


export default productsRouter;
