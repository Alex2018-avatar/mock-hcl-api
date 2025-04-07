import { generateShippingInfo } from '../../helpers/shipping-info.js';
import { FileService } from '../../services/FileService.js';
import { generateWCSError } from '../../utils/error-utils.js';
import { delay } from '../../utils/product-utils.js';

export class CartController {
  static async deleteOrderItem(req, res) {
    const body = req.body;
    res.status(200).json({
      "orderId": [
        body.orderId
      ],
      "resourceName": "cart"
    });
  }
}