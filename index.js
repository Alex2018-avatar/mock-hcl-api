import express from 'express';
import path from 'node:path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import storeRouter from './routes/transaction/store/store.js';
import organizationRouter from './routes/transaction/organization/organization.js';
import categoriesRouter from './routes/search/categories/categories.js';
import seoUrlRouter from './routes/search/seo_url/seoUrl.js';
import productsRouter from './routes/search/products/products.js';
import eSpotRouter from './routes/transaction/espot/espot.js';
import authRouter from './routes/transaction/auth/login.js';
import userRouter from './routes/transaction/user/user.js';
import inventoryRouter from './routes/transaction/inventory/inventory.js';
import promotionRouter from './routes/transaction/promotions/promotions.js';
import shippingRouter from './routes/transaction/shipping/shipping.js';
import xparametersRouter from './routes/transaction/xparameters/index.js';
import cartRoutes from './routes/transaction/cart/index.js';
import geoNodeRouter from './routes/transaction/geonode/geonode.js';
import addressRouter from './routes/transaction/address/address.js';
import orderRouter from './routes/transaction/order/order.js';
import customRouter from './routes/transaction/custom/index.js';
import { config } from './conf/config.js';
import { logger, morganMiddleware } from './config/logger.js';
import cookieParser from 'cookie-parser';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(morganMiddleware);
app.use(cookieParser());
// Configurar sesiones
app.use(
  session({
    secret: 'your-secret-key-sjdj@sjsjsjk-4sd4s4d4',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// transactionContextPath is '/wcs/resources/store'
app.use(config.transactionContextPath, storeRouter);
app.use(config.transactionContextPath, organizationRouter);
app.use(config.v2SearchContextPath, categoriesRouter);
app.use(config.v2SearchContextPath, seoUrlRouter);
app.use(config.v2SearchContextPath, productsRouter);
app.use(config.transactionContextPath, eSpotRouter);
app.use(config.transactionContextPath, authRouter);
app.use(config.transactionContextPath, userRouter);
app.use(config.transactionContextPath, inventoryRouter);
app.use(config.transactionContextPath, promotionRouter);
app.use(config.transactionContextPath, shippingRouter);
app.use(config.transactionContextPath, xparametersRouter);
app.use(config.transactionContextPath, cartRoutes);
app.use(config.transactionContextPath, geoNodeRouter);
app.use(config.transactionContextPath, addressRouter);
app.use(config.transactionContextPath, orderRouter);
app.use(config.transactionContextPath, customRouter);

// Middleware para manejar 404
app.use((req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl}`);
  res.status(404).json({});
});

app.listen(3000, () => {
  logger.info(`[SERVER] Server is running on: http://localhost:3000`);
})