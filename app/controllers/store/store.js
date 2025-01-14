import { FileService } from "../../services/FileService.js";

export class StoreController {
  static async getAdminLookup(req, res) {
    const { storeIdentifier } = req.query;
    const filePath = FileService.getFilePath(storeIdentifier, 'adminLookup.json');
    const data = await FileService.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getOnlineStore(req, res) {
    const { _folder } = req
    const filePath = FileService.getFilePath(_folder, 'online_store.json');
    const data = await FileService.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getFeatures(req, res) {
    const { _folder } = req
    const filePath = FileService.getFilePath(_folder, 'features.json');
    const data = await FileService.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getSeoToken(req, res) {
    const folder = 'generic';
    const filePath = FileService.getFilePath(folder, 'seo-token.json');
    const data = await FileService.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getSeoUrlKeyword(req, res) {
    const folder = 'generic';
    const filePath = FileService.getFilePath(folder, 'seo-urlkeyword.json');
    const data = await FileService.readAndParseJSON(filePath);
    res.status(200).json(data);
  }
}