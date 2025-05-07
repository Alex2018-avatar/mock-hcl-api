
import fs from 'node:fs';
import path from 'node:path';
import https from 'https';
// import { logger } from '../app/config/logger.js';
import { emsWidgets } from '../constants/ruby-ems.js';

const fsPromises = fs.promises;
const __dirname = path.resolve();
const BASE_URL = 'https://commerce-preview.sbx0199.play.hclsofy.com';
const apiPath = '/wcs/resources/store/41/espot'
const apiParams = '?catalogId=11501&DM_ReturnCatalogGroupId=true&DM_FilterResults=false&DM_ReqCmd=TopCategoriesDisplay&langId=-1';
// /wcs/resources/store/9701/espot/Widget_clarob2c-marketing-content-widget_12609?catalogId=20000&DM_ReturnCatalogGroupId=true&DM_FilterResults=false&DM_ReqCmd=TopCategoriesDisplay&langId=-5

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Función para guardar el widget en un archivo JSON
const saveWidgetData = async (widgetName, data) => {
  const filePath = path.resolve(__dirname, `./src/data/Ruby/spots/${widgetName}.json`);
  try {
    await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`[SAVED] ${widgetName}`);
    console.log(`************************************************************`);
  } catch (error) {
    console.error(`Error al guardar el widget ${widgetName}:`, error);
  }
}

// Función principal para obtener y guardar los datos de cada widget
const fetchWidgets = async () => {
  for (const ems of emsWidgets) {
    try {
      console.log(`[LOADING] ${ems}`);
      const url = `${BASE_URL}${apiPath}/${ems}${apiParams}`;
      const response = await fetch(url, { agent: httpsAgent });
      const widgetData = await response.json();
      // Guardar los datos del widget en un archivo JSON
      await saveWidgetData(ems, widgetData);
    } catch (error) {
      console.log('error: ', error);
      //console.error(`Error al obtener los datos del widget ${ems}:`, error);
    }

    await delay(1000);
  }
};

fetchWidgets();