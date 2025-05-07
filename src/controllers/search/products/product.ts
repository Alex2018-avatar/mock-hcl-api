import { Request, Response } from "express";
import { ProductRequest } from "types/product";
import Product from "@services/search/products/Product";

export const getProducts = async (req: Request, res: Response) => {
  console.log("req.query: ", req.query);
  const { partNumber, id, searchTerm, categoryId } =
    req.query as ProductRequest;
  const _folder = req.storeIdentifier as string;
  console.log({ partNumber, id, searchTerm, categoryId });
  if (categoryId) {
    const response = await Product.getProductsByCategoryId(_folder, categoryId);
    res.status(200).json(response);
  } else if (partNumber || id) {
    const response = await Product.getProductByIdOrPartNumber(
      _folder,
      partNumber,
      id
    );
    res.status(200).json(response);
  } else if (searchTerm && searchTerm === "celular") {
    // const response = await Product.getProductsBySearchTerm(_folder, searchTerm);
    // res.status(200).json(response);
    res.status(200).json({ contents: [] });
  } else {
    res.status(200).json({ contents: [] });
  }
};
