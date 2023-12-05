import { Request, NextFunction, Response } from "express";
import db from "../db";

const databaseMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const connection = await db.getConnection();
    req.db = connection;
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      success: false,
      message: "Database connection error",
    });
  }
};

export default databaseMiddleware;
