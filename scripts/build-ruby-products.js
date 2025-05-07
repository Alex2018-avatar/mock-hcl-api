import fs from 'node:fs';
import path from 'node:path';
import https from 'https';
import { fileURLToPath } from 'node:url';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORE = 'Ruby';
const STORE_ID = '41';
const CAT_ID = '10502';
const LANG_ID = '-1';
const BASE_URL = 'https://commerce-preview.sbx0199.play.hclsofy.com';
const pathname = `/search/resources/api/v2/products`;
const language = 'en_US';
const categoryIdentifier = 'furniture';

const saveProductMap = async (widgetName, data) => {
  const filePath = path.resolve(__dirname, `../src/config/products-map-${STORE}.ts`);
  try {
    // replace / of jsonName
    const mapedData = data.map(product => {
      product.jsonName = product.jsonName.replace('/', '');
      return product;
    });

    const newData = `
      export const productsMapData = ${JSON.stringify(mapedData, null, 2)};
    `
    await fsPromises.writeFile(filePath, newData);
    console.log(`[SAVED] product map ${widgetName}`);
    console.log(`************************************************************`);
  } catch (error) {
    console.error(`Error al guardar el widget ${widgetName}:`, error);
  }
}

const saveDetail = async (seo, data) => {
  const filePath = path.resolve(__dirname, `../src/data/${STORE}/search/products/detail/${seo}.json`);
  ///mock-hcl-api/src/data/Ruby/search/products/detail
  try {
    await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`[SAVED] product detail: ${seo}`);
    console.log(`************************************************************`);
  } catch (error) {
    console.error(`Error al guardar el widget ${seo}:`, error);
  }
}

const saveCategoryLayout = async (data) => {
  const filePath1 = path.resolve(__dirname, `../data/${STORE}-det-layout-template.json`);
  try {
    const { partNumber, jsonName, id } = data;
    // READ FILE
    const fileData = await fsPromises.readFile(filePath1, 'utf8');
    const layout = JSON.parse(fileData);
    const lay = layout.contents[0];
    const newLayout = {
      ...lay,
      identifier: jsonName.replace('/', ''),
      tokenExternalValue: partNumber,
      language: language,
      storeId: STORE_ID,
      tokenValue: id,
      "status": 1
    }

    console.log('layout: ', layout);
    const parsedLayout = {
      contents: [
        newLayout
      ]
    }

    const filePath = path.resolve(__dirname, `../src/data/${STORE}/layouts/${jsonName}.json`);
    await fsPromises.writeFile(filePath, JSON.stringify(parsedLayout, null, 2));
    console.log(`[SAVED] product layout: ${jsonName}`);
    console.log(`************************************************************`);
  } catch (error) {
    console.error(`Error al guardar el widget :`, error);
  }
}

const saveProductDetail = async (productMap) => {
  try {
    for (const product of productMap) {
      const query = `?storeId=${STORE_ID}&partNumber=${product.partNumber}&langId=${LANG_ID}`;
      const url = `${BASE_URL}${pathname}${query}`;
      // const response = await fetch(url, { agent: httpsAgent });
      // const data = await response.json();

      //await saveDetail(product.jsonName, data);
      await saveCategoryLayout(product);
    }
  } catch (error) {
    console.log('error: ', error);
  }
}



const fetchProductDetail = async () => {
  const filePath = path.resolve(__dirname, `../src/data/${STORE}/search/products/by-category/${CAT_ID}.json`);
  try {
    const data = await fsPromises.readFile(filePath, 'utf8');
    const response = JSON.parse(data);
    const { contents } = response;
    const productMap = contents.reduce((map, product) => {
      const item = {
        id: product.id,
        partNumber: product.partNumber,
        jsonName: product.seo.href,
      };
      map.push(item);
      return map;
    }, []);
    await saveProductMap(STORE, productMap);
    await saveProductDetail(productMap);
    //console.log(productMap);
  } catch (error) {
    console.error('Error al leer el archivo:', error);
  }
}

const fetchCategoryProducts = async () => {
  try {
    const query = `?storeId=${STORE_ID}&categoryId=${CAT_ID}&langId=${LANG_ID}`;
    const url = `${BASE_URL}${pathname}${query}`;
    const response = await fetch(url, { agent: httpsAgent });
    const data = await response.json();
    console.log('data: ', data.contents.length);
    // save 
    const filePath = path.resolve(__dirname, `../src/data/${STORE}/search/products/by-category/${CAT_ID}.json`);
    await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
    // await saveCategoryLayout(categoryIdentifier);
  } catch (error) {
    console.log('error: ', error);
  }
}
//fetchCategoryProducts();
fetchProductDetail();
