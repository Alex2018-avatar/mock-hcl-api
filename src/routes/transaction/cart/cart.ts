import { Router } from "express";
import { ShippingController } from "../../../controllers/cart/Shipping.js";
import { addFolder } from "@middleware/auth.js";
import {
  addToCart,
  deleteCart,
  getCart,
  getCartAdjustSimulator,
  updateOrderItem,
  updateShippingInfo,
} from "@controllers/cart/cart.js";

const router = Router();

// cartRouter.get('/:storeId/cart/@self/b2b/shipping_info', ShippingController.saveB2BShippingInfo)
// /wcs/resources/store/10251/cart/@self?langId=-5&sortOrder=desc
router.get("/:storeId/cart/@self", addFolder, getCart);

// /wcs/resources/store/10251/cart
router.post("/:storeId/cart", addFolder, addToCart);

// /wcs/resources/store/10251/cart
router.delete("/:storeId/cart/@self", addFolder, deleteCart);

// /wcs/resources/store/10251/cart
router.put(
  "/:storeId/cart/@self/update_order_item",
  addFolder,
  updateOrderItem
);

// /wcs/resources/store/9701/cart/@self/usable_shipping_info?langId=-5
// router.get("/:storeId/cart/@self/usable_shipping_info", addFolder, ShippingController.getUsableShippingInfo);

// /wcs/resources/store/9701/cart/@self/payment_instruction?langId=-5
// router.get("/:storeId/cart/@self/usable_payment_info", addFolder, CartController.getUsablePaymentInfo);

// /wcs/resources/store/9701/cart/@self/payment_instruction?langId=-5
// router.delete("/:storeId/cart/@self/payment_instruction", addFolder, CartController.deletePaymentInstruction);

// /wcs/resources/store/9701

// /wcs/resources/store/9701/cart/@self/simulator
router.get("/:storeId/cart/@self/simulator", addFolder, getCartAdjustSimulator);
router.put("/:storeId/cart/@self/shipping_info", addFolder, updateShippingInfo);

export default router;
