import { Request, Response, NextFunction } from "express";

function isAuthenticatedGoogle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/api/v1/auth/failure");
}

// const authorizationMiddleware =
//   (allowedRoles: number[]) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user as any;

//     if (!user || !user.role_id) {
//       res.status(401).json({ success: false, message: "Unauthorized" });
//     } else {
//       if (allowedRoles.includes(user.role_id)) {
//         next();
//       } else {
//         res.status(403).json({
//           success: false,
//           message:
//             "Access Denied. You are not allowed to access this resource.",
//         });
//       }
//     }
//   };

// const adminAuthorization = authorizationMiddleware([2, 3]);
// const managerAuthorization = authorizationMiddleware([3]);

export { isAuthenticatedGoogle };
