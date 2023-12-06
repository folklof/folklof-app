import UserService from "../service/userService";
import UserDao from "../dao/userDao";
import { Request, Response, NextFunction } from "express";

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

    const result = await userService.checkAndCreateUser(email, name, picture);
    if (result.success) {
      return res.status(200).json({
        success: result.success,
        message: result.message,
      });
    }
  } catch (err: any) {
    next(err);
  }
}

function isAuthenticatedGoogle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    console.log("Authenticated");
    req.user;
    return next();
  }
  res.redirect("/api/v1/auth/failure");
}

function userProfile(req: Request, res: Response) {
  const user = req.user as any;

  if (user) {
    res.json({ success: true, message: "User profile", data: user._json });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
}

async function handleLogout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.user) {
    res.json({
      status: 401,
      logged: false,
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

function handleLoginFailed(req: Request, res: Response) {
  res.status(401).json({ success: false, message: "Unauthorized" });
}

export {
  handleGoogleLogin,
  isAuthenticatedGoogle,
  userProfile,
  handleLogout,
  handleLoginFailed,
};
