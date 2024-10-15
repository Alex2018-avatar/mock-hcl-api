import express from 'express';
// import countriesJSON from '../../../data/country_state.json' assert { type: "json" };
// import onlineStoreJSON from '../../../data/online_store.json' assert { type: "json" };

const app = express();
const organizationRouter = app.router;

// /wcs/resources/store/11/organization/@self/entitled_orgs?langId=-1
organizationRouter.get('/:storeId/organization/@self/entitled_orgs', (req, res) => {
  res.status(200).json({ "entitledOrganizations": [], "accountCheck": true });
})

// /wcs/resources/store/11/usercontext/@self/contextdata?langId=-1
organizationRouter.get('/:storeId/usercontext/@self/contextdata', (req, res) => {
  res.status(200).json({
    "globalization": {
      "preferredCurrency": "COP",
      "languageId": -5,
      "currency": "USD",
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
      "runAsId": -1002,
      "callerId": -1002,
      "registerType": "G",
      "storeId": 11,
      "channelId": -1
    }
  });
})


export default organizationRouter;
