import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
// import onlineStoreJSON from '../../../data/online_store.json' assert { type: "json" };

const productsRouter = express.Router()
const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Products by category id
// /search/resources/api/v2/products?storeId=11&categoryId=10502&limit=12&offset=0&contractId=-11005&currency=USD&langId=-1&profileName=HCL_V2_findProductsByCategoryWithPriceRange
productsRouter.get('/products', async (req, res) => {
  const { storeId, partNumber, categoryId } = req.query;

  try {
    if (categoryId) {
      const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/search/${categoryId}-by-category.json`);
      const data = await fsPromises.readFile(filePath, 'utf8');
      const response = JSON.parse(data);
      res.status(200).json(response);
    } else if (partNumber) {
      const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/search/${partNumber}-product.json`);
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

const buildFilePath = (storeId, categoryId) => {
  return path.resolve(__dirname, `../../../data/${storeId}-store/search/${categoryId}-by-category.json`);
}


export default productsRouter;
