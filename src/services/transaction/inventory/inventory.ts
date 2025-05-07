import { FsUtil } from "@utils/file/FsUtil";
import { Inventory } from "types/inventory";

class InventoryService {
  static async getInventoryByPartNumber(store: string, partNumber: string) {
    const fsPath = FsUtil.getFilePath(store, `inventory/inventory.json`);
    const json = await FsUtil.readAndParseJSON(fsPath);
    const partNumberList = partNumber
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    const data = json.filter((item: Inventory) =>
      partNumberList.includes(item.partNumber.trim())
    );
    return {
      InventoryAvailability: data,
      resourceId: `https://localhost:443/wcs/resources/store/41/inventoryavailability/byPartNumber/${partNumber}`,
      resourceName: "inventoryavailability",
    };
  }

  static async getInventoryByIds(store: string, idsParam: string) {
    const fsPath = FsUtil.getFilePath(store, `inventory/inventory.json`);
    const json = await FsUtil.readAndParseJSON(fsPath);
    const ids = idsParam
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    const data = json.filter((item: Inventory) => ids.includes(item.productId));

    return {
      InventoryAvailability: data,
      resourceId: `https://localhost:443/wcs/resources/store/41/inventoryavailability/byPartNumber/${idsParam}`,
      resourceName: "inventoryavailability",
    };
  }
}

export default InventoryService;
