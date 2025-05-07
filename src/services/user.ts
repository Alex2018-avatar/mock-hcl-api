import { FileUtil } from "./FileService";

export class UserService {
  static async getUser(_folder, logonId) {
    const filePath2 = FileUtil.getFilePath(_folder, "users/users.json");
    const data = await FileUtil.readAndParseJSON(filePath2);
    const user = data.find((user) => user.logonId === logonId);
    return user ?? {};
  }

  static async getUserById(_folder, userId) {
    const filePath2 = FileUtil.getFilePath(_folder, "users/users.json");
    const data = await FileUtil.readAndParseJSON(filePath2);
    const user = data.find((user) => user.userId === userId);
    return user ?? {};
  }

  static async getAddressBook(_folder) {
    const filePath2 = FileUtil.getFilePath(_folder, "utils/address-book.json");
    const data = await FileUtil.readAndParseJSON(filePath2);
    return data;
  }
}
