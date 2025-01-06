import { generateShippingInfo } from '../../helpers/shipping-info.js';
import { FileService } from '../../services/FileService.js';
import { generateWCSError } from '../../utils/error-utils.js';

export class ShippingController {

  static async saveB2BShippingInfo(req, res) {
    const { storeId } = req.params;
    res.status(200).json({ "code": "SUCCESS" });
    // ERROR RESPONSES
    // res.status(400).json({
    //   "code": "SERVICE_EXCEPTION",
    //   "message": "<p class='bold'>Inténtalo más tarde</p><p>Algo salió mal al procesar tu solicitud.</p>"
    // });
  }

  static async getUsableShippingInfo(req, res) {
    const { storeId } = req.params;
    const { validateOrder } = req.query;
    const { _folder, } = req;
    const userAuth = req.session?.userAuth;
    const userId = userAuth?.userId;

    if (validateOrder && userId === '1002') {
      res.status(400).json(generateWCSError("_ERR_ILLEGAL_ACCESS", "CMN6222E"));
      return
    }
    const filePath = FileService.getFilePath(_folder, 'cart/usable_shipping_info.json');
    const data = await FileService.readAndParseJSON(filePath);

    const cart = req.session?.carts?.[storeId] || null;
    if (cart) {
      const usableShippingInfo = await generateShippingInfo(data, cart, storeId)
      res.status(200).json(usableShippingInfo);
    } else {
      res.status(404).json({});
    }
  }
}