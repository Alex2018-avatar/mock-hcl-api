import express from "express";
import Store from "../../../controllers/store/store.js";
import { addFolder } from "../../../middleware/auth.js";

const app = express();
const storeRouter = app.router;

// /wcs/resources/store/0/adminLookup?q=findByStoreIdentifier&storeIdentifier=Emerald
storeRouter.get("/:storeId/adminLookup", Store.getAdminLookup);

// /wcs/resources/store/11/online_store
storeRouter.get("/:storeId/online_store", addFolder, Store.getOnlineStore);

// /wcs/resources/store/11/features?langId=-
1;

storeRouter.get("/:storeId/features", addFolder, Store.getFeatures);

// /wcs/resources/store/11/contract?q=eligible&langId=-1
storeRouter.get("/:storeId/contract", Store.getContract);

// /wcs/resources/store/11/seo/token?q=byUrlKeywordNames
storeRouter.get("/:storeId/seo/token", addFolder, Store.getSeoToken);

// /wcs/resources/store/11/seo/urlkeyword?q=byLanguageIdAndTokenNameValue&tokenName=StoreToken:CatalogToken&tokenValue=10251&languageId=-5
storeRouter.get("/:storeId/seo/urlkeyword", addFolder, Store.getSeoUrlKeyword);

export default storeRouter;
