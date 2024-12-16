import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getShippingModes = async (storeId) => {
  const filePath = path.resolve(__dirname, `../data/${storeId}-store/utils/usableShippingMode.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  return response;
};

export const getShippingById = async (storeId, shipModeId) => {
  const filePath = path.resolve(__dirname, `../data/${storeId}-store/utils/usableShippingMode.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  const shipping = response.find(ship => ship.shipModeId === shipModeId);
  return shipping;
};

export const getAddressById = async (storeId, addressId) => {
  const filePath = path.resolve(__dirname, `../data/${storeId}-store/utils/address-book.json`);
  const data = await fsPromises.readFile(filePath, 'utf8');
  const response = JSON.parse(data);
  const address = response.find(addr => addr.addressId === addressId);
  return address;
};