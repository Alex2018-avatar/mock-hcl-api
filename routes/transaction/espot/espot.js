import express from 'express';
import countriesJSON from '../../../data/country_state.json' assert { type: "json" };
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';


const app = express();
const eSpotRouter = app.router;

// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// /wcs/resources/store/15051/espot/Widget_clarob2b-content-carousel-widget_13612?catalogId=20000&DM_ReturnCatalogGroupId=true&DM_FilterResults=false&DM_ReqCmd=TopCategoriesDisplay&langId=-5
eSpotRouter.get('/:storeId/espot/:emsName', (req, res) => {
  // I want to response data depending of emsName the responses are in ../../../data/search/layouts/home/emsName.json
  // I need to read the json with the emsName and return it

  const emsName = req.params.emsName;
  console.log('emsName: ', emsName);
  const filePath = path.resolve(__dirname, `../../../data/search/layouts/home/${emsName}.json`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    try {
      const emsNameJSON = JSON.parse(data);
      res.status(200).json(emsNameJSON);
    } catch (parseError) {
      res.status(500).json({ error: 'Error al procesar el archivo JSON' });
    }
  });
})



export default eSpotRouter;
