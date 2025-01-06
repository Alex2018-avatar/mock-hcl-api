const orderItemBase = {
  "personTitle": "",
  "country": "Colombia",
  "zipCode": "LIM032",
  "unitUom": "C62",
  "shippingChargeCurrency": "COP",
  "lastUpdateDate": "2024-10-24T12:59:17.712Z",
  "postalCode": "LIM032",
  "phone2": "",
  "language": "-5",
  "phone2Publish": "true",
  "phone1Publish": "true",
  "salesTax": "0",
  "addressId": "3074457362951363813",
  "phone1": "",
  "correlationGroup": "1830001",
  "email2": "",
  "usableShippingChargePolicy": [
    {
      "name": "StandardShippingChargeBySeller",
      "type": "ShippingCharge",
      "uniqueID": "-7001"
    }
  ],
  "email1": "demo@gmail.com",
  "fax2": "",
  "state": "LIMA",
  "fax1": "",
  "shippingCharge": "0",
  "orderItemPrice": "1798900",
  "shipModeLanguage": "-5",
  "unitPrice": "1798900",
  "shipModeCode": "ShippingDateAvailable",
  "productId": "3074457345616817100",
  "shipModeDescription": "Env\u00edo a domicilio en fecha disponible",
  "nickName": "demo@gmail.com",
  "fulfillmentCenterName": "Extended Sites Catalog Asset Store Home",
  "firstName": "Marco",
  "totalAdjustment": {
    "currency": "COP",
    "value": "0"
  },
  "orderItemInventoryStatus": "Available",
  "lastName": "Perez",
  "city": "LIMA",
  "expectedShipDate": "2024-10-24T12:59:21.039Z",
  "description": "Env\u00edo a domicilio en fecha disponible",
  "xitem_isPersonalAddressesAllowedForShipping": "true",
  "shippingTax": "0",
  "orderItemStatus": "P",
  "offerID": "4000000000000096362",
  "currency": "COP",
  "createDate": "2024-10-24T12:59:16.940Z",
  "salesTaxCurrency": "COP",
  "quantity": "1.0",
  "fulfillmentCenterId": "10001",
  "shipModeId": "22501",
  "xitem_memberId": "590003",
  "isExpedited": "false",
  "addressLine": ["", "", ""],
  "orderItemFulfillmentStatus": "Unreleased",
  "xitem_lastName": "Perez",
  "shippingTaxCurrency": "COP",
  "stateOrProvinceName": "LIMA",
  "UOM": "C62",
  "fulfillmentCenterOwnerId": "7000000000000001001",
  "freeGift": "false",
  "xitem_firstName": "Marco",
  "unitQuantity": "1.0",
  "contractId": "4000000000000000006",
  "middleName": "",
  "partNumber": "PO_Equ70055665",
  "orderItemId": "1000",
}

export const generateOrderItem = async (orderItem) => {
  const { partNumber, quantity } = orderItem;
  const url = `http://localhost:3000/search/resources/api/v2/products?storeId=9701&partNumber=${partNumber}`
  //const product = await fetch(url)
  //const productData = await product.json()
  //const data = productData.contents[0];
  //console.log('productData: ', productData);
  return {
    ...orderItemBase,
    partNumber,
    quantity,
  }
}

export const isDuplicatedOrderItem = (orderItems, orderItem) => {
  return orderItems.some(item => item.partNumber === orderItem.partNumber);
}

export function addItemToArray(array, newItem) {
  const nextId = array.length > 0
    ? (parseInt(array[array.length - 1].orderItemId) + 1).toString()
    : "1000";

  const itemWithId = { ...newItem, orderItemId: nextId };
  array.push(itemWithId);
  return array;
}
export function updateCartWithNewItem(cart, newOrderItem) {
  const orderItems = [...cart.orderItem];
  const existingItem = orderItems.filter(item => item.partNumber === newOrderItem.partNumber);
  const restItems = orderItems.filter(item => item.partNumber !== newOrderItem.partNumber);
  let newOrderItemId = 1000;

  const newItemAdd = addItemToArray(orderItems, newOrderItem);
  return { ...cart, orderItem: newItemAdd };
}