import UserService from "../service/userService";
import UserDao from "../dao/userDao";
import { Request, Response, NextFunction } from "express";
import {
  HOST_URL_FRONTEND,
  HOST_URL_FRONTEND_ADMIN,
} from "../utils/config/urlApi";

async function handleGoogleLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const userDao = new UserDao(db);
  const userService = new UserService(userDao);

  try {
    const user = req.user as any;
    const { email, name, picture } = user._json;
    console.log(user, "isi user");
    const result = await userService.checkAndCreateUser(email, name, picture);
    console.log(result, "isi result handle google login");
    if (result.success) {
      res.redirect(`${HOST_URL_FRONTEND}/auth/success`);
    }
  } catch (err: any) {
    next(err);
  }
}

async function handleLogout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "You are not authorized to the app. Can't logout",
    });
    return;
  }

  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({
      success: true,
      message: "Successfully logged out!",
    });
  });
}

export { handleGoogleLogin, handleLogout };
