import express from "express";
import path from "node:path";
import session from "express-session";
import { fileURLToPath } from "url";
import helmet from "helmet";
import compression from "compression";
import https from "https";
import fs from "node:fs";
import SQLiteStoreFactory from "connect-sqlite3";
// routes
import mainRouter from "./routes/transaction/store/main";
import storeRouter from "./routes/transaction/store/store";
import organizationRouter from "./routes/transaction/organization/organization";
import orderHistoryRouter from "./routes/transaction/order-history/history";
import categoriesRouter from "./routes/search/categories/categories";
import seoUrlRouter from "./routes/search/seo_url/seoUrl";
import productsRouter from "./routes/search/products/products";
import eSpotRouter from "./routes/transaction/espot/espot";
import authRouter from "./routes/transaction/auth/login";
import userRouter from "./routes/transaction/user/user";
import inventoryRouter from "./routes/transaction/inventory/inventory";
import promotionRouter from "./routes/transaction/promotions/promotions";
import shippingRouter from "./routes/transaction/shipping/shipping";
import xparametersRouter from "./routes/transaction/xparameters/index";
import cartRoutes from "./routes/transaction/cart/index";
import cartRoutesV2 from "@routes/transaction/cart/cart";
import geoNodeRouter from "./routes/transaction/geonode/geonode";
import addressRouter from "./routes/transaction/address/address";
import orderRouter from "./routes/transaction/order/order";
import customRouter from "./routes/transaction/custom/index";
import { config } from "./config/config";
import { logger, morganMiddleware } from "./config/logger";
import cookieParser from "cookie-parser";
import shippingInfoRouter from "./routes/transaction/shipping/shipping-info";
import customClaroRouter from "./routes/transaction/payment/payment";
import promisesRouter from "./routes/transaction/promises/promises";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";

const SQLiteStore = SQLiteStoreFactory(session) as unknown as new (options: {
  db: string;
  dir: string;
  concurrentDB: boolean;
}) => session.Store;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.disable("x-powered-by");
app.use(compression());
app.use(cors({ credentials: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(morganMiddleware);
app.use(cookieParser());
app.set("title", "My mock API");
// Configurar sesiones
app.use(
  session({
    secret: "your-secret-key-sjdj@sjsjsjk-4sd4s4d4",
    resave: false,
    saveUninitialized: true,
    store: new SQLiteStore({
      db: "sessions.db",
      dir: path.resolve(process.cwd(), "src/database"),
      concurrentDB: true,
    }),
    cookie: {
      secure: true,
      maxAge: 86400000,
    }, // 1 día de vida  Q
  })
);

// transactionContextPath is '/wcs/resources/store'
app.use(mainRouter);
app.use(config.transactionContextPath, storeRouter);
app.use(config.transactionContextPath, organizationRouter);
app.use(config.transactionContextPath, orderHistoryRouter);
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
app.use((req, res, _next) => {
  logger.error(`${req.method} ${req.originalUrl}`);
  res.status(404).json({});
});
app.use(errorHandler);

const options = {
  key: fs.readFileSync(path.join(__dirname, "../ssl/private.pem")), // Clave privada
  cert: fs.readFileSync(path.join(__dirname, "../ssl/certificate.crt")), // Certificado
  // ca: fs.readFileSync(path.join(__dirname, 'ssl/ca_bundle.crt')), // Cadena de certificados (si la tienes)
  passphrase: "demo",
};
app.listen(3000, () => {
  logger.info(`[SERVER] Server is running on: http://localhost:3000`);
});
https.createServer(options, app).listen(3001, () => {
  logger.info("[SERVER] HTTPS is running on https://localhost:3001");
});
