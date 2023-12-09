import { Request, Response, NextFunction } from "express";
import StandardError from "../utils/constants/standardError";

function isAuthenticatedGoogle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }
  throw new StandardError({
    success: false,
    message: "User is not authenticated. Please try to log in again.",
    status: 401,
  });
}

const authorizationMiddleware =
  (allowedRoles: number[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;

    if (!req.isAuthenticated()) {
      throw new StandardError({
        success: false,
        message: "User is not authenticated. Please try to log in again.",
        status: 401,
      });
    }

    if (allowedRoles.includes(user.role_id)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Access Denied. You are not allowed to access this resource.",
    });
  };

const supervisorAuthorization = authorizationMiddleware([2, 3]);
const adminAuthorization = authorizationMiddleware([3]);

export { isAuthenticatedGoogle, adminAuthorization, supervisorAuthorization };
