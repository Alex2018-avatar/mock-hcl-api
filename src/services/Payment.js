import { FileService } from './FileService.js';

export class PaymentService {
  static async getTokenizedCards(_folder = 'ClaroB2C') {
    const filePath = FileService.getFilePath(_folder, 'payment/tokenized-cards.json');
    return await FileService.readAndParseJSON(filePath);
  }
}