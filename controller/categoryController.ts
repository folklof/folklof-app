import CategoryDao from "../dao/categoryDao";
import CategoryService from "../service/categoryService";
import { Request, Response, NextFunction } from "express";

async function getAllCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const categoryDao = new CategoryDao(db);
  const categoryService = new CategoryService(categoryDao);

  try {
    const result = await categoryService.getAllCategories();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all categories",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "List categories not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function createCategory(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const categoryDao = new CategoryDao(db);
  const categoryService = new CategoryService(categoryDao);

  try {
    const { name, desc } = req.body;
    const result = await categoryService.createCategory(name, desc);
    if (result.success) {
      return res.status(201).json({
        success: true,
        message: "Successfully create a category",
        data: result.message,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to create a category",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function updateCategory(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const categoryDao = new CategoryDao(db);
  const categoryService = new CategoryService(categoryDao);

  try {
    const { id } = req.params as any;
    const { name, desc } = req.body;
    const result = await categoryService.updateCategory(id, name, desc);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update a category",
        data: result.message,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to update a category",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const categoryDao = new CategoryDao(db);
  const categoryService = new CategoryService(categoryDao);

  try {
    const { id } = req.params as any;
    const result = await categoryService.deleteCategory(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete a category",
        data: result.message,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to delete a category",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getCategoryById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const categoryDao = new CategoryDao(db);
  const categoryService = new CategoryService(categoryDao);

  try {
    const { id } = req.params as any;
    const result = await categoryService.getCategoryById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a category",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getCategoryByName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const categoryDao = new CategoryDao(db);
  const categoryService = new CategoryService(categoryDao);

  try {
    const { name } = req.query as any;
    const result = await categoryService.getCategoryByName(name);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a category",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
};
