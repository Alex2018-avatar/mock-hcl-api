import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import storeRouter from './routes/transaction/store/store.js';
import organizationRouter from './routes/transaction/organization/organization.js';
import categoriesRouter from './routes/search/categories/categories.js';
import seoUrlRouter from './routes/search/seo_url/seoUrl.js';
import productsRouter from './routes/search/products/products.js';
import eSpotRouter from './routes/transaction/espot/espot.js';
import authRouter from './routes/transaction/auth/login.js';
import userRouter from './routes/transaction/user/user.js';
import { config } from './conf/config.js';
import { logger, morganMiddleware } from './config/logger.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(morganMiddleware);

// transactionContextPath is '/wcs/resources/store'
app.use(config.transactionContextPath, storeRouter);
app.use(config.transactionContextPath, organizationRouter);
app.use(config.v2SearchContextPath, categoriesRouter);
app.use(config.v2SearchContextPath, seoUrlRouter);
app.use(config.v2SearchContextPath, productsRouter);
app.use(config.transactionContextPath, eSpotRouter);
app.use(config.transactionContextPath, authRouter);
app.use(config.transactionContextPath, userRouter);

// Middleware para manejar 404
app.use((req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl}`);
  res.status(404).json({});
});

app.listen(3000, () => {
  logger.info(`[SERVER] Server is running on: http://localhost:3000`);
})