import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { logger } from "../../config/logger.js";
import { FileUtil } from "../../services/FileService";
import ShippingInfo from "@services/shipping/ShippingInfo.js";
import { Request, Response } from "express";
import { asyncHandler } from "@utils/error/asyncHandler.js";

class ShippingInfoController {
  static async getShippingInfoByType(req: Request, res: Response) {
    const { type } = req.params;
    const _folder = req.storeIdentifier as string;
    const data = await ShippingInfo.getShippingInfoByType(_folder, type);
    res.status(200).json(data);
  }

  static async getAddressInfoByType(req: Request, res: Response) {
    const { addressType } = req.params;
    const _folder = req.storeIdentifier as string;
    const data = await ShippingInfo.getAddressInfoByType(_folder, addressType);
    res.status(200).json(data);
  }
  // static async getShippingInfoByTypex(req, res) {
  //   const _folder = req.storeIdentifier;
  //   const { type } = req.params;
  //   const filePath = path.resolve(
  //     __dirname,
  //     `../../data/${_folder}/address/${type}.json`
  //   );

  //   // read file
  //   try {
  //     const data = await fsPromises.readFile(filePath, "utf8");
  //     const response = JSON.parse(data);
  //     res.status(200).json(response);
  //   } catch (error) {
  //     logger.error(error.message);
  //     res.status(404).json({ contents: [] });
  //   }
  // }

  // static async getAddressInfoByTypex(req, res) {
  //   const { addressType } = req.params;
  //   const _folder = req.storeIdentifier;
  //   try {
  //     const filePath = FileUtil.getFilePath(
  //       _folder,
  //       `address-info/${addressType}.json`
  //     );
  //     const response = await FileUtil.readAndParseJSON(filePath);
  //     res.status(200).json(response);
  //   } catch (error) {
  //     res.status(400).json({});
  //   }
  // }

  static async saveB2BShippingInfo(req, res) {
    const { storeId } = req.params;
    res.status(200).json({ code: "SUCCESS" });
    // ERROR RESPONSES
    // res.status(400).json({
    //   "code": "SERVICE_EXCEPTION",
    //   "message": "<p class='bold'>Inténtalo más tarde</p><p>Algo salió mal al procesar tu solicitud.</p>"
    // });
  }

  static async getDataCheckoutItem(req, res) {
    const { storeId } = req.params;
    const { type } = req.params;
    const _folder = req.storeIdentifier;
    try {
      const filePath = FileUtil.getFilePath(
        _folder,
        "address/address-info/xdata-checkout.json"
      );
      const response = await FileUtil.readAndParseJSON(filePath);
      res.status(200).json(response);
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({});
    }
  }
}

export default ShippingInfoController;
