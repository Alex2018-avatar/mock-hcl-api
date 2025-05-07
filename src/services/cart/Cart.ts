import { getAddressById, getShippingById } from "@services/shipping";
import { FsUtil } from "@utils/file/FsUtil";

class CartService {
  static deleteOrderItem(req) {
    const { storeId } = req.params;
    const body = req.body;
    const orderItemIds = Object.entries(body)
      .filter(([key]) => /^orderItemId_\d+$/.test(key))
      .map(([_, value]) => value);

    const cart = req.session.carts[storeId];

    if (cart) {
      const updatedCart = cart.orderItem.filter(
        (item) => !orderItemIds.includes(item.orderItemId)
      );
      console.log(updatedCart);
      req.session.carts[storeId] = { ...cart, orderItem: updatedCart };
    }
    return { orderId: [body.orderId], resourceName: "cart" };
  }

  static async getAdjustSimulator(store: string) {
    const fsPath = FsUtil.getFilePath(store, `cart/adjust_simulator.json`);
    const data = await FsUtil.readAndParseJSON(fsPath);
    return data;
  }

  static async updateOrderItem(store: string, orderItem: any[], cart: any) {
    const sessionCartItems = cart.orderItem || [];
    const updatedIds = new Set();

    const updatedItems = orderItem.reduce((acc, elem) => {
      const { quantity, orderItemId } = elem;
      const itemIndex = cart.orderItem.findIndex(
        (i) => i.orderItemId === orderItemId
      );

      // push if quantity different of 0
      if (itemIndex !== -1 && quantity !== "0") {
        const item = { ...sessionCartItems[itemIndex], quantity };
        acc.push(item);
        updatedIds.add(orderItemId);
      } else if (itemIndex !== -1 && quantity === "0") {
        updatedIds.add(orderItemId);
      }

      return acc;
    }, []);

    const remainingItems = sessionCartItems.filter(
      (item) => !updatedIds.has(item.orderItemId)
    );

    const newItems = [...remainingItems, ...updatedItems];
    console.log("newItems: ", newItems.length);
    return { ...cart, orderItem: newItems };
  }

  static async updateShippingInfo(store: string, body: any, cart: any) {
    const { orderItem } = body;
    const orderItems = cart.orderItem ?? [];
    const updatedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const inputOrderItem = orderItem.find(
          (oi) => oi.orderItemId === item.orderItemId
        );
        const shipping = await getShippingById(
          store,
          inputOrderItem.shipModeId
        );
        const address = await getAddressById(store, inputOrderItem.addressId);
        let newItem = { ...item };
        if (inputOrderItem) {
          newItem = {
            ...item,
            shipModeId: inputOrderItem?.shipModeId,
            addressId: inputOrderItem?.addressId,
            carrier: shipping?.carrier,
            addressLine: address?.addressLine,
            city: address?.city,
            state: address?.state,
            firstName: address?.firstName,
            lastName: address?.lastName,
            nickName: address?.nickName,
            shippingTax: shipping?.shippingTax,
          };
        }
        return newItem;
      })
    );
    console.log(updatedOrderItems);
    return { ...cart, orderItem: updatedOrderItems };
  }
}
export default CartService;
