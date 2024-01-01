import StatusRequestBookDao from "../dao/statusRequestBookDao";
import StatusRequestBookService from "../service/statusRequestBookService";
import { Request, Response, NextFunction } from "express";

async function getAllStatusRequestBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const statusRequestBookDao = new StatusRequestBookDao(db);
  const statusRequestBookService = new StatusRequestBookService(
    statusRequestBookDao
  );

  try {
    const result = await statusRequestBookService.getAllStatusRequestBooks();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all status request books",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "List status request books not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function createStatusRequestBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const statusRequestBookDao = new StatusRequestBookDao(db);
  const statusRequestBookService = new StatusRequestBookService(
    statusRequestBookDao
  );

  try {
    const { name, desc } = req.body as any;
    const result = await statusRequestBookService.createStatusRequestBook(
      name,
      desc
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully create a status request book",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function updateStatusRequestBookById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const statusRequestBookDao = new StatusRequestBookDao(db);
  const statusRequestBookService = new StatusRequestBookService(
    statusRequestBookDao
  );

  try {
    const { id } = req.params as any;
    const { name, desc } = req.body as any;
    const result = await statusRequestBookService.updateStatusRequestBook(
      id,
      name,
      desc
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update status request book",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function deleteStatusRequestBookById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const statusRequestBookDao = new StatusRequestBookDao(db);
  const statusRequestBookService = new StatusRequestBookService(
    statusRequestBookDao
  );

  try {
    const { id } = req.params as any;
    const result = await statusRequestBookService.deleteStatusRequestBook(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete status request book",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export {
  getAllStatusRequestBooks,
  createStatusRequestBook,
  updateStatusRequestBookById,
  deleteStatusRequestBookById,
};
