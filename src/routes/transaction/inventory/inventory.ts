import express from "express";
import {
  getInventoryByIds,
  getInventoryByPartNumber,
} from "@controllers/transaction/inventory/inventory";
import { addFolder } from "@middleware/auth";

const router = express.Router();

// /wcs/resources/store/11/inventoryavailability/byPartNumber/DR-TBLS-0004-0001?langId=-1
router.get(
  "/:storeId/inventoryavailability/byPartNumber/:partNumber",
  addFolder,
  getInventoryByPartNumber
);

// /wcs/resources/store/11/inventoryavailability/200,1024?langId=-1&physicalStoreId=1003&onlineStoreId=10001&responseFormat=json
router.get(
  "/:storeId/inventoryavailability/:productIds",
  addFolder,
  getInventoryByIds
);

export default router;
