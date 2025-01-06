import { FileService } from './FileService.js';

export class UserService {
  static async getUser(_folder, logonId) {
    const filePath2 = FileService.getFilePath(_folder, 'users/users.json');
    const data = await FileService.readAndParseJSON(filePath2);
    const user = data.find(user => user.logonId === logonId);
    return user ?? {};
  }

  static async getUserById(_folder, userId) {
    const filePath2 = FileService.getFilePath(_folder, 'users/users.json');
    const data = await FileService.readAndParseJSON(filePath2);
    const user = data.find(user => user.userId === userId);
    return user ?? {};
  }

  static async getAddressBook(_folder) {
    const filePath2 = FileService.getFilePath(_folder, 'utils/address-book.json');
    const data = await FileService.readAndParseJSON(filePath2);
    return data;
  }
}