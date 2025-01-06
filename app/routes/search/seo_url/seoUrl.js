import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

// import homeLayoutJSON from '../../../data/search/layouts/home.json' assert { type: "json" };
// import productListLayoutJSON from '../../../data/search/layouts/productList.json' assert { type: "json" };
// import onlineStoreJSON from '../../../data/online_store.json' assert { type: "json" };

const app = express();
const seoUrlRouter = app.router;
const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /search/resources/api/v2/urls?storeId=11&identifier=home
seoUrlRouter.get('/urls', async (req, res) => {
  const { storeId, identifier } = req.query;
  console.log('identifier: ', identifier);
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/layouts/${identifier}.json`);
  console.log('URL filePath: ', filePath);
  // read file
  try {
    const data = await fsPromises.readFile(filePath, 'utf8');
    const response = JSON.parse(data);
    res.status(200).json(response);
  } catch (error) {
    console.log('error: ', error);
    res.status(200).json({ "contents": [] });
  }

})


export default seoUrlRouter;
