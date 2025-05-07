import { Request, Response } from "express";
import UserService from "@services/user/User";

class UserController {
  static async getUserHandler(req: Request, res: Response) {
    // const { xProcessFlow } = req.query; TODO: Revisar
    const userIdFromCookie = req.cookies.USER_ID;
    const userId = req?.session?.userAuth?.userId || userIdFromCookie;
    const params = {
      folder: req.storeIdentifier as string,
      userId,
      logged: req.logged ?? false,
    };
    const user = await UserService.getUser(params);
    console.log("user: ", user.userId);
    res.status(200).json(user);
  }

  static async getUserContextData(req: Request, res: Response) {
    console.log("DEMO DEMO");
    const _folder = req.storeIdentifier as string;
    const isLogged = req.logged;
    const params = {
      isLogged,
      store: _folder,
    };
    console.log(params);
    const result = await UserService.getUserContextData(params);
    res.status(200).json(result);
  }
}

export default UserController;
