import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const inventoryRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/11/inventoryavailability/byPartNumber/DR-TBLS-0004-0001?langId=-1
inventoryRouter.get('/:storeId/inventoryavailability/byPartNumber/:partNumber', async (req, res) => {
  const { storeId, partNumber } = req.params;
  try {
    const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/inventory/inventory.json`);
    const data = await fsPromises.readFile(filePath, 'utf8');
    const response = JSON.parse(data);

    // search in response by partNumber
    const inventory = response.find(item => item.partNumber === partNumber);
    if (!inventory) {
      res.status(200).json({ "InventoryAvailability": [] });
    } else {
      res.status(200).json({
        "InventoryAvailability": [inventory],
        "resourceId": "https://toolkit-legacy-v9115:443/wcs/resources/store/10251/inventoryavailability/byPartNumber/PO_Equ70038567",
        "resourceName": "inventoryavailability"
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// /wcs/resources/store/11/inventoryavailability/200,1024?langId=-1&physicalStoreId=1003&onlineStoreId=10001&responseFormat=json
inventoryRouter.get('/:storeId/inventoryavailability/:productIds', async (req, res) => {
  const { storeId, productIds } = req.params;
  try {
    const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/inventory/inventory.json`);
    const data
      = await fsPromises
        .readFile(filePath, 'utf8');
    const response = JSON.parse(data);
    const productIdsArray = productIds.split(',');

    const inventory = response.filter(item => productIdsArray.includes(item.productId));
    res.status(200).json({
      "InventoryAvailability": inventory,
      "resourceId": "https://toolkit-legacy-v9115:443/wcs/resources/store/10251/inventoryavailability/byPartNumber/PO_Equ70038567",
      "resourceName": "inventoryavailability"
    });
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ error: error.message });
  }
});



export default inventoryRouter;
