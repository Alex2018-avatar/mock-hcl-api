
import fs from 'node:fs';
import path from 'node:path';
import https from 'https';
import { logger } from '../config/logger.js';

const fsPromises = fs.promises;
const __dirname = path.resolve();
const BASE_URL = 'https://10.82.2.78:9443';
const apiPath = '/wcs/resources/store/9701/espot'
const apiParams = '?catalogId=20000&DM_ReturnCatalogGroupId=true&DM_FilterResults=false&DM_ReqCmd=TopCategoriesDisplay&langId=-5';
// /wcs/resources/store/9701/espot/Widget_clarob2c-marketing-content-widget_12609?catalogId=20000&DM_ReturnCatalogGroupId=true&DM_FilterResults=false&DM_ReqCmd=TopCategoriesDisplay&langId=-5
const emsWidgets = [
  'EMS_ERROR_LOGIN_CUSTOMER_SEARCH_NOT_REGISTERED',
  'EMS_CHANGE_PASSWORD_SUCCESS',
  'EMS_ERROR_CUSTOMER_CHANGEPASS_CHANNEL_NOT_CORRESPOND',
  'EMS_ERROR_CUSTOMER_CHANGEPASS_REQUIRED_FILEDS',
  'EMS_ERROR_CUSTOMER_CHANGEPASS_USER_NOT_REGISTERED',
  'EMS_ERROR_CUSTOMER_RECOVERYPASS_CHANNEL_NOT_CORRESPOND',
  'EMS_ERROR_CUSTOMER_RECOVERYPASS_REQUIRED_FILEDS',
  'EMS_ERROR_CUSTOMER_RECOVERYPASS_USER_NOT_REGISTERED',
  'EMS_ERROR_LOGIN_CHANNEL_NOT_CORRESPOND',
  'EMS_ERROR_LOGIN_CUSTOMER_SEARCH_CHANNEL_NOT_CORRESPOND',
  'EMS_ERROR_LOGIN_CUSTOMER_SEARCH_NOT_REGISTERED ',
  'EMS_ERROR_LOGIN_CUSTOMER_SEARCH_REQUIRED_FIELDS',
  'EMS_ERROR_LOGIN_NOT_REGISTERED',
  'EMS_ERROR_LOGIN_REQUIRED_FIELDS',
  'EMS_ERROR_TOKEN_INVALID_CREDENTIAL',
  'EMS_ERROR_TOKEN_REQUIRED_FIELDS',
  'EMS_GENERIC_ERROR',
  'EMS_ERROR_REGISTER_CUSTOMER_SAVE_CHANNEL_NOT_CORRESPOND',
  'EMS_ERROR_REGISTER_CUSTOMER_SAVE_ERROR_LEGADO',
  'EMS_ERROR_REGISTER_CUSTOMER_SAVE_REQUIRED_FIELDS',
  'EMS_ERROR_REGISTER_CUSTOMER_SAVE_ERROR',
  'EMS_ERROR_REGISTER_CUSTOMER_VALIDATE_CHANNEL_NOT_CORRESPOND',
  'EMS_ERROR_REGISTER_CUSTOMER_VALIDATE_REQUIRED_FIELDS',
  'EMS_ERROR_REGISTER_CUSTOMER_VALIDATE_ERROR_LEGADO',
  'EMS_ERROR_REGISTER_CUSTOMER_VALIDATE_ERROR',
  'EMS_ERROR_REGISTER_CUSTOMER_SEARCH_REGISTERED',
  'EMS_ERROR_REGISTER_CUSTOMER_SEARCH_CHANNEL_NOT_CORRESPOND',
  'EMS_ERROR_REGISTER_CUSTOMER_SEARCH_REQUIRED_FIELDS',
  'EMS_ERROR_REGISTER_CUSTOMER_SEARCH_ERROR',
  'EMS_ERROR_REGISTER_CUSTOMER_SEARCH_NOT_REGISTERED',
  'Widget_clarob2c-marketing-content-widget_12603'
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Función para guardar el widget en un archivo JSON
const saveWidgetData = async (widgetName, data) => {
  const filePath = path.resolve(__dirname, `./data/9701-store/layouts/spots/${widgetName}.json`);
  try {
    await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
    logger.info(`[SAVED] ${widgetName}`);
    logger.info(`************************************************************`);
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