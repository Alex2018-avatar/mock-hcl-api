import Inventory from "@services/transaction/inventory/inventory";
import { Request, Response } from "express";

export const getInventoryByPartNumber = async (req: Request, res: Response) => {
  const { partNumber } = req.params;
  const _folder = req.storeIdentifier as string;
  const data = await Inventory.getInventoryByPartNumber(_folder, partNumber);
  res.status(200).json(data);
};

export const getInventoryByIds = async (req: Request, res: Response) => {
  const { ids } = req.params;
  const _folder = req.storeIdentifier as string;
  const data = await Inventory.getInventoryByIds(_folder, ids);
  res.status(200).json(data);
};
