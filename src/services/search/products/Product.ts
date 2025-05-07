import { productsMapData as productsMapDataRuby } from "@config/products-map-Ruby";
import { productsMapData as productsMapDataEmpresas } from "@config/products-map-empresas";
import { FsUtil } from "@utils/file/FsUtil";

class ProductService {
  static getProductMapData(store: string) {
    if (store === "empresas") {
      return productsMapDataEmpresas;
    } else {
      return productsMapDataRuby;
    }
  }
  static async getProductsByCategoryId(store: string, categoryId: string) {
    const pathname = `products/by-category/${categoryId}.json`;
    const fsPath = FsUtil.getSearchPath(store, pathname);
    const data = await FsUtil.readAndParseJSON(fsPath);
    return data;
  }

  static async getProductByIdOrPartNumber(
    store: string,
    partNumber: string,
    id: string
  ) {
    const productsMapData = ProductService.getProductMapData(store);
    let product = null;
    if (partNumber && partNumber.length > 0) {
      product = productsMapData.find(
        (product) => product.partNumber === partNumber
      );
    }

    if (id && id.length > 0) {
      product = productsMapData.find((product) => product.id === id);
    }

    if (!product) return [];
    const pathname = `products/detail/${product.jsonName}.json`;
    const fsPath = FsUtil.getSearchPath(store, pathname);
    const data = await FsUtil.readAndParseJSON(fsPath);
    return data;
  }
}

export default ProductService;
