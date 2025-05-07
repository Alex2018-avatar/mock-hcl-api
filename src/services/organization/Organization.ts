import { FsUtil } from "@utils/file/FsUtil";

class OrganizationService {
  static async getEntitledOrgs(store: string) {
    const fsPath = FsUtil.getFilePath(store, `organization/entitled_orgs.json`);
    const data = await FsUtil.readAndParseJSON(fsPath);
    return data;
  }

  static async getOrganizationById(store: string, id: string) {
    const fsPath = FsUtil.getFilePath(store, `organization/${id}.json`);
    const data = await FsUtil.readAndParseJSON(fsPath);
    return data;
  }
}

export default OrganizationService;
