import { Request, Response } from "express";
import { asyncHandler } from "@utils/error/asyncHandler";
import OrgService from "@services/organization/Organization";

export const getEntitledOrgs = async (req: Request, res: Response) => {
  const _folder = req.storeIdentifier as string;
  const data = await OrgService.getEntitledOrgs(_folder);
  res.status(200).json(data);
};

export const getOrganizationById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("id: ", id);
    const _folder = req.storeIdentifier as string;
    const data = await OrgService.getOrganizationById(_folder, id);
    console.log("data: ", data);
    res.status(200).json(data);
  }
);
