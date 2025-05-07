import "express";

declare module "express" {
  interface Request {
    storeIdentifier?: string;
    storeFolder?: string;
    userType?: string;
    logged?: boolean;
    userId?: string;
  }
}
