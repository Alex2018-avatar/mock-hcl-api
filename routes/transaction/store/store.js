import express from 'express';
import adminLookupJSON from '../../../data/adminLookup.json' assert { type: "json" };
import onlineStoreJSON from '../../../data/online_store.json' assert { type: "json" };

const app = express();
const storeRouter = app.router;

// /wcs/resources/store/0/adminLookup?q=findByStoreIdentifier&storeIdentifier=Emerald
storeRouter.get('/:storeId/adminLookup', (req, res) => {
  res.status(200).json(adminLookupJSON);
})

// /wcs/resources/store/11/online_store
storeRouter.get('/:storeId/online_store', (req, res) => {
  res.status(200).json(onlineStoreJSON);
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
  res.status(200).json({ "contracts": { "-11005": "-11005" } });
})

// /wcs/resources/store/11/seo/token?q=byUrlKeywordNames
storeRouter.get('/:storeId/seo/token', (req, res) => {
  res.status(200).json({
    "resourceId": "https://commerce-preview.sbx0127.play.hclsofy.com:5443/wcs/resources/store/11/seo/token?q=byUrlKeywordNames",
    "resourceName": "token",
    "resultList": []
  });
})

export default storeRouter;
