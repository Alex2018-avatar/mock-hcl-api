import SeoService from "@services/search/seo/seo";
import { Request, Response } from "express";
// import Address from "../../services/address/Address";

export const getSeoIdentifier = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { identifier } = req.query as { identifier: string };
  const _folder = req.storeIdentifier as string;

  if (!identifier) {
    res.status(400).json({ contents: [] });
    return;
  }

  const data = await SeoService.getSeoIdentifier(_folder, identifier);
  res.status(200).json(data);
};
