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

async function generateBookByAI(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const { user_prompt, agegroup_id } = req.body;
    const result = await bookService.generateBookByAI(user_prompt, agegroup_id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully generate a book by AI",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function generateBookByAIStream(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const { user_prompt, title_book, agegroup_id } = req.body;
    const result = await bookService.generateBookByAIStream(
      user_prompt,
      title_book,
      agegroup_id
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully generate a book by AI",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function generateBookAndAudioByAI(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const bookDao = new BookDao(db);
  const bookService = new BookService(bookDao);

  try {
    const { user_prompt, title_book, agegroup_id } = req.body;
    const book_result = await bookService.generateBookByAIStream(
      user_prompt,
      title_book,
      agegroup_id
    );
    if (book_result.success) {
      const data = book_result.message ?? "failed to generate book";
      const convert = await bookService.generateTextToSpeechByAI(
        data.toString(),
        title_book
      );
      if (convert.success) {
        return res.status(200).json({
          success: true,
          message: "Successfully generate a book & convert to audio by AI",
          data: {
            title_book: title_book,
            book_story: book_result.message,
            audio_file: convert.message,
          },
        });
      }
    }
  } catch (error: any) {
    next(error);
  }
}

async function generateImageByAI(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { db } = req as any;
    const bookDao = new BookDao(db);
    const bookService = new BookService(bookDao);

    const { book_story, title_book } = req.body;
    const result = await bookService.generateImageByAI(book_story, title_book);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully generate a cover image book by AI",
        data: { image_link: result.message },
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function generateAudioByAI(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { db } = req as any;
    const bookDao = new BookDao(db);
    const bookService = new BookService(bookDao);

    const { book_story, title_book } = req.body;
    const result = await bookService.generateTextToSpeechByAI(
      book_story,
      title_book
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully generate a audio book by AI",
        data: { audio_file: result.message },
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function generateBookAudioAndImageByAI(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { db } = req as any;
    const bookDao = new BookDao(db);
    const bookService = new BookService(bookDao);

    const { user_prompt, title_book, agegroup_id } = req.body;
    const book_result = await bookService.generateBookByAIStream(
      title_book,
      user_prompt,
      agegroup_id
    );

    if (book_result.success) {
      const data = book_result.message ?? "failed to generate book";
      const book_audio = await bookService.generateTextToSpeechByAI(
        data.toString(),
        title_book
      );
      if (book_audio.success) {
        const book_image = await bookService.generateImageByAI(
          data,
          title_book
        );
        if (book_image.success) {
          return res.status(200).json({
            success: true,
            message: "Successfully generate a book & convert to audio by AI",
            data: {
              title_book: title_book,
              book_story: book_result.message,
              audio_file: book_audio.message,
              image_link: book_image.message,
            },
          });
        }
      }
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
    const { title } = req.query as any;
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
  generateBookByAI,
  generateBookByAIStream,
  generateBookAndAudioByAI,
  generateImageByAI,
  generateAudioByAI,
  generateBookAudioAndImageByAI,
};
