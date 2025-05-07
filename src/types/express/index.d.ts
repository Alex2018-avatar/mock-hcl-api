import "express";

declare module "express-serve-static-core" {
  interface Request {
    storeIdentifier?: string;
    storeFolder?: string;
    userType?: string;
    logged?: boolean;
    userId?: string;
    userAuth?: {
      userId: string;
      storeId: string;
      token: string;
      userType: string;
      logged: boolean;
    };
  }
}
