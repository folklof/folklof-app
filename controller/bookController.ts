import BookDao from "../dao/bookDao";
import BookService from "../service/bookService";
import { Request, Response, NextFunction } from "express";

async function getAllBooks(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const { page, limit, sort, category_id, agegroup_id } = req.query as any;
    const result = await bookService.getAllBooks(
      page,
      limit,
      sort,
      category_id,
      agegroup_id
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all books",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "List books not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function createBook(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const {
      title,
      category_id,
      agegroup_id,
      desc,
      duration,
      audio_link,
      cover_image,
    } = req.body;
    const result = await bookService.createBook(
      title,
      category_id,
      agegroup_id,
      desc,
      duration,
      audio_link,
      cover_image
    );

    if (result.success) {
      return res.status(201).json({
        success: true,
        message: "Successfully create a book",
        data: result.message,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to create a book",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getBookByAgeGroupId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const { agegroup_id } = req.params as any;
    const result = await bookService.getBookByAgeGroupId(agegroup_id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a book",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function updateBook(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const { id } = req.params as any;
    const {
      title,
      category_id,
      agegroup_id,
      desc,
      duration,
      audio_link,
      cover_image,
    } = req.body;
    const result = await bookService.updateBook(
      id,
      title,
      category_id,
      agegroup_id,
      duration,
      desc,
      audio_link,
      cover_image
    );

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update a book",
        data: result.message,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to update a book",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getBookByCode(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const { book_code } = req.params as any;
    const result = await bookService.getBookByCode(book_code);
    if (result.success) {
      return res.status(result.status).json({
        success: true,
        message: "Successfully get a book",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function deleteBook(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const { id } = req.params as any;
    const result = await bookService.deleteBook(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete a book",
        data: result.message,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to delete a book",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getBookByCategoryId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const { category_id } = req.params as any;
    const result = await bookService.getBookByCategoryId(category_id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a book",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getBookById(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const { id } = req.params as any;
    const result = await bookService.getBookById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a book",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getBookByTitle(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const { title } = req.params as any;
    const result = await bookService.getBookByTitle(title);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a book",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export {
  getAllBooks,
  createBook,
  updateBook,
  getBookByCode,
  getBookById,
  deleteBook,
  getBookByAgeGroupId,
  getBookByCategoryId,
  getBookByTitle,
};
