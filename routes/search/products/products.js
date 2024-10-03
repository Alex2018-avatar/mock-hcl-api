import express from 'express';
import productsJSON from '../../../data/search/products/products.json' assert { type: "json" };
// import onlineStoreJSON from '../../../data/online_store.json' assert { type: "json" };

const app = express();
const productsRouter = app.router;

// Products by category id
// /search/resources/api/v2/products?storeId=11&categoryId=10502&limit=12&offset=0&contractId=-11005&currency=USD&langId=-1&profileName=HCL_V2_findProductsByCategoryWithPriceRange
productsRouter.get('/products', (req, res) => {
  res.status(200).json(productsJSON);
})

// /wcs/resources/store/11/country/country_state_list?langId=-1
// categoriesRouter.get('/:storeId/country/country_state_list', (req, res) => {
//   res.status(200).json(countriesJSON);
// })


export default productsRouter;
