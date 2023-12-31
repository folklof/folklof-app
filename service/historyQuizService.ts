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

  async getHistoryQuizByBookQuizId(bookquiz_id: string) {
    try {
      const historyQuiz = await this.historyQuizDao.getHistoryQuizByBookQuizId(
        bookquiz_id
      );

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

  async createHistoryQuiz(
    user_id: string,
    book_id: string,
    score: number
  ): Promise<any> {
    try {
      const getBookQuiz = await this.historyQuizDao.getBookQuizById(book_id);
      const getUser = await this.historyQuizDao.getUserById(user_id);

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

      const historyQuiz = await this.historyQuizDao.createHistoryQuiz(
        user_id,
        book_id,
        score
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
          message: "No history quiz found",
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
          message: "No history quiz found",
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

  async getHistoryQuizByUserIdAndBookQuizId(
    bookquiz_id: string,
    user_id: string
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
