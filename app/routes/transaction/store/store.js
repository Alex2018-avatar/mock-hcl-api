import express from 'express';
import { StoreController } from '../../../controllers/store/store.js';
import { addFolder } from '../../../middleware/auth.js';

const app = express();
const storeRouter = app.router;

// /wcs/resources/store/0/adminLookup?q=findByStoreIdentifier&storeIdentifier=Emerald
storeRouter.get('/:storeId/adminLookup', StoreController.getAdminLookup);

// /wcs/resources/store/11/online_store
storeRouter.get('/:storeId/online_store', addFolder, StoreController.getOnlineStore)

// /wcs/resources/store/11/features?langId=-1
storeRouter.get('/:storeId/features', addFolder, StoreController.getFeatures);

// /wcs/resources/store/11/contract?q=eligible&langId=-1
storeRouter.get('/:storeId/contract', (req, res) => {
  const { storeId } = req.params;
  if (storeId === '10251') {
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
storeRouter.get('/:storeId/seo/token', addFolder, StoreController.getSeoToken);

// /wcs/resources/store/11/seo/urlkeyword?q=byLanguageIdAndTokenNameValue&tokenName=StoreToken:CatalogToken&tokenValue=10251&languageId=-5
storeRouter.get('/:storeId/seo/urlkeyword', addFolder, StoreController.getSeoUrlKeyword);

export default storeRouter;
