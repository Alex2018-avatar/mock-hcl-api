import { FsUtil } from "@utils/file/FsUtil";

class SpotService {
  static async getESpot(store: string, widget: string) {
    const fsPath = FsUtil.getFilePath(store, `spots/${widget}.json`);
    const data = await FsUtil.readAndParseJSON(fsPath);
    return data;
  }
}

export default SpotService;
