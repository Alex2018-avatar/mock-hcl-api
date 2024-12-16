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
        "country": "Colombia",
        "city": "MEDELLIN",
        "addressType": "ShippingAndBilling",
        "nickName": "casa",
        "addressLine": [
          "mi casa ",
          "cerca del metro",
          "Barrio viejo"
        ],
        "addressId": "3074457362951363813",
        "phone1": "87878878",
        "firstName": "pepe",
        "email1": "poxx2@gmail.com",
        "primary": "false",
        "geographicalShippingCode": "carca del hotel cielo",
        "businessTitle": "Agrupacion|44",
        "internalOfficeAddress": "Apartamento|33",
        "state": "ANTIOQUIA",
      },
      {
        "lastName": "Grillo",
        "firstName": "Pepe",
        "email1": "poxx@gmail.com",
        "addressType": "ShippingAndBilling",
        "nickName": "poxx@gmail.com",
        "addressId": "3074457362950387085",
        "primary": "true",
        "addressLine": [
          "00|11|22",
          "Manzana",
          "Nombre del Barrio"
        ],
        "geographicalShippingCode": "carca del hotel cielo",
        "businessTitle": "Agrupacion|44",
        "internalOfficeAddress": "Apartamento|33",
        "state": "ANTIOQUIA",
        "city": "MEDELLÍN",
      },
      {
        "lastName": "Flores",
        "zipCode": "12345",
        "country": "Colombia",
        "city": "MEDELLÍN",
        "addressType": "ShippingAndBilling",
        "nickName": "mi casa",
        "addressLine": [
          "00|11|22",
          "Manzana",
          "Nombre del Barrio"
        ],
        "geographicalShippingCode": "carca del hotel cielo",
        "addressId": "3074457361090203510",
        "firstName": "Alex",
        "email1": "demo@gmail.com",
        "businessTitle": "Agrupacion|44",
        "internalOfficeAddress": "Apartamento|33",
        "state": "ANTIOQUIA",
        "primary": "false"
      },
      {
        "lastName": "Flores",
        "zipCode": "12345",
        "country": "Colombia",
        "city": "ALEJANDRIA",
        "addressType": "ShippingAndBilling",
        "nickName": "mi oficina",
        "addressLine": [
          "00|11|22",
          "Manzana",
          "Nombre del Barrio"
        ],
        "geographicalShippingCode": "carca del hotel cielo",
        "addressId": "3074457361088642674",
        "firstName": "Alex",
        "email1": "demo@gmail.com",
        "businessTitle": "Agrupacion|44",
        "internalOfficeAddress": "Apartamento|33",
        "state": "ANTIOQUIA",
        "primary": "false"
      },
      {
        "lastName": "Flores",
        "zipCode": "12345",
        "country": "Colombia",
        "city": "ALEJANDRIA",
        "addressType": "ShippingAndBilling",
        "nickName": "wqdsfsd",
        "addressLine": [
          "00|11|22",
          "Manzana",
          "Nombre del Barrio"
        ],
        "geographicalShippingCode": "carca del hotel cielo",
        "addressId": "3074457361088205870",
        "firstName": "Alex",
        "email1": "demo@gmail.com",
        "businessTitle": "Agrupacion|44",
        "internalOfficeAddress": "Apartamento|33",
        "state": "ANTIOQUIA",
        "primary": "false"
      },
      {
        "lastName": "Flores",
        "zipCode": "12345",
        "country": "Colombia",
        "city": "ALEJANDRIA",
        "addressType": "Billing",
        "nickName": "entrega factura",
        "addressLine": [
          "00|11|22",
          "Manzana",
          "Nombre del Barrio"
        ],
        "geographicalShippingCode": "carca del hotel cielo",
        "addressId": "3074457361088205520",
        "firstName": "Alex",
        "email1": "demo@gmail.com",
        "businessTitle": "Agrupacion|44",
        "internalOfficeAddress": "Apartamento|33",
        "state": "ANTIOQUIA",
        "primary": "false"
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

// /wcs/resources/store/9701/person/@self/contact/mi%20oficina
addressRouter.put('/:storeId/person/@self/contact/:nickName', async (req, res) => {
  res.status(200).json({ "resourceName": "person", "addressId": "3074457362978450855" });
});

// /wcs/resources/store/9701/person/@self/contact
addressRouter.post('/:storeId/person/@self/contact', async (req, res) => {
  // res.status(200).json({ "resourceName": "person", "addressId": "3074457362978450855" });
  res.status(400).json({
    "errors": [
      {
        "errorKey": "_ERR_NICKNAME_ALREDY_EXIST",
        "errorParameters": "empresa",
        "errorMessage": "El apodo que ha especificado ya existe. Escriba otro nombre en el campo Apodo e int\u00e9ntelo de nuevo.",
        "errorCode": "5040"
      }
    ]
  })
});

export default addressRouter;
