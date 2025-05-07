import { FsUtil } from "@utils/file/FsUtil";
import {
  addItemToArray,
  generateOrderItem,
  updateCartWithNewItem,
} from "helpers/order-item-generator";

class CartService {
  static async addToCart(store: string, body, cartSession) {
    const { orderItem } = body;
    const fsPath = FsUtil.getFilePath(store, "cart/cart-base.json");
    const data = await FsUtil.readAndParseJSON(fsPath);
    // generate order item
    const generatedOrderItem = await generateOrderItem(orderItem[0], store);

    if (cartSession && cartSession.orderId) {
      const updatedCart = updateCartWithNewItem(
        cartSession,
        generatedOrderItem
      );
      return updatedCart;
    } else {
      const generatedItem = addItemToArray(data.orderItem, generatedOrderItem);
      return {
        ...data,
        orderItem: generatedItem,
      };
    }
  }
}

export default CartService;
