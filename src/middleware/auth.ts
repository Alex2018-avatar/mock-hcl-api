import { NextFunction, Request, Response } from "express";
import { STORES } from "../config/stores";
import { logger } from "../config/logger";

export const identifyUserType = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const userIdFromCookie = req.cookies.USER_ID;
  const userId = req?.session?.userAuth?.userId || userIdFromCookie;
  const cookieLoggedName = `WC_AUTHENTICATION_${userId}`;
  if (req.cookies[cookieLoggedName]) {
    req.userType = "authenticated";
    req.logged = true;
    req.userId = "1002"; // Podrías extraer el ID del token si es necesario
  } else if (req.cookies["WC_AUTHENTICATION_38"]) {
    req.userType = "guest";
    req.userId = "38";
    req.logged = false;
  } else {
    req.userType = "unknown";
    req.logged = false;
  }
  next();
};

export const requireAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.userType !== "authenticated") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

export const addFolder = (req: Request, _res: Response, next: NextFunction) => {
  const queryStoreId = req.query.storeId;
  const storeId = req.params.storeId ?? queryStoreId;
  const storeIdentifier = STORES[storeId] ?? "generic";
  logger.silly("storeId: " + storeId);
  req.storeIdentifier = STORES[storeId] ?? "generic";
  req.storeFolder = `${storeId}-store`;
  logger.store(`${storeId} - ${storeIdentifier}`);
  next();
};
