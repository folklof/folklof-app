import AgeGroupDao from "../dao/ageGroupDao";
import AgeGroupService from "../service/ageGroupService";
import { Request, Response, NextFunction } from "express";

async function getAllAgeGroups(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const ageGroupDao = new AgeGroupDao(db);
  const ageGroupService = new AgeGroupService(ageGroupDao);

  try {
    const result = await ageGroupService.getAllAgeGroups();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all ageGroups",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "List ageGroups not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getAgeGroupById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const ageGroupDao = new AgeGroupDao(db);
  const ageGroupService = new AgeGroupService(ageGroupDao);

  try {
    const { id } = req.params as any;
    const result = await ageGroupService.getAgeGroupById(id);
    console.log(result, "isi ageGroup controller");
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a ageGroup",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export { getAllAgeGroups, getAgeGroupById };