import SpotService from "@services/transaction/spots/spot";
import { Request, Response } from "express";

export const getESpot = async (req: Request, res: Response) => {
  const { storeId, emsName } = req.params;
  const _folder = req.storeIdentifier as string;
  const response = await SpotService.getESpot(_folder, emsName);
  res.status(200).json(response);
};
