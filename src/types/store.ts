import { Request } from "express";

interface CustomRequestFields {
  _folder: string;
  storeIdentifier: string;
  [key: string]: string | number | boolean | undefined;
}

export type IRequest = Request & CustomRequestFields;
