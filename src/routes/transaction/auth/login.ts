import express from "express";
import { addFolder } from "../../../middleware/auth.js";
import Auth from "@controllers/auth/auth.js";

const router = express.Router();

// /resources/store/9701/loginidentity?updateCookies=true
router.post("/:storeId/loginidentity", addFolder, Auth.loginIdentity);
router.post("/:storeId/b2b/loginidentity", addFolder, Auth.b2bLoginIdentity);
router.post("/:storeId/guestidentity", addFolder, Auth.guestidentity);
router.delete("/:storeId/loginidentity/@self", addFolder, Auth.logOut);
router.post(
  "/:storeId/syncRegister/registerCommerce",
  addFolder,
  Auth.syncRegister
);
router.get(
  "/:storeId/cart/check_navigation_role",
  addFolder,
  Auth.getNavigationRole
);

export default router;
