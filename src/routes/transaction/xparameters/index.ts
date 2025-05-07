import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { addFolder } from "../../../middleware/auth";
import { FileUtil } from "../../../services/FileService";
import { logger } from "../../../config/logger.js";
import { getStoreParams } from "@controllers/transaction/store-parameters/store-params";

const parametersRouter = express.Router();
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /api/resources/store/10251/xparameters/STORE_CONF?langId=-5
parametersRouter.get("/:storeId/xparameters/:group", addFolder, getStoreParams);

export default parametersRouter;
