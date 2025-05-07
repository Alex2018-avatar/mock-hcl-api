import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { logger } from "../../../config/logger.js";
import { addFolder } from "../../../middleware/auth.js";
import { getESpot } from "@controllers/transaction/spots/spots.js";

const app = express();
const eSpotRouter = app.router;
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/10251/espot/Widget_clarob2b-content-carousel-widget_13612?catalogId=20000&DM_ReturnCatalogGroupId=true&DM_FilterResults=false&DM_ReqCmd=TopCategoriesDisplay&langId=-5
eSpotRouter.get("/:storeId/espot/:emsName", addFolder, getESpot);
// eSpotRouter.get("/:storeId/espots/:emsName", addFolder, async (req, res) => {
//   const { emsName } = req.params;
//   const _folder = req.storeIdentifier;
//   const filePath = path.resolve(
//     __dirname,
//     `../../../data/${_folder}/spots/${emsName}.json`
//   );
//   // read file
//   try {
//     const data = await fsPromises.readFile(filePath, "utf8");
//     const response = JSON.parse(data);
//     res.status(200).json(response);
//   } catch (error) {
//     logger.error(error.message);
//     res.status(404).json({ contents: [] });
//   }
// });

export default eSpotRouter;
