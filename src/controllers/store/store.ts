import { Request, Response } from "express";
import { FileUtil } from "../../services/FileService";
import { logger } from "../../config/logger";
import { IRequest } from "../../types/store";

class StoreController {
  static async getAdminLookup(req: Request, res: Response) {
    const { storeIdentifier } = req.query;
    logger.debug("storeIdentifier getAdminLookup *****: " + storeIdentifier);
    const filePath = FileUtil.getFilePath(storeIdentifier, "adminLookup.json");
    const data = await FileUtil.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getOnlineStore(req: Request, res: Response) {
    const _folder = req.storeIdentifier;
    const filePath = FileUtil.getFilePath(_folder, "online_store.json");
    const data = await FileUtil.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getFeatures(req: Request, res: Response) {
    const _folder = req.storeIdentifier;
    const filePath = FileUtil.getFilePath(_folder, "features.json");
    const data = await FileUtil.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getSeoToken(req: Request, res: Response) {
    const folder = "generic";
    const urlKeywordName = req.query.urlKeywordName;
    const q = req.query.q;
    const queryString = req.originalUrl.split("?")[1];
    console.log(queryString);
    console.log("1: byLanguageIdAndTokenNameValue");
    if (urlKeywordName === "empresas" && q === "byUrlKeywordNames") {
      const filePath = FileUtil.getFilePath(
        "empresas",
        `store/seoToken/${queryString}.json`
      );
      const data = await FileUtil.readAndParseJSON(filePath);
      return res.status(200).json(data);
    }

    const filePath = FileUtil.getFilePath(folder, "seo-token.json");
    const data = await FileUtil.readAndParseJSON(filePath);
    res.status(200).json(data);
  }

  static async getSeoUrlKeyword(req: Request, res: Response) {
    const folder = "generic";
    const urlKeywordName = req.query.urlKeywordName;
    const tokenName = req.query.tokenName;
    const tokenValue = req.query.tokenValue;
    const q = req.query.q;
    console.log("1: byLanguageIdAndTokenNameValue");
    if (
      q === "byLanguageIdAndTokenNameValue" &&
      tokenName === "StoreToken:CatalogToken" &&
      tokenValue === "10100:"
    ) {
      res.status(200).json({
        resourceId:
          "https://commerce-preview.sbx0127.play.hclsofy.com:5443/wcs/resources/store/0/seo/urlkeyword?q=byLanguageIdAndTokenNameValue&tokenName=StoreToken:CatalogToken&tokenValue=10251&languageId=-5",
        // resourceName: 'urlkeyword',
        // resultList: [
        //   {
        //     urlKeywordName: 'empresas',
        //     languageId: -5,
        //     urlKeywordId: 63501,
        //     status: 1
        //   }
        // ]
        resourceName: "urlkeyword",
        resultList: [
          {
            desktopURLKeyword: "empresas",
            mobileURLKeyword: null,
            SEOURLKeywordId: 3074457345616676719,
          },
        ],
      });
      console.log("1: byLanguageIdAndTokenNameValue");
      return;
    }

    //if (q === 'byLanguageIdAndTokenNameValue' && tokenName === 'StoreToken:CatalogToken' && tokenValue === '10100' && urlKeywordName === 'empresas') {

    if (urlKeywordName === "ClaroB2C") {
      res.status(200).json({
        resourceId:
          "https://commerce-preview.sbx0127.play.hclsofy.com:5443/wcs/resources/store/0/seo/token?q=byUrlKeywordNames&urlKeywordName=rubyb2b",
        resourceName: "token",
        resultList: [
          {
            tokenName: "StoreToken:CatalogToken",
            urlKeywordName: "clarob2c",
            tokenValue: "42:",
            urlKeywordId: 63501,
            status: 1,
          },
        ],
      });
      return;
    }
    const filePath = FileUtil.getFilePath(folder, "seo-urlkeyword.json");
    const data = await FileUtil.readAndParseJSON(filePath);
    console.log("data: ", data);
    res.status(200).json(data);
  }

  static async getContract(req: Request, res: Response) {
    const { storeId } = req.params;
    if (storeId === "10251" || storeId === "10100") {
      res.status(200).json({
        contracts: {
          "4000000000000003006": "Default Contract for ClaroB2B",
        },
      });
    } else {
      res.status(200).json({ contracts: { "-11005": "-11005" } });
    }
  }
}

export default StoreController;
