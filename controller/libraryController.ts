import LibraryDao from "../dao/libraryDao";
import LibraryService from "../service/libraryService";
import { Request, Response, NextFunction } from "express";

async function getAllLibraries(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const libraryDao = new LibraryDao(db);
  const libraryService = new LibraryService(libraryDao);

  try {
    const result = await libraryService.getAllLibraries();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all libraries",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function createLibrary(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const libraryDao = new LibraryDao(db);
  const libraryService = new LibraryService(libraryDao);

  try {
    const { user_id, book_id, is_read } = req.body;
    const result = await libraryService.createLibrary(
      user_id,
      book_id,
      is_read
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully create a library",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function updateIsReadLibraryById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const libraryDao = new LibraryDao(db);
  const libraryService = new LibraryService(libraryDao);

  try {
    const { id } = req.params as any;
    // const { is_read } = req.body;
    const result = await libraryService.updateIsReadLibraryById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully create a library",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function deleteLibraryById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const libraryDao = new LibraryDao(db);
  const libraryService = new LibraryService(libraryDao);

  try {
    const { id } = req.params as any;
    const result = await libraryService.deleteLibraryById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete a library",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getLibraryByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const libraryDao = new LibraryDao(db);
  const libraryService = new LibraryService(libraryDao);

  try {
    const { user_id } = req.params as any;
    const result = await libraryService.getLibraryByUserId(user_id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a library",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getLibraryIsReadByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const libraryDao = new LibraryDao(db);
  const libraryService = new LibraryService(libraryDao);

  try {
    const { user_id } = req.params as any;
    const { is_read } = req.body;
    const result = await libraryService.getLibraryIsReadByUserId(
      user_id,
      is_read
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a library",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export {
  getAllLibraries,
  createLibrary,
  updateIsReadLibraryById,
  deleteLibraryById,
  getLibraryByUserId,
  getLibraryIsReadByUserId
};
