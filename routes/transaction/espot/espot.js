import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';


const app = express();
const eSpotRouter = app.router;
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// /wcs/resources/store/15051/espot/Widget_clarob2b-content-carousel-widget_13612?catalogId=20000&DM_ReturnCatalogGroupId=true&DM_FilterResults=false&DM_ReqCmd=TopCategoriesDisplay&langId=-5
eSpotRouter.get('/:storeId/espot/:emsName', async (req, res) => {
  const { storeId, emsName } = req.params;
  console.log('emsName: ', emsName);
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/layouts/spots/${emsName}.json`);
  // read file
  try {
    const data = await fsPromises.readFile(filePath, 'utf8');
    const response = JSON.parse(data);
    res.status(200).json(response);
  } catch (error) {
    console.log('error: ', error);
    res.status(404).json({ "contents": [] });
  }
});



export default eSpotRouter;
