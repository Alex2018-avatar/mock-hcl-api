import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { addFolder } from "../../../middleware/auth";
import { HistoryController } from "../../../controllers/history/history";

const app = express();
const orderHistoryRouter = app.router;
const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/41/order/byStatus/N,M,A,B,C,R,S,D,F,G,L,W,APP,RTN
orderHistoryRouter.get(
  "/:storeId/order/ext/byStatus/:orderStatus",
  addFolder,
  HistoryController.getOrderHistory
);

export default orderHistoryRouter;
