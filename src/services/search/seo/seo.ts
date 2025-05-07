import { FsUtil } from "@utils/file/FsUtil";

class SeoService {
  static async getSeoIdentifier(store: string, identifier: string) {
    const fsPath = FsUtil.getFilePath(store, `layouts/${identifier}.json`);
    const data = await FsUtil.readAndParseJSON(fsPath);

    if (!data) return { contents: [] };
    return data;
  }
}

export default SeoService;
