import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { FsUtil } from "@utils/file/FsUtil";

const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getShippingModes = async (store: string) => {
  // const filePath = path.resolve(__dirname, `../data/${storeId}-store/utils/usableShippingMode.json`);
  // const data = await fsPromises.readFile(filePath, 'utf8');
  const fsPath = FsUtil.getFilePath(store, `utils/usableShippingMode.json`);
  const data = await FsUtil.readAndParseJSON(fsPath);
  // const response = JSON.parse(data);
  return data;
};

export const getShippingById = async (store: string, shipModeId: string) => {
  // const filePath = path.resolve(
  //   __dirname,
  //   `../data/${storeId}-store/utils/usableShippingMode.json`
  // );
  const fsPath = FsUtil.getFilePath(store, `utils/usableShippingMode.json`);
  const data = await FsUtil.readAndParseJSON(fsPath);
  // const data = await fsPromises.readFile(filePath, "utf8");
  // const response = JSON.parse(data);
  const shipping = data.find((ship) => ship.shipModeId === shipModeId);
  return shipping;
};

export const getAddressById = async (store: string, addressId: string) => {
  // const filePath = path.resolve(
  //   __dirname,
  //   `../data/${storeId}-store/utils/address-book.json`
  // );
  // const data = await fsPromises.readFile(filePath, "utf8");
  // const response = JSON.parse(data);
  const fsPath = FsUtil.getFilePath(store, `utils/address-book.json`);
  const data = await FsUtil.readAndParseJSON(fsPath);
  const address = data.find((addr) => addr.addressId === addressId);
  return address;
};

export const getAddressBook = async (store: string) => {
  // const filePath = path.resolve(
  //   __dirname,
  //   `../data/${storeId}-store/utils/address-book.json`
  // );
  // const data = await fsPromises.readFile(filePath, "utf8");
  const fsPath = FsUtil.getFilePath(store, `utils/address-book.json`);
  const data = await FsUtil.readAndParseJSON(fsPath);
  // const response = JSON.parse(data);
  return data;
};
