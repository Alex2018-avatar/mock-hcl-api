import { generateShippingInfo } from "../../helpers/shipping-info";
import { FileUtil } from "../../services/FileService";
import { generateWCSError } from "../../utils/error-utils";
import { delay } from "../../utils/product-utils";

export class HistoryController {
  static async getOrderHistory(req, res) {
    const { storeId } = req.params;
    const { _folder } = req;
    const filePath = FileUtil.getFilePath(
      _folder,
      `order/order-guest-${storeId}.json`
    );
    const data = await FileUtil.readAndParseJSON(filePath);
    res.status(200).json(data);
  }
  static async getUsableShippingInfo(req, res) {
    const { storeId } = req.params;
    const { validateOrder } = req.query;
    const { _folder } = req;
    const userAuth = req.session?.userAuth;
    const userId = userAuth?.userId;

    await delay(3000);

    if (validateOrder && userId === "1002") {
      res.status(400).json(generateWCSError("_ERR_ILLEGAL_ACCESS", "CMN6222E"));
      return;
    }
    const filePath = FileUtil.getFilePath(
      _folder,
      "cart/usable_shipping_info.json"
    );
    const data = await FileUtil.readAndParseJSON(filePath);

    const cart = req.session?.carts?.[storeId] || null;
    if (cart) {
      const usableShippingInfo = await generateShippingInfo(
        data,
        cart,
        storeId
      );
      res.status(200).json(usableShippingInfo);
    } else {
      res.status(404).json({});
    }
  }
}
