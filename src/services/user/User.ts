import AddressService from "@services/address/Address";
import { encrypt } from "@utils/crypto-utils";
import { FsUtil } from "@utils/file/FsUtil";

type UserContextData = {
  isLogged: boolean;
  store: string;
};
type UserParams = {
  folder: string;
  userId: string | number;
  logged: boolean | undefined;
};
const withEncryption = () => process.env.ENABLE_ENCRYPTION === "true";

class UserService {
  static async getGuestUser(folder: string) {
    const fsPath = FsUtil.getFilePath(folder, `users/guest-user.json`);
    const data = await FsUtil.readAndParseJSON(fsPath);
    return data;
  }

  static async getUserContextData(params: UserContextData) {
    const { isLogged, store } = params;
    const baseFileName: string = "contextdata";
    const fileName = isLogged ? baseFileName : `${baseFileName}-guest`;
    const fsPath = FsUtil.getFilePath(store, `users/${fileName}.json`);
    const data = await FsUtil.readAndParseJSON(fsPath);
    return data;
  }

  static async getUserById(_folder: string, userId: string) {
    const name = withEncryption() ? "users-crypted" : "users";
    const filePath2 = FsUtil.getFilePath(_folder, `users/${name}.json`);
    const data = await FsUtil.readAndParseJSON(filePath2);
    const user = data.find((user) => user.userId === userId);
    return user ?? {};
  }

  static async getUser(params: UserParams) {
    const { folder, userId, logged } = params;
    const user = await UserService.getUserById(folder, userId);
    const contact = await AddressService.getAddressBook(folder);
    console.log("ENABLE_ENCRYPTION: ", process.env.KEY_CRYPTO);
    if (process.env.ENABLE_ENCRYPTION === "true") {
      console.log("ENABLE_ENCRYPTION: ", await encrypt("1111111111"));
    }
    if (!logged) {
      // levar al controller de usarse
      // if (xProcessFlow === "b2bShipping") {
      //   const selfcareUserInfo = await UserHelper.getSelfCareUserInfo("full");
      //   return res.status(200).json(selfcareUserInfo);
      // }

      const data = await this.getGuestUser(folder);
      return data;
    }

    return user ? { ...user, contact } : {};
  }
}

export default UserService;
