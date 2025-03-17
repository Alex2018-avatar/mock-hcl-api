import { FileService } from "../../services/FileService.js";

export class StoreController {
  static async getAdminLookup(req, res) {
    const { storeIdentifier } = req.query;
    console.log('storeIdentifier getAdminLookup *****: ', storeIdentifier);
    const filePath = FileService.getFilePath(storeIdentifier, 'adminLookup.json');
    console.log('filePath: ', filePath);
    const data = await FileService.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getOnlineStore(req, res) {
    const { _folder } = req
    const filePath = FileService.getFilePath(_folder, 'online_store.json');
    const data = await FileService.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getFeatures(req, res) {
    const { _folder } = req
    const filePath = FileService.getFilePath(_folder, 'features.json');
    const data = await FileService.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getSeoToken(req, res) {
    const folder = 'generic';
    const filePath = FileService.getFilePath(folder, 'seo-token.json');
    const data = await FileService.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getSeoUrlKeyword(req, res) {
    const folder = 'generic';
    const urlKeywordName = req.query.urlKeywordName
    console.log('getSeoUrlKeyword() => urlKeywordName: ', urlKeywordName);
    if (urlKeywordName === 'empresas') {
      res.status(200).json({
        resourceId: 'https://commerce-preview.sbx0127.play.hclsofy.com:5443/wcs/resources/store/0/seo/token?q=byUrlKeywordNames&urlKeywordName=rubyb2b',
        resourceName: 'token',
        resultList: [
          {
            tokenName: 'StoreToken:CatalogToken',
            urlKeywordName: 'empresas',
            tokenValue: '10100:',
            urlKeywordId: 63501,
            status: 1
          }
        ]
      });
      return
    }

    if (urlKeywordName === 'ClaroB2C') {
      res.status(200).json({
        resourceId: 'https://commerce-preview.sbx0127.play.hclsofy.com:5443/wcs/resources/store/0/seo/token?q=byUrlKeywordNames&urlKeywordName=rubyb2b',
        resourceName: 'token',
        resultList: [
          {
            tokenName: 'StoreToken:CatalogToken',
            urlKeywordName: 'clarob2c',
            tokenValue: '42:',
            urlKeywordId: 63501,
            status: 1
          }
        ]
      });
      return
    }
    const filePath = FileService.getFilePath(folder, 'seo-urlkeyword.json');
    const data = await FileService.readAndParseJSON(filePath);
    console.log('data: ', data);
    res.status(200).json(data);
  }
}