import { generateShippingInfo } from "../../helpers/shipping-info";
import { FileUtil } from "../../services/FileService";
import { generateWCSError } from "../../utils/error-utils";
import { delay } from "../../utils/product-utils";
import CartService from "../../services/cart/Cart";
import { Request, Response } from "express";
import Cart from "@services/transaction/cart/Cart";

export class CartController {
  static async deleteOrderItem(req: Request, res: Response) {
    const result = await CartService.deleteOrderItem(req);
    res.status(200).json(result);
  }
  static async cartCalculate(req: Request, res: Response) {
    res.status(200).json({
      orderId: ["14029"],
      viewTaskName: "RedirectView",
    });
  }
}

export const getCart = async (req: Request, res: Response) => {
  const cartSession = req.session.cart;

  if (!cartSession) {
    req.session.cart = {};
  }

  if (cartSession) {
    res.status(200).json(cartSession);
  } else {
    res.status(404).json({});
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const body = req.body;
  const _folder = req.storeIdentifier as string;
  const cartSession = req.session.cart;

  if (!cartSession) {
    req.session.cart = {};
  }

  const cart = await Cart.addToCart(_folder, body, cartSession);
  req.session.cart = cart;
  res.status(200).json({
    orderId: cart.orderId,
  });
};

export const deleteCart = async (req: Request, res: Response) => {
  req.session.cart = {};
  console.log("req.session.: ", req.session);
  res.status(204).json({});
};

export const getCartAdjustSimulator = async (req: Request, res: Response) => {
  const _folder = req.storeIdentifier as string;
  const data = await CartService.getAdjustSimulator(_folder);
  res.status(200).json(data);
};

export const updateOrderItem = async (req: Request, res: Response) => {
  const { storeId } = req.params;
  const { orderItem, orderId } = req.body;
  const _folder = req.storeIdentifier as string;
  const cart = req.session.cart;
  const data = await CartService.updateOrderItem(_folder, orderItem, cart);
  // console.log("data: ", data);
  req.session.cart = data;
  res.status(200).json({ orderId, resourceName: "cart" });
};

export const updateShippingInfo = async (req: Request, res: Response) => {
  const _folder = req.storeIdentifier as string;
  const cart = req.session.cart;
  const data = await CartService.updateShippingInfo(_folder, req.body, cart);
  console.log("data: ", data);
  req.session.cart = data;
  res.status(200).json({
    orderItem: [
      {
        orderItemId: "35003",
      },
    ],
    orderId: data.orderId,
    resourceName: "cart",
  });
};
