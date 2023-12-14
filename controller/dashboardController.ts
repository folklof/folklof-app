import UserDao from "../dao/userDao";
import UserService from "../service/userService";
import { Request, Response, NextFunction } from "express";

async function dashboardUserAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const userDao = new UserDao(db);
  const userService = new UserService(userDao);
  try {
    const { _json } = req.user as any;
    const result = await userService.getUserProfile(_json.email);
    req.user = result.message;
    return res.status(200).json({
      success: true,
      message: "Successfully authenticated to Dashboard User.",
    });
  } catch (error: any) {
    next(error);
  }
}

async function dashboardAdminAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const userDao = new UserDao(db);
  const userService = new UserService(userDao);
  try {
    const { _json } = req.user as any;
    const result = await userService.getUserProfile(_json.email);
    req.user = result.message;
    if (result.message.role_id !== 3) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. You are not allowed to access this resource.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully authenticated to Dashboard Admin.",
    });
  } catch (error: any) {
    next(error);
  }
}

export { dashboardUserAccess, dashboardAdminAccess };
