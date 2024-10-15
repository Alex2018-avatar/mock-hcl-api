import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const app = express();
const storeRouter = app.router;
const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/0/adminLookup?q=findByStoreIdentifier&storeIdentifier=Emerald
storeRouter.get('/:storeId/adminLookup', async (req, res) => {
  const { storeIdentifier } = req.query;
  const filePath = path.resolve(__dirname, `../../../data/${storeIdentifier}/adminLookup.json`);
  // read file
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  res.status(200).json(response);
})

// /wcs/resources/store/11/online_store
storeRouter.get('/:storeId/online_store', async (req, res) => {
  const { storeId } = req.params;
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/online_store.json`);
  // read file
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  res.status(200).json(response);
})

// /wcs/resources/store/11/features?langId=-1
storeRouter.get('/:storeId/features', (req, res) => {
  res.status(200).json({
    "resultList": [
      "CategorySortOrderOptions",
      "CategorySortOrder_Sequence",
      "SearchBasedNavigation"
    ]
  });
})

// /wcs/resources/store/11/contract?q=eligible&langId=-1
storeRouter.get('/:storeId/contract', (req, res) => {
  const { storeId } = req.params;
  if (storeId === '15051') {
    res.status(200).json({
      "contracts": {
        "4000000000000003006": "Default Contract for ClaroB2B"
      }
    });
  } else {
    res.status(200).json({ "contracts": { "-11005": "-11005" } });
  }
})

// /wcs/resources/store/11/seo/token?q=byUrlKeywordNames
storeRouter.get('/:storeId/seo/token', (req, res) => {
  res.status(200).json({
    "resourceId": "https://commerce-preview.sbx0127.play.hclsofy.com:5443/wcs/resources/store/11/seo/token?q=byUrlKeywordNames",
    "resourceName": "token",
    "resultList": []
  });
})

// /wcs/resources/store/11/seo/urlkeyword?q=byLanguageIdAndTokenNameValue&tokenName=StoreToken:CatalogToken&tokenValue=15051&languageId=-5
storeRouter.get('/:storeId/seo/urlkeyword', (req, res) => {
  res.status(200).json({
    "resourceId": "https://commerce-preview.sbx0127.play.hclsofy.com:5443/wcs/resources/store/11/seo/urlkeyword?q=byLanguageIdAndTokenNameValue&tokenName=StoreToken:CatalogToken&tokenValue=15051&languageId=-5",
    "resourceName": "urlkeyword",
    "resultList": [
      {}
    ]
  });
})

export default storeRouter;
