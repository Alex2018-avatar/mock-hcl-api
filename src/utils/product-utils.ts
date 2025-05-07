import { productsMapData } from "../../config/products-map";

export const productsMap = productsMapData.reduce((map, product) => {
  map[product.id] = product;
  map[product.partNumber] = product;
  return map;
}, {});

export const getProductByIdOrPartNumber = (query) => {
  return productsMap[query] || null;
};
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
