import StoreParams from "@services/transaction/x-params/StoreParams";
import { Request, Response } from "express";

export const getStoreParams = async (req: Request, res: Response) => {
  const _folder = req.storeIdentifier as string;
  const data = await StoreParams.getStoreParameters(_folder);
  res.status(200).json(data);
};
