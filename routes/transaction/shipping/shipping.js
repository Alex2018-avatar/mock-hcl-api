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
          "shipModeDescription": "Pickup in store",
          "shipModeId": "14001",
          "field2": null
        },
        {
          "field1": null,
          "shipModeCode": "Express",
          "shipModeDescription": "Express",
          "shipModeId": "14002",
          "field2": "Express"
        },
        {
          "field1": null,
          "shipModeCode": "US Regular Delivery",
          "shipModeDescription": "US - Regular Delivery",
          "shipModeId": "15001",
          "field2": "5 to 10 business days"
        },
        {
          "field1": null,
          "shipModeCode": "US - Overnight Delivery",
          "shipModeDescription": "US - Overnight Delivery",
          "shipModeId": "15002",
          "field2": "1 business day"
        },
        {
          "field1": null,
          "shipModeCode": "US - 2-Day Express Delivery",
          "shipModeDescription": "US - 2-Day Express Delivery",
          "shipModeId": "15003",
          "field2": "2 business days"
        },
        {
          "field1": null,
          "shipModeCode": "International Priority",
          "shipModeDescription": "International Priority",
          "shipModeId": "15004",
          "field2": "1 to 3 business days"
        },
        {
          "field1": null,
          "shipModeCode": "International Regular",
          "shipModeDescription": "International Regular",
          "shipModeId": "15005",
          "field2": "7 to 14 business days"
        },
        {
          "field1": null,
          "shipModeCode": "Mail",
          "shipModeDescription": "Mail",
          "shipModeId": "22501",
          "field2": "Mail"
        }
      ],
      "resourceName": "cart"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// /wcs/resources/store/41/cart/@self/usable_shipping_info?langId=-
// shippingRouter.get('/:storeId/cart/@self/usable_shipping_info', async (req, res) => {
//   res.status(200).json({
//     "resourceId": "https:\/\/commerce-preview.sbx0394.play.hclsofy.com:5443\/wcs\/resources\/store\/41\/cart\/@self\/usable_shipping_info?langId=-5",
//     "usableShippingAddress": [
//       {
//         "nickName": "casa",
//         "addressId": "3074457362951363813"
//       },
//       {
//         "nickName": "poxx@gmail.com",
//         "addressId": "3074457362950387085"
//       }
//     ],
//     "orderId": "12945575",
//     "orderItem": [
//       {
//         "usableShippingMode": [
//           {
//             "shipModeCode": "PickupInStore",
//             "description": "Pickup in store",
//             "shipModeId": "14001",
//             "language": "-1"
//           },
//           {
//             "carrier": "Express",
//             "shipModeCode": "Express",
//             "description": "Express",
//             "shipModeId": "14002",
//             "language": "-5"
//           },
//           {
//             "carrier": "XYZ Carrier",
//             "shipModeCode": "US Regular Delivery",
//             "description": "US - Regular Delivery",
//             "shipModeId": "15001",
//             "language": "-5"
//           },
//           {
//             "carrier": "XYZ Carrier",
//             "shipModeCode": "US - Overnight Delivery",
//             "description": "US - Overnight Delivery",
//             "shipModeId": "15002",
//             "language": "-5"
//           },
//           {
//             "carrier": "XYZ Carrier",
//             "shipModeCode": "US - 2-Day Express Delivery",
//             "description": "US - 2-Day Express Delivery",
//             "shipModeId": "15003",
//             "language": "-5"
//           },
//           {
//             "carrier": "International Carrier",
//             "shipModeCode": "International Priority",
//             "description": "International Priority",
//             "shipModeId": "15004",
//             "language": "-5"
//           },
//           {
//             "carrier": "International Carrier",
//             "shipModeCode": "International Regular",
//             "description": "International Regular",
//             "shipModeId": "15005",
//             "language": "-5"
//           },
//           {
//             "carrier": "Mail",
//             "shipModeCode": "Mail",
//             "description": "Mail",
//             "shipModeId": "22501",
//             "language": "-5"
//           }
//         ],
//         "usableShippingAddress": [
//           {
//             "nickName": "casa",
//             "addressId": "3074457362951363813"
//           },
//           {
//             "nickName": "poxx@gmail.com",
//             "addressId": "3074457362950387085"
//           }
//         ],
//         "orderItemId": "1830001"
//       }
//     ],
//     "resourceName": "cart"
//   })
// });

// wcs/resources/store/9701/cart/@self/shipping_info
shippingRouter.put('/:storeId/cart/@self/shipping_info', async (req, res) => {
  try {
    res.status(200).json({
      "orderItem": [
        {
          "orderItemId": "35003"
        }
      ],
      "orderId": "5246888777",
      "resourceName": "cart"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default shippingRouter;
