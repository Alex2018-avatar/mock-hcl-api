import { FileUtil } from "./FileService";

export class PaymentService {
  static async getTokenizedCards(_folder = "ClaroB2C") {
    const filePath = FileUtil.getFilePath(
      _folder,
      "payment/tokenized-cards.json"
    );
    return await FileUtil.readAndParseJSON(filePath);
  }
}
