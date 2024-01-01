import RequestBookDao from "../dao/requestBookDao";
import RequestBookService from "../service/requestBookService";
import { Request, Response, NextFunction } from "express";

async function getAllRequestBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const requestBookDao = new RequestBookDao(db);
  const requestBookService = new RequestBookService(requestBookDao);

  try {
    const result = await requestBookService.getAllRequestBooks();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all request books",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "List request books not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getRequestBookById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const requestBookDao = new RequestBookDao(db);
  const requestBookService = new RequestBookService(requestBookDao);

  try {
    const { id } = req.params as any;
    const result = await requestBookService.getRequestBookById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a requestBook by id",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getRequestBookByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const requestBookDao = new RequestBookDao(db);
  const requestBookService = new RequestBookService(requestBookDao);

  try {
    const { id } = req.params as any;
    const result = await requestBookService.getRequestBookByUserId(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a requestBook by user id",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function createRequestBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const requestBookDao = new RequestBookDao(db);
  const requestBookService = new RequestBookService(requestBookDao);

  try {
    const { user_id, title, desc, cover_image } = req.body as any;
    const result = await requestBookService.createRequestBook(
      user_id,
      title,
      desc,
      cover_image
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully create a request book",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function updateRequestBookById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const requestBookDao = new RequestBookDao(db);
  const requestBookService = new RequestBookService(requestBookDao);

  try {
    const { id } = req.params as any;
    const { user_id, status_id, title, desc, cover_image } = req.body as any;
    const result = await requestBookService.updateRequestBook(
      id,
      user_id,
      status_id,
      title,
      desc,
      cover_image
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update request book",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function deleteRequestBookById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const requestBookDao = new RequestBookDao(db);
  const requestBookService = new RequestBookService(requestBookDao);

  try {
    const { id } = req.params as any;
    const result = await requestBookService.deleteRequestBook(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete request book",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export {
  getAllRequestBooks,
  getRequestBookById,
  getRequestBookByUserId,
  createRequestBook,
  updateRequestBookById,
  deleteRequestBookById,
};
