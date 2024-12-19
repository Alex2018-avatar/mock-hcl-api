export const handleB2BLoginIdentity = (req, res) => {
  const { logonId } = req.body;
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000, // 1 hora en milisegundos
  };

  if (logonId === 'demo@gmail.com') {
    const setCookie = (name, value, options = {}) => {
      res.cookie(name, value, { ...cookieOptions, ...options });
    };

    // Definir cookies
    setCookie('JSESSIONID', '0000i-MPMsY_DPOHukKSy6mkSj-:-1');
    setCookie('WC_SESSION_ESTABLISHED', 'true');
    setCookie(
      'WC_AUTHENTICATION_1002',
      '1002%2ChQjah3HCu1QX%2Bb6yX71v0ZnO1gtnmuq1nCIImayJlyA%3D'
    );
    setCookie('WC_ACTIVEPOINTER', '-5%2C9701', { httpOnly: false });
    setCookie(
      'WC_USERACTIVITY_1002',
      '1002%2C9701%2C0%2Cnull%2C1729276355353%2C1729278517740%2Cnull%2Cnull%2Cnull%2Cnull%2C1383256606%2Cver_1729276355327%2CYYkL3m%2BLcsdybnpaoC7ggH5KSSpf4e8ZqpEDur8l%2FvYA70WyCD%2BfM6aVL8ekeHiyYcb2I2A1m13TeRn9qAnTqUTg%2Fb7DMG%2BCt6%2BIkRxd46ofReiRqQ5afEXjGLdOzi%2BCq7O7pdwgTtV%2BvVX880Tuh2sFLFmvOMFEj1tEQtzd1dbF4FWRu%2FVUCnJuGkpEoTbC9DPr8gj94YSmIT70S0ZE3OluIenNahyQk9vBG4AIaKlUP8un%2FKBuqfvM4%2BtLeV3kg6POptwkeOaUySVFIFDCnA%3D%3D'
    );

    res.status(201).json({
      "personalizationID": "1729272852953-24",
      "resourceName": "loginidentity",
      "WCToken": "1002%2CUL35NLMXcq33IKvsYtd%2FP2SAAv0%2B9g5iRaKtXmJ6b4Z%2BFxfSKs05Uh%2BX405Fik5Run%2BZGj3qQzKRCKfmscY1FB1FK7bBnHMSGT4SRS7Fkuli%2F4LpU%2B8xv5N2AGK%2BLygUz5YTmAIQTMfea8ZnH2fWaorb7ZxoP1zjuDN9GBraLpL07w%2BvfelQPy%2BKyjn8z%2F1eRpINYVUVRNLRe%2BPi%2BPHnIfgh7qYv6X1wDfG0cIs%2BiCEC%2FSdAHO%2F6qads%2FAHbISHA",
      "userId": "1002",
      "WCTrustedToken": "1002%2CGl%2BWZiFvtHRe%2F7YfZSsDG1D2%2FrrcSCEX08mjCcSRQ28%3D",
      // SIMULAR ERROR
      // "errorCode": "1001",
      // "errorKey": "_ERROR_SAME_TYPE_PRODUCT",
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
}