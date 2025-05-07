import { generateShippingInfo } from "../../helpers/shipping-info";
import { FileUtil } from "../../services/FileService";
import { generateWCSError } from "../../utils/error-utils";
import { delay } from "../../utils/product-utils";

export class ShippingController {
  static async saveB2BShippingInfo(req, res) {
    const { storeId } = req.params;
    res.status(200).json({ code: "SUCCESS" });
    // ERROR RESPONSES
    // res.status(400).json({
    //   "code": "SERVICE_EXCEPTION",
    //   "message": "<p class='bold'>Inténtalo más tarde</p><p>Algo salió mal al procesar tu solicitud.</p>"
    // });
  }

  static async getUsableShippingInfo(req, res) {
    const { storeId } = req.params;
    const validateOrder = req.query.validateOrder === "true";
    console.log("validateOrder: ", validateOrder);
    const _folder = req.storeIdentifier;
    const userAuth = req.session?.userAuth;
    const userId = userAuth?.userId;
    console.log("userId: ", userId);
    const errorCode = "_INF_TEXT";
    console.log("userId: ", userId);

    await delay(3000);

    if (validateOrder && userId === "1002") {
      res.status(400).json(generateWCSError("_ERR_ILLEGAL_ACCESS", "CMN6222E"));
      return;
    }

    // if (validateOrder) {
    //   // if()
    //   // return res.status(400).json(generateWCSError("_INF_TEXT", "CMN6222E"));
    //   // return res.status(400).json({
    //   //   errors: [
    //   //     {
    //   //       errorKey: "_INF_TEXT",
    //   //       errorParameters: [
    //   //         "<p>Superaste el monto m\u00e1ximo permitido en tu compra.</p><p>Revisa los productos que agregaste a tu carrito para reducir el monto total.</p>",
    //   //       ],
    //   //       errorMessage:
    //   //         "<p>Superaste el monto m\u00e1ximo permitido en tu compra.</p><p>Revisa los productos que agregaste a tu carrito para reducir el monto total.</p>",
    //   //       errorCode: "CFCV001",
    //   //     },
    //   //   ],
    //   // });

    //   return res.status(400).json({
    //     errors: [
    //       {
    //         errorKey: "_INF_TEXT",
    //         errorParameters: [
    //           "<p>Superaste el monto m\u00e1ximo permitido en tu compra.</p><p>Revisa los productos que agregaste a tu carrito para reducir el monto total.</p>",
    //         ],
    //         errorMessage:
    //           "<p>Superaste el monto m\u00e1ximo permitido en tu compra.</p><p>Revisa los productos que agregaste a tu carrito para reducir el monto total.</p>",
    //         errorCode: "ECN_403",
    //       },
    //     ],
    //   });
    // }
    const filePath = FileUtil.getFilePath(
      _folder,
      "cart/usable_shipping_info.json"
    );
    const data = await FileUtil.readAndParseJSON(filePath);

    const cart = req.session?.cart || null;
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
