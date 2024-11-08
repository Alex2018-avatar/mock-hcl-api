import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { logger } from '../../../config/logger.js';

const geoNodeRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// /wcs/resources/store/15051/geonode/byTopGeoNode?siteLevelSearch=false
geoNodeRouter.get('/:storeId/geonode/byTopGeoNode', (req, res) => {
  res.status(200).send({
    "recordSetCount": "1",
    "resourceId": "https:\/\/www.b2cdev3auth.claro.com.co:5443\/wcs\/resources\/store\/15051\/geonode\/byTopGeoNode?siteLevelSearch=false",
    "Description": [
      {
        "shortDescription": "Colombia"
      }
    ],
    "name": "CO",
    "recordSetStartNumber": "0",
    "resourceName": "geonode",
    "type": "CNTY",
    "recordSetTotal": "1",
    "recordSetComplete": "true",
    "uniqueID": "715846884"
  })
});

// /wcs/resources/store/15051/geonode/byParentGeoNode/715846884
geoNodeRouter.get('/:storeId/geonode/byParentGeoNode/:parentId', async (req, res) => {
  const { parentId, storeId } = req.params;
  const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/geonode/${parentId}.json`);
  // read file
  try {
    const data = await fsPromises.readFile(filePath, 'utf8');
    const response = JSON.parse(data);
    res.status(200).json(response);
  } catch (error) {
    console.log('error: ', error);
    logger.error(error.message)
    res.status(404).json({
      "recordSetCount": "33",
      "resourceId": "https:\/\/www.b2cdev3auth.claro.com.co:5443\/wcs\/resources\/store\/15051\/geonode\/byParentGeoNode\/715846884",
      "GeoNode": []
    });
  }
});

/*
{"firstName":"Juan","lastName":"Ramos","logonId":"demo@gmail.com","logonPassword":"Avatar321","logonPasswordVerify":"Avatar321","registerType":"G","profileType":"C","email1":"demo@gmail.com","phone1":"","storeId":"11","catalogId":"11501","preferredLanguage":"-1","receiveEmail":"true","receiveEmailPreference":[{"value":"true","storeID":"11"}],"challengeQuestion":"-","challengeAnswer":"-"}

*/


export default geoNodeRouter;
