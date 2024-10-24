import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const shippingRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/9701/cart/shipping_modes?langId=-5
shippingRouter.get('/:storeId/cart/shipping_modes', async (req, res) => {
  try {
    res.status(200).json({
      "usableShippingMode": [
        {
          "field1": null,
          "shipModeCode": "PickupInStore",
          "shipModeDescription": "Recoger en tienda",
          "shipModeId": "715837884",
          "field2": null
        },
        {
          "field1": null,
          "shipModeCode": "Express",
          "shipModeDescription": "Expresó",
          "shipModeId": "715837934",
          "field2": "Expresó"
        },
        {
          "field1": null,
          "shipModeCode": "Mail",
          "shipModeDescription": "Mail",
          "shipModeId": "715837984",
          "field2": null
        }
      ],
      "resourceName": "cart"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




export default shippingRouter;
