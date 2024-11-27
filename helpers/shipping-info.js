import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usableShippingChargePolicy = [
  {
    "name": "StandardShippingChargeBySeller",
    "type": "ShippingCharge",
    "uniqueID": "-7001"
  }
]
const usableShippingMode = [
  {
    "shipModeCode": "PickupInStore",
    "description": "Recoger en tienda",
    "shipModeId": "715837884",
    "language": "-5"
  },
  {
    "carrier": "Express",
    "shipModeCode": "Express",
    "description": "Expresó",
    "shipModeId": "715837934",
    "language": "-5"
  },
  {
    "carrier": "Mail",
    "shipModeCode": "Mail",
    "description": "Mail",
    "shipModeId": "715837984",
    "language": "-5"
  }
]

export const getAddressBook = async (storeId) => {
  const addressPath = path.resolve(__dirname, `../data/${storeId}-store/utils/address-book.json`);
  const addressBook = await fsPromises.readFile(addressPath, 'utf8');
  const addressBookData = JSON.parse(addressBook);
  return addressBookData;
}

export const generateShippingInfo = async (shippingInfo, cart, storeId) => {
  const addressBook = await getAddressBook(storeId);
  const usableShippingAddress = addressBook.map(address => {
    return {
      nickName: address.nickName,
      addressId: address.addressId,
    }
  })
  const orderItem = cart.orderItem.reduce((acc, item) => {
    let newItem = {
      usableShippingChargePolicy,
      orderItemId: item.orderItemId,
      usableShippingMode,
      usableShippingAddress,
    }
    acc.push(newItem)
    return acc
  }, [])

  return {
    usableShippingAddress,
    orderId: cart.orderId,
    orderItem
  }
}