import { UserService } from "../../services/user.js";
import { delay } from "../../utils/product-utils.js";

export class AuthController {
  static async loginIdentity(req, res) {
    const { logonId } = req.body;
    const { _folder } = req;
    const user = await UserService.getUser(_folder, logonId);
    await delay(3000);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hora en milisegundos
    };

    if (!user || !user.userId) {
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
      return
    }
    const setCookie = (name, value, options = {}) => res.cookie(name, value, { ...cookieOptions, ...options });
    const { userId } = user;
    // Definir cookies
    setCookie('JSESSIONID', '0000i-MPMsY_DPOHukKSy6mkSj-:-1');
    setCookie('WC_SESSION_ESTABLISHED', 'true');
    setCookie(
      `WC_AUTHENTICATION_${userId}`,
      `${userId}%2ChQjah3HCu1QX%2Bb6yX71v0ZnO1gtnmuq1nCIImayJlyA%3D`
    );
    setCookie('WC_ACTIVEPOINTER', '-5%2C9701', { httpOnly: false });
    setCookie(
      `WC_USERACTIVITY_${userId}`,
      `${userId}%2C9701%2C0%2Cnull%2C1729276355353%2C1729278517740%2Cnull%2Cnull%2Cnull%2Cnull%2C1383256606%2Cver_1729276355327%2CYYkL3m%2BLcsdybnpaoC7ggH5KSSpf4e8ZqpEDur8l%2FvYA70WyCD%2BfM6aVL8ekeHiyYcb2I2A1m13TeRn9qAnTqUTg%2Fb7DMG%2BCt6%2BIkRxd46ofReiRqQ5afEXjGLdOzi%2BCq7O7pdwgTtV%2BvVX880Tuh2sFLFmvOMFEj1tEQtzd1dbF4FWRu%2FVUCnJuGkpEoTbC9DPr8gj94YSmIT70S0ZE3OluIenNahyQk9vBG4AIaKlUP8un%2FKBuqfvM4%2BtLeV3kg6POptwkeOaUySVFIFDCnA%3D%3D`
    );

    // ONLY FOR MOCK
    setCookie('USER_ID', userId);

    // set in session: add userId and logonId
    if (!req.session.userAuth) {
      req.session.userAuth = {};
    }
    req.session.userAuth = { userId, logonId };

    res.status(201).json({
      "personalizationID": "1729272852953-24",
      "resourceName": "loginidentity",
      "WCToken": `${userId}%2CUL35NLMXcq33IKvsYtd%2FP2SAAv0%2B9g5iRaKtXmJ6b4Z%2BFxfSKs05Uh%2BX405Fik5Run%2BZGj3qQzKRCKfmscY1FB1FK7bBnHMSGT4SRS7Fkuli%2F4LpU%2B8xv5N2AGK%2BLygUz5YTmAIQTMfea8ZnH2fWaorb7ZxoP1zjuDN9GBraLpL07w%2BvfelQPy%2BKyjn8z%2F1eRpINYVUVRNLRe%2BPi%2BPHnIfgh7qYv6X1wDfG0cIs%2BiCEC%2FSdAHO%2F6qads%2FAHbISHA`,
      "userId": userId,
      "WCTrustedToken": `${userId}%2CGl%2BWZiFvtHRe%2F7YfZSsDG1D2%2FrrcSCEX08mjCcSRQ28%3D`,
      // SIMULAR ERROR
      // "errorCode": "1001",
      // "errorKey": "_ERROR_SAME_TYPE_PRODUCT",
    });
  }

  static async b2bLoginIdentity(req, res) {
    const { logonId } = req.body;
    const { _folder } = req;
    const user = await UserService.getUser(_folder, logonId);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hora en milisegundos
    };

    if (!user || !user.userId) {
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
      return
    }
    const setCookie = (name, value, options = {}) => res.cookie(name, value, { ...cookieOptions, ...options });
    const { userId } = user;
    // Definir cookies
    setCookie('JSESSIONID', '0000i-MPMsY_DPOHukKSy6mkSj-:-1');
    setCookie('WC_SESSION_ESTABLISHED', 'true');
    setCookie(
      `WC_AUTHENTICATION_${userId}`,
      `${userId}%2ChQjah3HCu1QX%2Bb6yX71v0ZnO1gtnmuq1nCIImayJlyA%3D`
    );
    setCookie('WC_ACTIVEPOINTER', '-5%2C9701', { httpOnly: false });
    setCookie(
      `WC_USERACTIVITY_${userId}`,
      `${userId}%2C9701%2C0%2Cnull%2C1729276355353%2C1729278517740%2Cnull%2Cnull%2Cnull%2Cnull%2C1383256606%2Cver_1729276355327%2CYYkL3m%2BLcsdybnpaoC7ggH5KSSpf4e8ZqpEDur8l%2FvYA70WyCD%2BfM6aVL8ekeHiyYcb2I2A1m13TeRn9qAnTqUTg%2Fb7DMG%2BCt6%2BIkRxd46ofReiRqQ5afEXjGLdOzi%2BCq7O7pdwgTtV%2BvVX880Tuh2sFLFmvOMFEj1tEQtzd1dbF4FWRu%2FVUCnJuGkpEoTbC9DPr8gj94YSmIT70S0ZE3OluIenNahyQk9vBG4AIaKlUP8un%2FKBuqfvM4%2BtLeV3kg6POptwkeOaUySVFIFDCnA%3D%3D`
    );

    // ONLY FOR MOCK
    setCookie('USER_ID', userId);

    // set in session: add userId and logonId
    if (!req.session.userAuth) {
      req.session.userAuth = {};
    }
    req.session.userAuth = { userId, logonId };

    res.status(201).json({
      "personalizationID": "1729272852953-24",
      "resourceName": "loginidentity",
      "WCToken": `${userId}%2CUL35NLMXcq33IKvsYtd%2FP2SAAv0%2B9g5iRaKtXmJ6b4Z%2BFxfSKs05Uh%2BX405Fik5Run%2BZGj3qQzKRCKfmscY1FB1FK7bBnHMSGT4SRS7Fkuli%2F4LpU%2B8xv5N2AGK%2BLygUz5YTmAIQTMfea8ZnH2fWaorb7ZxoP1zjuDN9GBraLpL07w%2BvfelQPy%2BKyjn8z%2F1eRpINYVUVRNLRe%2BPi%2BPHnIfgh7qYv6X1wDfG0cIs%2BiCEC%2FSdAHO%2F6qads%2FAHbISHA`,
      "userId": userId,
      "WCTrustedToken": `${userId}%2CGl%2BWZiFvtHRe%2F7YfZSsDG1D2%2FrrcSCEX08mjCcSRQ28%3D`,
      roleNavigationOnly: user.userId === '1002' ? 'true' : 'false'
    });
  }

  static async guestidentity(req, res) {
    const setCookie = (name, value, options = {}) => res.cookie(name, value, { ...cookieOptions, ...options });
    setCookie('JSESSIONID', '0000KG3fhotHeqN7suRD0eve7pL%3A-1');
    setCookie('WC_PERSISTENT', 'ovTCjQhaLUDcbiznHAwzYciastaO8%2By1FeEeonkpq%2Fw%3D%3B2024-11-27%2B15%3A18%3A51.677_1732720731667-26_41', {
      httpOnly: true,
      maxAge: 3600000,
    });
    setCookie('WC_SESSION_ESTABLISHED', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });
    setCookie('WC_AUTHENTICATION_38', '38%2CMu0yZ5KTjX0cRGD82HTiQZ9fy81H1ooosQVJLix0oMA%3D', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });
    setCookie('WC_ACTIVEPOINTER', '-1%2C41', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });
    setCookie('WC_USERACTIVITY_38', '38%2C41%2Cnull%2Cnull%2C1732720731678%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C1383256606%2Cver_1732720731633%2C9M8zbDT29v7zlMrmXfmc7sxu8zSMaXFV72Afbb7cud6QDJUIST6sKtR8MCAxFrS56nv2aOsbMhCsL2WJaR9PTB80WJaP01BcDkvKLCpBr114D43sp2khD71wHPBJI0ZeMb%2FINXwBje8YqgeK1e190Om9fUYBjPtYe%2BNacpWTdXy4D2P0YKmksUGnAtI%2B1y%2FRK%2FbK3IeAfkH3q%2BjI3kUJg0qFQvvbE0p4U98ylpqZ3bAxIr4pWMGEmwsoM1jS8mvZKxVQ2KZCqAwxu6dyh4h2cw%3D%3D', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });
    res.status(201).json({
      "personalizationID": "1732720381164-536633",
      "resourceName": "guestidentity",
      "WCToken": "37%2CL9efemNPxGeXUttnZcUM1xJo56S3SmfZloASjeUqPQlmmQJkzitlxnKrQ6uX7QEVb83y5W6rkNLvf3lvVIfWIRRthPJtFutSy%2BP9%2BxJulUe6%2BNQXslPCU7OmIWG37Y%2FWRz5qhmACHe195372nv7WRFRDCHsMwuJRKrKGk2t6yRj0GEuA%2FHSOuQL7mONd%2F2so0FYrtDSZO2kYeDmW%2B7nyw%2FnzUtnNCrMmOINAFWLMkGjCOUhKYdFLlV5kcNpZYx0e",
      "userId": "37",
      "WCTrustedToken": "37%2CxgUj0KMvMJ3z%2Fe21wpaUnheFlQoRT0tGx1zHc0c2wSw%3D",
    });
  }

  static async logOut(req, res) {
    res.clearCookie('JSESSIONID');
    res.clearCookie('WC_SESSION_ESTABLISHED');
    res.clearCookie('WC_AUTHENTICATION_1002');
    res.clearCookie('WC_AUTHENTICATION_1003');
    res.clearCookie('WC_AUTHENTICATION_5009');
    res.clearCookie('WC_ACTIVEPOINTER');
    res.clearCookie('WC_USERACTIVITY_1002');
    res.clearCookie('WC_USERACTIVITY_1003');
    res.clearCookie('WC_USERACTIVITY_5009');
    res.clearCookie('WCToken');
    res.clearCookie('userId');
    res.clearCookie('WCTrustedToken');
    res.status(200).json({});
  }

  static async syncRegister(req, res) {
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
  }
}