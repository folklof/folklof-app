import BookQuizDao from "../dao/bookQuizDao";
import BookQuizService from "../service/bookQuizService";
import { Request, Response, NextFunction } from "express";

async function getAllBookQuizzes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const bookQuizDao = new BookQuizDao(db);
  const bookQuizService = new BookQuizService(bookQuizDao);

  try {
    const result = await bookQuizService.getAllBookQuizzes();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all book quizzes",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "List book quizzes not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getBookQuizById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const bookQuizDao = new BookQuizDao(db);
  const bookQuizService = new BookQuizService(bookQuizDao);

  try {
    const { id } = req.params as any;
    const result = await bookQuizService.getBookQuizById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a bookQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getBookQuizByBookId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const bookQuizDao = new BookQuizDao(db);
  const bookQuizService = new BookQuizService(bookQuizDao);

  try {
    const { book_id } = req.params as any;
    const result = await bookQuizService.getBookQuizByBookId(book_id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a bookQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function createBookQuiz(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const bookQuizDao = new BookQuizDao(db);
  const bookQuizService = new BookQuizService(bookQuizDao);

  try {
    const { book_id, question, option1, option2, option3, correct_answer } =
      req.body;
    const result = await bookQuizService.createBookQuiz(
      book_id,
      question,
      option1,
      option2,
      option3,
      correct_answer
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully create a bookQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function answerBookQuiz(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const bookQuizDao = new BookQuizDao(db);
  const bookQuizService = new BookQuizService(bookQuizDao);

  try {
    const { id } = req.params as any;
    const { user_answer } = req.body as any;
    const result = await bookQuizService.answerBookQuiz(id, user_answer);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function updateBookQuiz(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const bookQuizDao = new BookQuizDao(db);
  const bookQuizService = new BookQuizService(bookQuizDao);

  try {
    const { id } = req.params as any;
    const { book_id, question, option1, option2, option3, correct_answer } =
      req.body;
    console.log(req.body);
    const result = await bookQuizService.updateBookQuizById(
      id,
      book_id,
      question,
      option1,
      option2,
      option3,
      correct_answer
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update a bookQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function deleteBookQuiz(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const bookQuizDao = new BookQuizDao(db);
  const bookQuizService = new BookQuizService(bookQuizDao);

  try {
    const { id } = req.params as any;
    const result = await bookQuizService.deleteBookQuizById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete a bookQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export {
  getAllBookQuizzes,
  getBookQuizById,
  answerBookQuiz,
  getBookQuizByBookId,
  createBookQuiz,
  updateBookQuiz,
  deleteBookQuiz,
};
