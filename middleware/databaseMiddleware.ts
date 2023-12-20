import { Request, NextFunction, Response } from "express";
import StandardError from "../utils/constants/standardError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const databaseMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.db = prisma;
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    throw new StandardError({
      success: false,
      message: "Database connection error",
      status: 500,
    });
  }
};

export default databaseMiddleware;
