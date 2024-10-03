import express from 'express';
import homeLayoutJSON from '../../../data/search/layouts/home.json' assert { type: "json" };
import productListLayoutJSON from '../../../data/search/layouts/productList.json' assert { type: "json" };
// import onlineStoreJSON from '../../../data/online_store.json' assert { type: "json" };

const app = express();
const seoUrlRouter = app.router;

// /search/resources/api/v2/urls?storeId=11&identifier=home
seoUrlRouter.get('/urls', (req, res) => {
  console.log('req: ', req.query);
  const { storeId, identifier } = req.query;
  if (storeId === '' || identifier === '') {
    res.status(200).json({ "contents": [] });
  }

  if (identifier === 'home') {
    res.status(200).json(homeLayoutJSON);
  } else if (identifier === 'furniture') {
    res.status(200).json(productListLayoutJSON);
  }
})

// // /wcs/resources/store/11/country/country_state_list?langId=-1
// categoriesRouter.get('/:storeId/country/country_state_list', (req, res) => {
//   res.status(200).json(countriesJSON);
// })


export default seoUrlRouter;
