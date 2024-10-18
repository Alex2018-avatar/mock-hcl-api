import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
// import recommendCategoryJSON from '../../../data/search/categories.json /mock-hcl-api/data/9701-store/category/recommend-categories.json' assert { type: "json" };
// import onlineStoreJSON from '../../../data/online_store.json' assert { type: "json" };

const app = express();
const categoriesRouter = app.router;
const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /search/resources/api/v2/categories?storeId=11&depthAndLimit=11%2C11&contractId=-11005&langId=-1
categoriesRouter.get('/categories', async (req, res) => {
  console.log('req categories: ', req.query);
  const { storeId, identifier, id } = req.query;
  try {
    if (identifier) {
      const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/category/${identifier}.json`);
      // read file
      const data = await fsPromises.readFile(filePath, 'utf8');
      const response = JSON.parse(data);
      res.status(200).json(response);
    } else if (id) {
      const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/category/recommend-categories.json`);
      const data = await fsPromises.readFile(filePath, 'utf8');
      const response = JSON.parse(data);
      const categoryFound = response.contents.find(category => category.id === id);
      res.status(200).json({
        contents: [categoryFound]
      });
    } else {
      const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/categories.json`);
      // read file
      const data = await fsPromises.readFile(filePath, 'utf8');
      const response = JSON.parse(data);
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(200).json({ contents: [] });
  }
})


export default categoriesRouter;
