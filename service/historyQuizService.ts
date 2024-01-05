import StandardError from "../utils/constants/standardError";
import { IHistoryQuizDao, IHistoryQuizService } from "../utils/types";

class HistoryQuizService implements IHistoryQuizService {
  private historyQuizDao: IHistoryQuizDao;

  constructor(historyQuizDao: IHistoryQuizDao) {
    this.historyQuizDao = historyQuizDao;
  }

  async getAllHistoryQuizzes() {
    try {
      const historyQuizzes = await this.historyQuizDao.getAllHistoryQuizzes();

      if (!historyQuizzes || historyQuizzes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No history quiz list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: historyQuizzes,
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getHistoryQuizById(id: string) {
    try {
      const historyQuiz = await this.historyQuizDao.getHistoryQuizById(id);

      if (!historyQuiz || historyQuiz.length === 0) {
        throw new StandardError({
          success: false,
          message: "No history quiz found",
          status: 404,
        });
      }

      return {
        success: true,
        message: historyQuiz,
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getHistoryQuizByUserId(user_id: string) {
    try {
      console.log(user_id, "isi user_id");
      const historyQuiz = await this.historyQuizDao.getHistoryQuizByUserId(
        user_id
      );

      if (!historyQuiz || historyQuiz.length === 0) {
        throw new StandardError({
          success: false,
          message: "No history quiz found by user id",
          status: 404,
        });
      }

      return {
        success: true,
        message: historyQuiz,
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getHistoryQuizByBookQuizId(bookquiz_id: string) {
    try {
      const historyQuiz = await this.historyQuizDao.getHistoryQuizByBookQuizId(
        bookquiz_id
      );

      if (!historyQuiz || historyQuiz.length === 0) {
        throw new StandardError({
          success: false,
          message: "No history quiz found by book quiz id",
          status: 404,
        });
      }

      return {
        success: true,
        message: historyQuiz,
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async createHistoryQuiz(
    user_id: string,
    bookquiz_id: string,
    score: number,
    attempt_failed: number
  ): Promise<any> {
    try {
      const getBookQuiz = await this.historyQuizDao.getBookQuizById(
        bookquiz_id
      );
      const getUser = await this.historyQuizDao.getUserById(user_id);

      const checkHistoryQuiz =
        await this.historyQuizDao.getHistoryQuizByUserIdAndBookQuizId(
          user_id,
          bookquiz_id
        );

      if (!getBookQuiz || getBookQuiz.length === 0) {
        throw new StandardError({
          success: false,
          message: "No book quiz found",
          status: 404,
        });
      }

      if (!getUser || getUser.length === 0) {
        throw new StandardError({
          success: false,
          message: "No user found",
          status: 404,
        });
      }

      if (checkHistoryQuiz && checkHistoryQuiz.length > 0) {
        const updateHistoryQuiz =
          await this.historyQuizDao.updateAttemptHistoryQuizById(
            checkHistoryQuiz[0].ID ?? '',
            score,
            attempt_failed
          );
        return {
          success: true,
          message: updateHistoryQuiz,
          status: 200,
        };
      }

      const historyQuiz = await this.historyQuizDao.createHistoryQuiz(
        user_id,
        bookquiz_id,
        score,
        attempt_failed
      );

      return {
        success: true,
        message: historyQuiz,
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateScoresHistoryQuizById(id: string, scores: number) {
    try {
      const historyQuiz = await this.getHistoryQuizById(id);
      if (!historyQuiz) {
        throw new StandardError({
          success: false,
          message: "No history quiz found by quiz id",
          status: 404,
        });
      }

      const updateScore = await this.historyQuizDao.updateScoresHistoryQuizById(
        id,
        scores
      );

      return {
        success: true,
        message: updateScore,
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteHistoryQuizById(id: string): Promise<any> {
    try {
      const historyQuiz = await this.getHistoryQuizById(id);
      if (!historyQuiz) {
        throw new StandardError({
          success: false,
          message: "No history quiz found by quiz id",
          status: 404,
        });
      }

      const deleteHistoryQuiz = await this.historyQuizDao.deleteHistoryQuizById(
        id
      );

      return {
        success: true,
        message: deleteHistoryQuiz,
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getAttemptQuizByUserIdAndBookQuizId(
    user_id: string,
    bookquiz_id: string
  ) {
    try {
      const checkUserQuiz = await this.historyQuizDao.getUserById(user_id);
      const checkBookQuiz = await this.historyQuizDao.getBookQuizById(
        bookquiz_id
      );

      if (!checkBookQuiz || checkBookQuiz.length === 0) {
        throw new StandardError({
          success: false,
          message: "No book quiz found",
          status: 404,
        });
      }

      if (!checkUserQuiz || checkUserQuiz.length === 0) {
        throw new StandardError({
          success: false,
          message: "No user found",
          status: 404,
        });
      }

      const historyQuiz =
        await this.historyQuizDao.getHistoryQuizByUserIdAndBookQuizId(
          user_id,
          bookquiz_id
        );

      if (!historyQuiz || historyQuiz.length === 0) {
        return {
          success: true,
          message: { attempt_quiz_failed: 0, isAllowed: true },
          status: 200,
        };
      }

      if (historyQuiz[0].attempt_failed === 2) {
        throw new StandardError({
          success: false,
          message:
            "You have reached the maximum attempt quiz. Please try again later !",
          status: 400,
        });
      }

      if (historyQuiz[0].scores === 1) {
        throw new StandardError({
          success: false,
          message:
            "You have already completed this quiz. Please try another one !",
          status: 409,
        });
      }

      return {
        success: true,
        message: {
          attempt_quiz_failed: historyQuiz[0].attempt_failed,
          isAllowed: true,
        },
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getHistoryQuizByUserIdAndBookQuizId(
    user_id: string,
    bookquiz_id: string
  ) {
    try {
      const historyQuiz =
        await this.historyQuizDao.getHistoryQuizByUserIdAndBookQuizId(
          user_id,
          bookquiz_id
        );

      if (!historyQuiz || historyQuiz.length === 0) {
        throw new StandardError({
          success: false,
          message: "No history quiz found by user id and book quiz id",
          status: 404,
        });
      }

      return {
        success: true,
        message: historyQuiz,
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async calculateTotalScoreForUserInBookQuiz(
    bookquiz_id: string,
    user_id: string
  ): Promise<any> {
    try {
      const historyQuizzes = await this.getHistoryQuizByUserIdAndBookQuizId(
        user_id,
        bookquiz_id
      );

      if (!historyQuizzes) {
        return {
          success: true,
          message: 0,
          status: 200,
        };
      }

      const totalScore = historyQuizzes.message.reduce(
        (acc: number, quiz: any) => acc + (quiz.scores || 0),
        0
      );

      return {
        success: true,
        message: totalScore,
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async calculateTotalScoreForUserInAllBookQuiz(user_id: string) {
    try {
      const historyQuizzes = await this.getHistoryQuizByUserId(user_id);

      if (!historyQuizzes) {
        return {
          success: true,
          message: 0,
          status: 200,
        };
      }

      const totalScore = historyQuizzes.message.reduce(
        (acc: number, quiz: any) => acc + (quiz.scores || 0),
        0
      );

      return {
        success: true,
        message: totalScore,
        status: 200,
      };
    } catch (error: any) {
      return new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default HistoryQuizService;
