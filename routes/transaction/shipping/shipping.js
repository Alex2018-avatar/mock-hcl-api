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


// /wcs/resources/store/41/cart/@self/usable_shipping_info?langId=-
shippingRouter.get('/:storeId/cart/@self/usable_shipping_info', async (req, res) => {
  res.status(200).json({
    "resourceId": "https:\/\/commerce-preview.sbx0394.play.hclsofy.com:5443\/wcs\/resources\/store\/41\/cart\/@self\/usable_shipping_info?langId=-1",
    "usableShippingAddress": [
      {
        "nickName": "casa",
        "addressId": "3074457362951363813"
      },
      {
        "nickName": "poxx@gmail.com",
        "addressId": "3074457362950387085"
      }
    ],
    "orderId": "12945575",
    "orderItem": [
      {
        "usableShippingMode": [
          {
            "shipModeCode": "PickupInStore",
            "description": "Pickup in store",
            "shipModeId": "14001",
            "language": "-1"
          },
          {
            "carrier": "Express",
            "shipModeCode": "Express",
            "description": "Express",
            "shipModeId": "14002",
            "language": "-1"
          },
          {
            "carrier": "XYZ Carrier",
            "shipModeCode": "US Regular Delivery",
            "description": "US - Regular Delivery",
            "shipModeId": "15001",
            "language": "-1"
          },
          {
            "carrier": "XYZ Carrier",
            "shipModeCode": "US - Overnight Delivery",
            "description": "US - Overnight Delivery",
            "shipModeId": "15002",
            "language": "-1"
          },
          {
            "carrier": "XYZ Carrier",
            "shipModeCode": "US - 2-Day Express Delivery",
            "description": "US - 2-Day Express Delivery",
            "shipModeId": "15003",
            "language": "-1"
          },
          {
            "carrier": "International Carrier",
            "shipModeCode": "International Priority",
            "description": "International Priority",
            "shipModeId": "15004",
            "language": "-1"
          },
          {
            "carrier": "International Carrier",
            "shipModeCode": "International Regular",
            "description": "International Regular",
            "shipModeId": "15005",
            "language": "-1"
          },
          {
            "carrier": "Mail",
            "shipModeCode": "Mail",
            "description": "Mail",
            "shipModeId": "22501",
            "language": "-1"
          }
        ],
        "usableShippingAddress": [
          {
            "nickName": "casa",
            "addressId": "3074457362951363813"
          },
          {
            "nickName": "poxx@gmail.com",
            "addressId": "3074457362950387085"
          }
        ],
        "orderItemId": "10029"
      }
    ],
    "resourceName": "cart"
  })
});



export default shippingRouter;
