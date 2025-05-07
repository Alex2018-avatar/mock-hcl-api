import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { addFolder } from "../../../middleware/auth.js";
import { getAddressBook } from "../../../services/shipping.js";
import Address from "@controllers/address/Address.js";

const router = express.Router();
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/41/person/@self/contact?addressType=Billing
router.get("/:storeId/person/@self/contacts", addFolder, async (req, res) => {
  const _folder = req.storeIdentifier;
  console.log("_folder: ", _folder);
  const addressBook = await getAddressBook(req.params.storeId);
  console.log("addressBook: ", addressBook);
  res.status(200).json({
    resourceId:
      "https://commerce-preview.sbx0394.play.hclsofy.com:5443/wcs/resources/store/41/person/@self/contact?addressType=Shipping",
    contact: addressBook,
    resourceName: "person",
    userId: "17",
  });
});
router.get("/:storeId/person/@self/contact", addFolder, Address.getAddressBook);
// /wcs/resources/store/41/person/@self/checkoutProfile?langId=-1&responseFormat=json
router.get("/:storeId/person/@self/checkoutProfile", async (req, res) => {
  res.status(200).json({
    resourceId:
      "https://commerce-preview.sbx0394.play.hclsofy.com:5443/wcs/resources/store/41/person/@self/checkoutProfile?langId=-1&responseFormat=json",
    resourceName: "person",
    userId: "17",
  });
});

// /wcs/resources/store/9701/person/@self/contact/mi%20oficina
router.put("/:storeId/person/@self/contact/:nickName", async (req, res) => {
  res
    .status(200)
    .json({ resourceName: "person", addressId: "3074457362978450855" });
});

// /wcs/resources/store/9701/person/@self/contact
router.post("/:storeId/person/@self/contact", async (req, res) => {
  res
    .status(200)
    .json({ resourceName: "person", addressId: "3074457362978450855" });
  // res.status(400).json({
  // 	"errors": [
  // 		{
  // 			"errorKey": "_ERR_NICKNAME_ALREDY_EXIST",
  // 			"errorParameters": "empresa",
  // 			"errorMessage": "El apodo que ha especificado ya existe. Escriba otro nombre en el campo Apodo e int\u00e9ntelo de nuevo.",
  // 			"errorCode": "5040"
  // 		}
  // 	]
  // })
});

export default router;
