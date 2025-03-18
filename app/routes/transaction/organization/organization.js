import express from 'express';
import { identifyUserType } from '../../../middleware/auth.js';
// import countriesJSON from '../../../data/country_state.json' assert { type: "json" };
// import onlineStoreJSON from '../../../data/online_store.json' assert { type: "json" };
import { addFolder } from '../../../middleware/auth.js';
import { logger } from '../../../config/logger.js';
const app = express();
const organizationRouter = app.router;

// /wcs/resources/store/11/organization/@self/entitled_orgs?langId=-1
organizationRouter.get('/:storeId/organization/@self/entitled_orgs', addFolder, (req, res) => {
  const { _folder } = req
  console.log('_folder organization: ', _folder);
  res.status(200).json({
    "entitledOrganizations": [
      {
        "distinguishedName": "ClaroB2B",
        "organizationId": -2000,
        "displayName": "Claro B2B",
        "memberId": 0,
        "organizationName": "ClaroB2B"
      }
    ],
    "accountCheck": true
  });
})

// /wcs/resources/store/11/usercontext/@self/contextdata?langId=-1
organizationRouter.get('/:storeId/usercontext/@self/contextdata', addFolder, identifyUserType, (req, res) => {
  const isLogged = req.logged;
  const { cookie } = req.headers;
  const _folder = req._folder;
  logger.info(`[CONTEXTDATA] isLogged:  ${isLogged}`);
  logger.info(`[CONTEXTDATA] _folder:  ${_folder}`);
  if (_folder === 'empresas') {
    if (isLogged) {
      res.status(200).json({
        "audit": {
          "personalizationId": "1728508623057-1"
        },
        "catalog": {
          "catalogId": 10001,
          "masterCatalog": false
        },
        "globalization": {
          "preferredCurrency": "COP",
          "languageId": -5,
          "currency": "COP",
          "preferredLanguageId": -5
        },
        "bcsversion": {
          "lastUpdateTime": "1729277978218"
        },
        "resourceName": "usercontext",
        "entitlement": {
          "eligibleTradingAgreementIds": [
            4000000000000000003
          ],
          "hostingContractId": 4000000000000000002,
          "currentTradingAgreementIds": [
            4000000000000000003
          ],
          "activeOrganizationId": -2000,
          "sessionTradingAgreementIds": null
        },
        "activityToken": {
          "activityId": 310170
        },
        "isPartiallyAuthenticated": false,
        "basicInfo": {
          "runAsId": 1002,
          "callerId": 1002,
          "registerType": "R",
          "storeId": 10100,
          "channelId": -1
        }
      });
    } else {
      res.status(200).json({
        "globalization": {
          "preferredCurrency": "COP",
          "languageId": -5,
          "currency": "COP",
          "preferredLanguageId": -5
        },
        "catalog": {
          "catalogId": 10050,
          "masterCatalog": false
        },
        "bcsversion": {
          "lastUpdateTime": null
        },
        "resourceName": "usercontext",
        "entitlement": {
          "eligibleTradingAgreementIds": [4e+18],
          "hostingContractId": 4e+18,
          "currentTradingAgreementIds": [4e+18],
          "activeOrganizationId": -2000,
          "sessionTradingAgreementIds": null
        },
        "isPartiallyAuthenticated": false,
        "basicInfo": {
          "runAsId": -1002,
          "callerId": -1002,
          "registerType": "G",
          "storeId": 10151,
          "channelId": -4
        }
      })
    }

    return
  } else {

    if (!isLogged) {
      res.status(200).json({
        "globalization": {
          "preferredCurrency": "COP",
          "languageId": -5,
          "currency": "COP",
          "preferredLanguageId": -5
        },
        "catalog": {
          "catalogId": 11501,
          "masterCatalog": false
        },
        "bcsversion": {
          "lastUpdateTime": null
        },
        "resourceName": "usercontext",
        "entitlement": {
          "eligibleTradingAgreementIds": [
            -11005
          ],
          "hostingContractId": -11004,
          "currentTradingAgreementIds": [
            -11005
          ],
          "activeOrganizationId": -2000,
          "sessionTradingAgreementIds": null
        },
        "isPartiallyAuthenticated": false,
        "basicInfo": {
          "runAsId": 38,
          "callerId": 38,
          "registerType": "G",
          "storeId": 9701,
          "channelId": -1
        }
      });
    } else {
      res.status(200).json({
        "audit": {
          "personalizationId": "1728508623057-1"
        },
        "catalog": {
          "catalogId": 10001,
          "masterCatalog": false
        },
        "globalization": {
          "preferredCurrency": "COP",
          "languageId": -5,
          "currency": "COP",
          "preferredLanguageId": -5
        },
        "bcsversion": {
          "lastUpdateTime": "1729277978218"
        },
        "resourceName": "usercontext",
        "entitlement": {
          "eligibleTradingAgreementIds": [
            4000000000000000003
          ],
          "hostingContractId": 4000000000000000002,
          "currentTradingAgreementIds": [
            4000000000000000003
          ],
          "activeOrganizationId": -2000,
          "sessionTradingAgreementIds": null
        },
        "activityToken": {
          "activityId": 310170
        },
        "isPartiallyAuthenticated": false,
        "basicInfo": {
          "runAsId": 1002,
          "callerId": 1002,
          "registerType": "R",
          "storeId": 9701,
          "channelId": -1
        }
      });
    }
  }
})

// https://commerce-preview.sbx0394.play.hclsofy.com/api/resources/store/41/organization/-
organizationRouter.get('/:storeId/organization/:id', (req, res) => {
  res.status(200).json({
    "organizationId": "-2000",
    "contactInfo": {
      "country": "",
      "lastName": "",
      "zipCode": "",
      "address3": "",
      "mobilePhone1": "",
      "organizationName": "",
      "address2": "",
      "city": "",
      "address1": "",
      "addressType": "",
      "nickName": "Default Organization",
      "phone2": "",
      "addressId": "-2000",
      "phone1": "",
      "email2": "",
      "firstName": "",
      "email1": "",
      "middleName": "",
      "state": "",
      "stateProvDisplayName": "",
      "countryDisplayName": ""
    },
    "organizationDisplayName": "Default Organization (Root Organization)",
    "organizationName": "Default Organization",
    "displayName": "Default Organization",
    "businessCategory": null,
    "description": null,
    "state": "1",
    "addressBook": [],
    "status": 0
  });
})

export default organizationRouter;
