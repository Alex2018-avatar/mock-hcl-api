import express from 'express';
import storeRouter from './routes/transaction/store/store.js';
import organizationRouter from './routes/transaction/organization/organization.js';
import categoriesRouter from './routes/search/categories/categories.js';
import seoUrlRouter from './routes/search/seo_url/seoUrl.js';
import productsRouter from './routes/search/products/products.js';
import eSpotRouter from './routes/transaction/espot/espot.js';
import { config } from './conf/config.js';

const app = express();


app.get('/', (req, res) => {
  res.send('Hello World');
})

// transactionContextPath is '/wcs/resources/store'
app.use(config.transactionContextPath, storeRouter);
app.use(config.transactionContextPath, organizationRouter);
app.use(config.v2SearchContextPath, categoriesRouter);
app.use(config.v2SearchContextPath, seoUrlRouter);
app.use(config.v2SearchContextPath, productsRouter);
app.use(config.transactionContextPath, eSpotRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})