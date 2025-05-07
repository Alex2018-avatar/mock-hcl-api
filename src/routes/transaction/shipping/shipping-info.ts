import { Router } from "express";
import { addFolder } from "@middleware/auth";
import Shipping from "@controllers/shipping/ShippingInfo";
import { asyncHandler } from "@utils/error/asyncHandler";

const router = Router();
const middls = [addFolder];

router.get(
  "/:storeId/address_info/:type",
  addFolder,
  asyncHandler(Shipping.getShippingInfoByType)
);
// /wcs/resources/store/9701/person/addressInfoByType/BLOQUE_O_INTERIOR
router.get(
  "/:storeId/person/addressInfoByType/:addressType",
  middls,
  Shipping.getAddressInfoByType
);
router.post(
  "/:storeId/cart/@self/b2b/shipping_info",
  addFolder,
  Shipping.saveB2BShippingInfo
);
router.get("/:storeId/xdata/:type", addFolder, Shipping.getDataCheckoutItem);
export default router;
