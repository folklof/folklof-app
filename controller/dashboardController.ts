import { Request, Response, NextFunction } from "express";

async function dashboardUserAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
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
  try {
    res.status(200).json({
      success: true,
      message: "Successfully authenticated to Dashboard Admin.",
    });
  } catch (error: any) {
    next(error);
  }
}

export { dashboardUserAccess, dashboardAdminAccess };
