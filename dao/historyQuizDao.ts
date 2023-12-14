import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/constants/standardError";
import {
  IHistoryQuizDao,
  IHistoryQuizAttributes,
  IUserAttributes,
  IBookQuizAttributes,
} from "../utils/types";

class HistoryQuiz implements IHistoryQuizDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllHistoryQuizzes(): Promise<IHistoryQuizAttributes[] | undefined> {
    try {
      const historyQuizzes = await this.db.historyQuiz.findMany({
        include: { bookquiz: true, user: true },
      });
      return historyQuizzes;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting all history quizzes",
        status: 500,
      });
    }
  }

  async getHistoryQuizById(
    id: string
  ): Promise<IHistoryQuizAttributes[] | undefined> {
    try {
      const historyQuiz = await this.db.historyQuiz.findUnique({
        where: {
          ID: id,
        },
        include: { bookquiz: true, user: true },
      });
      return historyQuiz ? [historyQuiz] : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting history quiz by ID",
        status: 500,
      });
    }
  }

  async getHistoryQuizByUserId(
    user_id: string
  ): Promise<IHistoryQuizAttributes[] | undefined> {
    try {
      const historyQuiz = await this.db.historyQuiz.findMany({
        where: {
          user_id: user_id,
        },
        include: { bookquiz: true, user: true },
      });

      return historyQuiz;
    } catch (error: any) {
      console.log(error, "Error retrieving history quiz by user ID");
      throw new StandardError({
        success: false,
        message: "Error getting history quiz by user ID",
        status: 500,
      });
    }
  }

  async getHistoryQuizByBookQuizId(
    bookquiz_id: string
  ): Promise<IHistoryQuizAttributes[] | undefined> {
    try {
      const historyQuiz = await this.db.historyQuiz.findMany({
        where: {
          bookquiz_id: bookquiz_id,
        },
        include: { bookquiz: true, user: true },
      });

      return historyQuiz;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting history quiz by book quiz ID",
        status: 500,
      });
    }
  }

  async updateScoresHistoryQuizById(
    id: string,
    scores: number
  ): Promise<IHistoryQuizAttributes | undefined> {
    try {
      const historyQuiz = await this.db.historyQuiz.update({
        where: {
          ID: id,
        },
        data: {
          scores,
        },
      });

      return historyQuiz;
    } catch (error: any) {
      console.log(error, "Error updating history quiz by ID");
      throw new StandardError({
        success: false,
        message: "Error updating history quiz by ID",
        status: 500,
      });
    }
  }

  async createHistoryQuiz(
    user_id: string,
    bookquiz_id: string,
    scores: number
  ): Promise<IHistoryQuizAttributes | undefined> {
    try {
      const historyQuiz = await this.db.historyQuiz.create({
        data: {
          user_id,
          bookquiz_id,
          scores,
        },
      });

      return historyQuiz;
    } catch (error: any) {
      console.log(error, "Error creating history quiz");
      throw new StandardError({
        success: false,
        message: "Error creating history quiz",
        status: 500,
      });
    }
  }

  async deleteHistoryQuizById(id: string): Promise<IHistoryQuizAttributes> {
    try {
      const historyQuiz = await this.db.historyQuiz.delete({
        where: {
          ID: id,
        },
      });

      return historyQuiz;
    } catch (error: any) {
      console.log(error, "Error deleting history quiz by ID");
      throw new StandardError({
        success: false,
        message: "Error deleting history quiz by ID",
        status: 500,
      });
    }
  }

  async getUserById(user_id: string): Promise<IUserAttributes | any> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          ID: user_id,
        },
      });

      return user;
    } catch (error: any) {
      console.log(error, "Error retrieving user by ID");
      throw new StandardError({
        success: false,
        message: "Error retrieving user by ID",
        status: 500,
      });
    }
  }

  async getBookQuizById(
    book_id: string
  ): Promise<IBookQuizAttributes[] | undefined> {
    try {
      const bookQuiz = await this.db.bookQuiz.findFirst({
        where: {
          ID: book_id,
        },
        include: { book: true },
      });
      return bookQuiz ? [bookQuiz] : [];
    } catch (error: any) {
      console.log(error, "Error retrieving book quiz by ID");
      throw new StandardError({
        success: false,
        message: "Error getting book quiz by ID",
        status: 500,
      });
    }
  }

  async getHistoryQuizByUserIdAndBookQuizId(
    user_id: string,
    bookquiz_id: string
  ): Promise<IHistoryQuizAttributes[] | undefined> {
    try {
      const historyQuiz = await this.db.historyQuiz.findMany({
        where: {
          user_id: user_id,
          bookquiz_id: bookquiz_id,
        },
        include: { user: true, bookquiz: true },
      });

      return historyQuiz;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting history quiz by book quiz ID",
        status: 500,
      });
    }
  }
}

export default HistoryQuiz;
