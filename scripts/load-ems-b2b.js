
import fs from 'node:fs';
import path from 'node:path';
import https from 'https';
import { logger } from '../config/logger.js';

const fsPromises = fs.promises;
const __dirname = path.resolve();
const BASE_URL = 'https://tsapp.b2cdev3auth.claro.com.co';
const apiPath = '/wcs/resources/store/15051/espot'
const apiParams = '?catalogId=20000&DM_ReturnCatalogGroupId=true&DM_FilterResults=false&DM_ReqCmd=TopCategoriesDisplay&langId=-5';
// /wcs/resources/store/9701/espot/Widget_clarob2c-marketing-content-widget_12609?catalogId=20000&DM_ReturnCatalogGroupId=true&DM_FilterResults=false&DM_ReqCmd=TopCategoriesDisplay&langId=-5
const emsWidgets = [
  // 'ems_content_footer',
  // 'ems_content_footer_checkout',
  'Widget_clarob2b-content-carousel-widget_10567',
  'Widget_clarob2b-category-recommendation-widget_11055',
  'Widget_content-recommendation-widget_12554',
  'Widget_clarob2b-content-carousel-widget_10570',
  'Widget_clarob2b-catalog-entry-recommendation-widget_12551',
  'Widget_content-recommendation-widget_10574',
  'Widget_content-recommendation-widget_10575',
  'Widget_clarob2b-content-carousel-widget_10576'
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Función para guardar el widget en un archivo JSON
const saveWidgetData = async (widgetName, data) => {
  const filePath = path.resolve(__dirname, `./data/15051-store/layouts/spots/${widgetName}.json`);
  try {
    await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
    logger.info(`[SAVED] ${widgetName}`);
    logger.warn(`************************************************************`);
  } catch (error) {
    console.error(`Error al guardar el widget ${widgetName}:`, error);
  }
}

// Función principal para obtener y guardar los datos de cada widget
const fetchWidgets = async () => {
  for (const ems of emsWidgets) {
    try {
      logger.info(`[LOADING] ${ems}`);
      const url = `${BASE_URL}${apiPath}/${ems}${apiParams}`;
      logger.info(url);
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