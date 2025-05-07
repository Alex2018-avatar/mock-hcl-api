import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { logger } from "../../config/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromises = fs.promises;

export class CustomClaroController {
  static async getClaroCupoHandler(req, res) {
    const _folder = req.storeIdentifier;
    const { cupo } = req.params;
    const filePath = path.resolve(
      __dirname,
      `../../data/${_folder}/custom/ClaroCupoHandler-F.json`
    );
    const errorFilePath = path.resolve(
      __dirname,
      `../../data/${_folder}/custom/ClaroCupoHandler-error.json`
    );

    // read file
    try {
      const data = await fs.promises.readFile(filePath, "utf8");
      const response = JSON.parse(data);
      setTimeout(() => {
        res.status(200).json(response);
      }, 5000);
    } catch (error) {
      logger.error(error.message);
      res.status(404).json({ contents: [] });
    }
  }

  static async getClaroReserveAndFinancialHandler(req, res) {
    const _folder = req.storeIdentifier;
    const filePath = path.resolve(
      __dirname,
      `../../data/${_folder}/custom/ClaroReserveAndFinancialHandler.json`
    );
    const errorFilePath = path.resolve(
      __dirname,
      `../../data/${_folder}/custom/ClaroReserveAndFinancialHandler-error.json`
    );

    // read file
    try {
      const data = await fsPromises.readFile(filePath, "utf8");
      const response = JSON.parse(data);
      res.status(200).json(response);
    } catch (error) {
      logger.error(error.message);
      res.status(404).json({ contents: [] });
    }
  }

  static async getClaroFinancialTermHandler(req, res) {
    const _folder = req.storeIdentifier;
    const { cupo } = req.params;
    const { cuotas } = req.body;
    const filePath = path.resolve(
      __dirname,
      `../../data/${_folder}/custom/ClaroFinancialTermHandler-${cuotas}.json`
    );

    // read file
    try {
      const data = await fsPromises.readFile(filePath, "utf8");
      const response = JSON.parse(data);
      res.status(200).json(response);
    } catch (error) {
      logger.error(error.message);
      res.status(404).json({ contents: [] });
    }
  }

  static async getClaroValidateHomeAddressHandler(req, res) {
    const _folder = req.storeIdentifier;
    const filePath = path.resolve(
      __dirname,
      `../../data/${_folder}/custom/ClaroValidateHomeAddressHandler.json`
    );

    // read file
    try {
      const data = await fsPromises.readFile(filePath, "utf8");
      const response = JSON.parse(data);
      res.status(200).json(response);
    } catch (error) {
      logger.error(error.message);
      res.status(404).json({ contents: [] });
    }
  }

  static async getB2BGatewayUrlHandler(req, res) {
    const _folder = req.storeIdentifier;
    const filePath = path.resolve(
      __dirname,
      `../../data/${_folder}/custom/B2BGatewayUrlHandler.json`
    );

    // read file
    try {
      // throw new Error('Not implemented');
      const data = await fsPromises.readFile(filePath, "utf8");
      const response = JSON.parse(data);
      res.status(200).json(response);
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({
        errors: [
          {
            errorKey: "_ERR_GENERIC",
            errorParameters:
              "com.ibm.commerce.edp.api.CommunicationException: El parÃ¡metro requerido no ha sido proporcionado.",
            errorMessage:
              'El error siguiente se ha producido durante el proceso: "com.ibm.commerce.edp.api.CommunicationException: El parÃ¡metro requerido no ha sido proporcionado.".',
            errorCode: "CMN0409E",
          },
        ],
      });
    }
  }
}
