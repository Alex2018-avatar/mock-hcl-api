import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const authRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handleLoginIdentity = (req, res) => {
  const { logonId } = req.body;
  if (logonId === 'demo@gmail.com') {
    res.cookie('JSESSIONID', '0000i-MPMsY_DPOHukKSy6mkSj-:-1', {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.cookie('WC_SESSION_ESTABLISHED', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    res.cookie('WC_AUTHENTICATION_1002', '1002%2ChQjah3HCu1QX%2Bb6yX71v0ZnO1gtnmuq1nCIImayJlyA%3D', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    res.cookie('WC_ACTIVEPOINTER', '-5%2C9701', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    res.cookie('WC_USERACTIVITY_1002', '1002%2C9701%2C0%2Cnull%2C1729276355353%2C1729278517740%2Cnull%2Cnull%2Cnull%2Cnull%2C1383256606%2Cver_1729276355327%2CYYkL3m%2BLcsdybnpaoC7ggH5KSSpf4e8ZqpEDur8l%2FvYA70WyCD%2BfM6aVL8ekeHiyYcb2I2A1m13TeRn9qAnTqUTg%2Fb7DMG%2BCt6%2BIkRxd46ofReiRqQ5afEXjGLdOzi%2BCq7O7pdwgTtV%2BvVX880Tuh2sFLFmvOMFEj1tEQtzd1dbF4FWRu%2FVUCnJuGkpEoTbC9DPr8gj94YSmIT70S0ZE3OluIenNahyQk9vBG4AIaKlUP8un%2FKBuqfvM4%2BtLeV3kg6POptwkeOaUySVFIFDCnA%3D%3D', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    res.status(201).json({
      "personalizationID": "1729272852953-24",
      "resourceName": "loginidentity",
      "WCToken": "1002%2CUL35NLMXcq33IKvsYtd%2FP2SAAv0%2B9g5iRaKtXmJ6b4Z%2BFxfSKs05Uh%2BX405Fik5Run%2BZGj3qQzKRCKfmscY1FB1FK7bBnHMSGT4SRS7Fkuli%2F4LpU%2B8xv5N2AGK%2BLygUz5YTmAIQTMfea8ZnH2fWaorb7ZxoP1zjuDN9GBraLpL07w%2BvfelQPy%2BKyjn8z%2F1eRpINYVUVRNLRe%2BPi%2BPHnIfgh7qYv6X1wDfG0cIs%2BiCEC%2FSdAHO%2F6qads%2FAHbISHA",
      "userId": "1002",
      "WCTrustedToken": "1002%2CGl%2BWZiFvtHRe%2F7YfZSsDG1D2%2FrrcSCEX08mjCcSRQ28%3D"
    });
  } else {
    res.status(401).json({
      "errors": [
        {
          "errorKey": "_ERROR_LOGIN_CUSTOMER_SEARCH_NOT_REGISTERED",
          "errorParameters": "",
          "errorMessage": "The specified logon ID or password are not correct. Verify the information provided and log in again.",
          "errorCode": "1001"
        }
      ]
    });
  }
};

const handleGuestidentity = (req, res) => {
  res.cookie('JSESSIONID', '0000KG3fhotHeqN7suRD0eve7pL%3A-1', {
    httpOnly: true,
    maxAge: 3600000,
  });

  res.cookie('WC_PERSISTENT', 'ovTCjQhaLUDcbiznHAwzYciastaO8%2By1FeEeonkpq%2Fw%3D%3B2024-11-27%2B15%3A18%3A51.677_1732720731667-26_41', {
    httpOnly: true,
    maxAge: 3600000,
  });

  res.cookie('WC_SESSION_ESTABLISHED', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000,
  });

  res.cookie('WC_AUTHENTICATION_38', '38%2CMu0yZ5KTjX0cRGD82HTiQZ9fy81H1ooosQVJLix0oMA%3D', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000,
  });

  res.cookie('WC_ACTIVEPOINTER', '-1%2C41', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000,
  });

  res.cookie('WC_USERACTIVITY_38', '38%2C41%2Cnull%2Cnull%2C1732720731678%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C1383256606%2Cver_1732720731633%2C9M8zbDT29v7zlMrmXfmc7sxu8zSMaXFV72Afbb7cud6QDJUIST6sKtR8MCAxFrS56nv2aOsbMhCsL2WJaR9PTB80WJaP01BcDkvKLCpBr114D43sp2khD71wHPBJI0ZeMb%2FINXwBje8YqgeK1e190Om9fUYBjPtYe%2BNacpWTdXy4D2P0YKmksUGnAtI%2B1y%2FRK%2FbK3IeAfkH3q%2BjI3kUJg0qFQvvbE0p4U98ylpqZ3bAxIr4pWMGEmwsoM1jS8mvZKxVQ2KZCqAwxu6dyh4h2cw%3D%3D', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000,
  });

  res.status(201).json({
    "personalizationID": "1732720381164-536633",
    "resourceName": "guestidentity",
    "WCToken": "37%2CL9efemNPxGeXUttnZcUM1xJo56S3SmfZloASjeUqPQlmmQJkzitlxnKrQ6uX7QEVb83y5W6rkNLvf3lvVIfWIRRthPJtFutSy%2BP9%2BxJulUe6%2BNQXslPCU7OmIWG37Y%2FWRz5qhmACHe195372nv7WRFRDCHsMwuJRKrKGk2t6yRj0GEuA%2FHSOuQL7mONd%2F2so0FYrtDSZO2kYeDmW%2B7nyw%2FnzUtnNCrMmOINAFWLMkGjCOUhKYdFLlV5kcNpZYx0e",
    "userId": "37",
    "WCTrustedToken": "37%2CxgUj0KMvMJ3z%2Fe21wpaUnheFlQoRT0tGx1zHc0c2wSw%3D"
  });

};

// /resources/store/9701/loginidentity?updateCookies=true
authRouter.post('/:storeId/loginidentity', handleLoginIdentity);
authRouter.post('/:storeId/b2b/loginidentity', handleLoginIdentity);
authRouter.post('/:storeId/guestidentity', handleGuestidentity);

/*
{"firstName":"Juan","lastName":"Ramos","logonId":"demo@gmail.com","logonPassword":"Avatar321","logonPasswordVerify":"Avatar321","registerType":"G","profileType":"C","email1":"demo@gmail.com","phone1":"","storeId":"11","catalogId":"11501","preferredLanguage":"-1","receiveEmail":"true","receiveEmailPreference":[{"value":"true","storeID":"11"}],"challengeQuestion":"-","challengeAnswer":"-"}

*/

authRouter.delete('/:storeId/loginidentity/@self', (req, res) => {
  res.clearCookie('JSESSIONID');
  res.clearCookie('WC_SESSION_ESTABLISHED');
  res.clearCookie('WC_AUTHENTICATION_1002');
  res.clearCookie('WC_ACTIVEPOINTER');
  res.clearCookie('WC_USERACTIVITY_1002');
  res.clearCookie('WCToken');
  res.clearCookie('userId');
  res.clearCookie('WCTrustedToken');
  res.status(200).json({});
});

authRouter.post('/:storeId/syncRegister/registerCommerce', async (req, res) => {
  const { body } = req;
  const { logonId } = body;

  // SUCCESS WAY
  res.status(201).json({
    "success": true,
    "message": "Registro exitoso en Commerce",
    "status": 200
  });

  // Error Way
  // res.status(400).json({
  //   "errorKey": "_ERROR_LOGIN_CUSTOMER_SEARCH_NOT_REGISTERED",
  //   "errorParameters": "\u00ef\u00bf\u00bdUps!, parec\u00ef\u00bf\u00bd que algo sali\u00ef\u00bf\u00bd mal, int\u00ef\u00bf\u00bdntalo nuevamente o si prefieres comunicate con nosotros a la l\u00ef\u00bf\u00bdnea (601)7457466.",
  //   "errorMessage": "Usuario no registrado.",
  //   "errorCode": "1001"
  // });

  // res.status(201).json({
  //   "errorKey": "_ERROR_TOKEN_REQUIRED_FILEDS",
  //   "errorParameters": "Te invitamos a realizar tu compra en unos minutos.",
  //   "errorMessage": "Error de campos Obligatorios.",
  //   "errorCode": "1001"
  // });
});

export default authRouter;

/*
{
    "errorKey": "_ERROR_LOGIN_CUSTOMER_SEARCH_NOT_REGISTERED",
    "errorParameters": "\u00ef\u00bf\u00bdUps!, parec\u00ef\u00bf\u00bd que algo sali\u00ef\u00bf\u00bd mal, int\u00ef\u00bf\u00bdntalo nuevamente o si prefieres comunicate con nosotros a la l\u00ef\u00bf\u00bdnea (601)7457466.",
    "errorMessage": "Usuario no registrado.",
    "errorCode": "1001"
}

*/