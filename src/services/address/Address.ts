import { FsUtil } from "@utils/file/FsUtil";
import { FileUtil } from "../FileService";

class AddressService {
  static async getAddressBook(store: string) {
    const fsPath = FsUtil.getFilePath(store, `address/address-book.json`);
    const response = await FsUtil.readAndParseJSON(fsPath);
    return response;
  }
}

export default AddressService;
