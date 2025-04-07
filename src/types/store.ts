import { Request } from "express";

export type IRequest = Request & {
  _folder: string;
  storeIdentifier: string;
  [key: string]: string | number | boolean | undefined;
};
