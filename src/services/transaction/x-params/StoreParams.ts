import { FsUtil } from "@utils/file/FsUtil";

class StoreParams {
  static async getStoreParameters(store: string) {
    const fsPath = FsUtil.getFilePath(store, `xparameters.json`);
    const data = await FsUtil.readAndParseJSON(fsPath);
    return data;
  }
}

export default StoreParams;
