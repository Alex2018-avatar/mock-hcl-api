import express from 'express';
import path from 'node:path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import compression from 'compression';
import https from 'https';
import fs from 'node:fs';
import SQLiteStoreFactory from 'connect-sqlite3';
// routes
import mainRouter from './app/routes/transaction/store/main.js';
import storeRouter from './app/routes/transaction/store/store.js';
import organizationRouter from './app/routes/transaction/organization/organization.js';
import categoriesRouter from './app/routes/search/categories/categories.js';
import seoUrlRouter from './app/routes/search/seo_url/seoUrl.js';
import productsRouter from './app/routes/search/products/products.js';
import eSpotRouter from './app/routes/transaction/espot/espot.js';
import authRouter from './app/routes/transaction/auth/login.js';
import userRouter from './app/routes/transaction/user/user.js';
import inventoryRouter from './app/routes/transaction/inventory/inventory.js';
import promotionRouter from './app/routes/transaction/promotions/promotions.js';
import shippingRouter from './app/routes/transaction/shipping/shipping.js';
import xparametersRouter from './app/routes/transaction/xparameters/index.js';
import cartRoutes from './app/routes/transaction/cart/index.js';
import geoNodeRouter from './app/routes/transaction/geonode/geonode.js';
import addressRouter from './app/routes/transaction/address/address.js';
import orderRouter from './app/routes/transaction/order/order.js';
import customRouter from './app/routes/transaction/custom/index.js';
import cartRoutesV2 from './app/routes/transaction/cart/cart.js';
import { config } from './conf/config.js';
import { logger, morganMiddleware } from './app/config/logger.js';
import cookieParser from 'cookie-parser';
import shippingInfoRouter from './app/routes/transaction/shipping/shipping-info.js';
import customClaroRouter from './app/routes/transaction/payment/payment.js';
import promisesRouter from './app/routes/transaction/promises/promises.js';
import cors from 'cors'

const SQLiteStore = SQLiteStoreFactory(session);

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.disable('x-powered-by');
app.use(compression());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(morganMiddleware);
app.use(cookieParser());
app.set('title', 'My mock API');
// Configurar sesiones
app.use(
  session({
    secret: 'your-secret-key-sjdj@sjsjsjk-4sd4s4d4',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new SQLiteStore({
      db: 'sessions.db',
      dir: path.resolve(process.cwd(), 'app/database'),
      concurrentDB: true,
    }),
    cookie: { secure: false, maxAge: 86400000 } // 1 día de vida  Q
  })
);

// transactionContextPath is '/wcs/resources/store'
app.use(mainRouter);
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
app.use(config.transactionContextPath, cartRoutesV2);
app.use(config.transactionContextPath, shippingInfoRouter);
app.use(config.transactionContextPath, customClaroRouter);
app.use(config.transactionContextPath, promisesRouter);

// Middleware para manejar 404
app.use((req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl}`);
  res.status(404).json({});
});

const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl/private.pem')), // Clave privada
  cert: fs.readFileSync(path.join(__dirname, 'ssl/certificate.crt')),   // Certificado
  // ca: fs.readFileSync(path.join(__dirname, 'ssl/ca_bundle.crt')), // Cadena de certificados (si la tienes)
  passphrase: 'demo'
};
app.listen(3000, () => {
  logger.info(`[SERVER] Server is running on: http://localhost:3000`);
})
https.createServer(options, app).listen(3001, () => {
  logger.info('[SERVER] HTTPS is running on https://localhost:3001');
});
