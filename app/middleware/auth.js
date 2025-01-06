import { STORES } from "../config/stores.js";

export const identifyUserType = (req, res, next) => {
  const userIdFromCookie = req.cookies.USER_ID;
  const userId = req?.session?.userAuth?.userId || userIdFromCookie;
  const cookieLoggedName = `WC_AUTHENTICATION_${userId}`;
  if (req.cookies[cookieLoggedName]) {
    req.userType = 'authenticated';
    req.logged = true;
    req.userId = '1002'; // Podrías extraer el ID del token si es necesario
  } else if (req.cookies['WC_AUTHENTICATION_38']) {
    req.userType = 'guest';
    req.userId = '38';
    req.logged = false;
  } else {
    req.userType = 'unknown';
    req.logged = false;
  }
  next();
};

export const requireAuthenticated = (req, res, next) => {
  if (req.userType !== 'authenticated') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();

};

export const addFolder = (req, res, next) => {
  const storeId = req.params.storeId;
  req.storeIdentifier = STORES[storeId] ?? "generic";
  req._folder = req.storeIdentifier;
  req.storeFolder = `${storeId}-store`;
  next();
}