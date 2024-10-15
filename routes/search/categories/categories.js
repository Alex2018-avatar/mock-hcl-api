import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
// import categoriesJSON from '../../../data/search/categories.json' assert { type: "json" };
// import onlineStoreJSON from '../../../data/online_store.json' assert { type: "json" };

const app = express();
const categoriesRouter = app.router;
const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /search/resources/api/v2/categories?storeId=11&depthAndLimit=11%2C11&contractId=-11005&langId=-1
categoriesRouter.get('/categories', async (req, res) => {
  const { storeId } = req.query;
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/categories.json`);
  // read file
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  res.status(200).json(response);
})

// /wcs/resources/store/11/country/country_state_list?langId=-1
// categoriesRouter.get('/:storeId/country/country_state_list', (req, res) => {
//   res.status(200).json(countriesJSON);
// })


export default categoriesRouter;
