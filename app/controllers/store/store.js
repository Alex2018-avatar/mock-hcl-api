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
    const urlKeywordName = req.query.urlKeywordName
    const tokenName = req.query.tokenName
    const tokenValue = req.query.tokenValue
    const q = req.query.q;
    const queryString = req.originalUrl.split('?')[1];
    console.log(queryString)
    console.log('1: byLanguageIdAndTokenNameValue')
    if (urlKeywordName === 'empresas' && q === 'byUrlKeywordNames') {
      const filePath = FileService.getFilePath('empresas', `store/seoToken/${queryString}.json`);
      const data = await FileService.readAndParseJSON(filePath);
      return res.status(200).json(data);
    }

    const filePath = FileService.getFilePath(folder, 'seo-token.json');
    const data = await FileService.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getSeoUrlKeyword(req, res) {
    const folder = 'generic';
    const urlKeywordName = req.query.urlKeywordName
    const tokenName = req.query.tokenName
    const tokenValue = req.query.tokenValue
    const q = req.query.q;
    console.log('1: byLanguageIdAndTokenNameValue')
    if (q === 'byLanguageIdAndTokenNameValue'
      && tokenName === 'StoreToken:CatalogToken'
      && tokenValue === '10100:') {
      res.status(200).json({
        resourceId: 'https://commerce-preview.sbx0127.play.hclsofy.com:5443/wcs/resources/store/0/seo/urlkeyword?q=byLanguageIdAndTokenNameValue&tokenName=StoreToken:CatalogToken&tokenValue=10251&languageId=-5',
        // resourceName: 'urlkeyword',
        // resultList: [
        //   {
        //     urlKeywordName: 'empresas',
        //     languageId: -5,
        //     urlKeywordId: 63501,
        //     status: 1
        //   }
        // ]
        "resourceName": "urlkeyword",
        "resultList": [
          {
            "desktopURLKeyword": "empresas",
            "mobileURLKeyword": null,
            "SEOURLKeywordId": 3074457345616676719
          }
        ]
      });
      console.log('1: byLanguageIdAndTokenNameValue')
      return
    }

    //if (q === 'byLanguageIdAndTokenNameValue' && tokenName === 'StoreToken:CatalogToken' && tokenValue === '10100' && urlKeywordName === 'empresas') {

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