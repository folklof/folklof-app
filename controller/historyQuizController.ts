import HistoryQuizDao from "../dao/historyQuizDao";
import HistoryQuizService from "../service/historyQuizService";
import { Request, Response, NextFunction } from "express";

async function getAllHistoryQuizzes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const historyQuizDao = new HistoryQuizDao(db);
  const historyQuizService = new HistoryQuizService(historyQuizDao);

  try {
    const result = await historyQuizService.getAllHistoryQuizzes();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all history quizzes",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "List history quizzes not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getHistoryQuizById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const historyQuizDao = new HistoryQuizDao(db);
  const historyQuizService = new HistoryQuizService(historyQuizDao);

  try {
    const { id } = req.params as any;
    const result = await historyQuizService.getHistoryQuizById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a historyQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getHistoryQuizByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const historyQuizDao = new HistoryQuizDao(db);
  const historyQuizService = new HistoryQuizService(historyQuizDao);

  try {
    const { user_id } = req.params as any;
    console.log(user_id, "isi user_id");
    const result = await historyQuizService.getHistoryQuizByUserId(user_id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a historyQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getHistoryQuizByBookQuizId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const historyQuizDao = new HistoryQuizDao(db);
  const historyQuizService = new HistoryQuizService(historyQuizDao);

  try {
    const { bookquiz_id } = req.params as any;
    console.log(req.params, "isi req.params");
    const result = await historyQuizService.getHistoryQuizByBookQuizId(
      bookquiz_id
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a historyQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function createHistoryQuiz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const historyQuizDao = new HistoryQuizDao(db);
  const historyQuizService = new HistoryQuizService(historyQuizDao);

  try {
    const { user_id, bookquiz_id, scores } = req.body;
    const result = await historyQuizService.createHistoryQuiz(
      user_id,
      bookquiz_id,
      scores
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully create a historyQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function updateScoresHistoryQuizById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const historyQuizDao = new HistoryQuizDao(db);
  const historyQuizService = new HistoryQuizService(historyQuizDao);

  try {
    const { id } = req.params as any;
    const { scores } = req.body;
    const result = await historyQuizService.updateScoresHistoryQuizById(
      id,
      scores
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update a historyQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function deleteHistoryQuizById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const historyQuizDao = new HistoryQuizDao(db);
  const historyQuizService = new HistoryQuizService(historyQuizDao);

  try {
    const { id } = req.params as any;
    const result = await historyQuizService.deleteHistoryQuizById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete a historyQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
};

async function getHistoryQuizByUserIdAndBookQuizId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const historyQuizDao = new HistoryQuizDao(db);
  const historyQuizService = new HistoryQuizService(historyQuizDao);
  try {
    const { user_id, bookquiz_id } = req.params as any;
    const result = await historyQuizService.getHistoryQuizByUserIdAndBookQuizId(
      user_id,
      bookquiz_id
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a historyQuiz",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function calculateTotalScoreForUserInBookQuiz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const historyQuizDao = new HistoryQuizDao(db);
  const historyQuizService = new HistoryQuizService(historyQuizDao);

  try {
    const { user_id, bookquiz_id } = req.params as any;
    const result =
      await historyQuizService.calculateTotalScoreForUserInBookQuiz(
        user_id,
        bookquiz_id
      );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message:
          "Successfully get total score history quiz user in specific book quiz",
        data: { total_score: result.message },
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function calculateTotalScoreForUserInAllBookQuiz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const historyQuizDao = new HistoryQuizDao(db);
  const historyQuizService = new HistoryQuizService(historyQuizDao);

  try {
    const { user_id } = req.params as any;
    const result =
      await historyQuizService.calculateTotalScoreForUserInAllBookQuiz(user_id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all total score history quiz user",
        data: { all_total_score: result.message },
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export {
  getAllHistoryQuizzes,
  getHistoryQuizById,
  getHistoryQuizByUserId,
  getHistoryQuizByBookQuizId,
  createHistoryQuiz,
  updateScoresHistoryQuizById,
  deleteHistoryQuizById,
  calculateTotalScoreForUserInBookQuiz,
  calculateTotalScoreForUserInAllBookQuiz,
  getHistoryQuizByUserIdAndBookQuizId,
};
