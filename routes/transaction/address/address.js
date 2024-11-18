import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const addressRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/9701/person/addressInfoByType/BLOQUE_O_INTERIOR
addressRouter.get('/:storeId/person/addressInfoByType/:addressType', async (req, res) => {
  try {
    const { storeId, addressType } = req.params;
    const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/address-info/${addressType}.json`);
    const data = await fsPromises.readFile(filePath, 'utf8');
    const response = JSON.parse(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({});
  }
});

// /wcs/resources/store/41/person/@self/contact?addressType=Billing
addressRouter.get('/:storeId/person/@self/contact', async (req, res) => {
  res.status(200).json({
    "resourceId": "https:\/\/commerce-preview.sbx0394.play.hclsofy.com:5443\/wcs\/resources\/store\/41\/person\/@self\/contact?addressType=Shipping",
    "contact": [
      {
        "lastName": "grillo",
        "zipCode": "12345",
        "country": "Peru",
        "city": "Lima",
        "addressType": "ShippingAndBilling",
        "nickName": "casa",
        "addressLine": [
          "mi casa ",
          "cerca del metro",
          ""
        ],
        "addressId": "3074457362951363813",
        "phone1": "87878878",
        "firstName": "pepe",
        "email1": "poxx2@gmail.com",
        "state": "Lima",
        "primary": "false"
      },
      {
        "lastName": "Grillo",
        "firstName": "Pepe",
        "email1": "poxx@gmail.com",
        "addressType": "ShippingAndBilling",
        "nickName": "poxx@gmail.com",
        "addressId": "3074457362950387085",
        "primary": "true"
      }
    ],
    "resourceName": "person",
    "userId": "17"
  });
});

// /wcs/resources/store/41/person/@self/checkoutProfile?langId=-1&responseFormat=json
addressRouter.get('/:storeId/person/@self/checkoutProfile', async (req, res) => {
  res.status(200).json({
    "resourceId": "https:\/\/commerce-preview.sbx0394.play.hclsofy.com:5443\/wcs\/resources\/store\/41\/person\/@self\/checkoutProfile?langId=-1&responseFormat=json",
    "resourceName": "person",
    "userId": "17"
  });
});

export default addressRouter;
