import express from 'express';
import categoriesJSON from '../../../data/search/categories.json' assert { type: "json" };
// import onlineStoreJSON from '../../../data/online_store.json' assert { type: "json" };

const app = express();
const categoriesRouter = app.router;

// /search/resources/api/v2/categories?storeId=11&depthAndLimit=11%2C11&contractId=-11005&langId=-1
categoriesRouter.get('/categories', (req, res) => {
  res.status(200).json(categoriesJSON);
})

// /wcs/resources/store/11/country/country_state_list?langId=-1
// categoriesRouter.get('/:storeId/country/country_state_list', (req, res) => {
//   res.status(200).json(countriesJSON);
// })


export default categoriesRouter;
