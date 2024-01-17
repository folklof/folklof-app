import StandardError from "../utils/constants/standardError";
import { IBookQuizDao, IBookQuizService } from "../utils/types";

class BookQuizService implements IBookQuizService {
  private bookQuizDao: IBookQuizDao;

  constructor(bookQuizDao: IBookQuizDao) {
    this.bookQuizDao = bookQuizDao;
  }

  async getAllBookQuizzes() {
    try {
      const bookQuizzes = await this.bookQuizDao.getAllBookQuizzes();

      if (!bookQuizzes || bookQuizzes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No book quiz list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: bookQuizzes,
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

  async getBookQuizById(id: string) {
    try {
      const bookQuiz = await this.bookQuizDao.getBookQuizById(id);

      if (!bookQuiz || bookQuiz.length === 0) {
        throw new StandardError({
          success: false,
          message: "No book quiz found",
          status: 404,
        });
      }

      return {
        success: true,
        message: bookQuiz,
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

  async getBookQuizByBookId(book_id: string) {
    try {
      const bookQuiz = await this.bookQuizDao.getBookQuizByBookId(book_id);

      if (!bookQuiz || bookQuiz.length === 0) {
        throw new StandardError({
          success: false,
          message: "No book quiz found",
          status: 404,
        });
      }

      return {
        success: true,
        message: bookQuiz,
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

  async createBookQuiz(
    book_id: string,
    question: string,
    option1: string,
    option2: string,
    option3: string,
    correct_answer: string
  ) {
    try {
      const bookQuiz = await this.bookQuizDao.createBookQuiz(
        book_id,
        question,
        option1,
        option2,
        option3,
        correct_answer
      );

      return {
        success: true,
        message: bookQuiz,
        status: 201,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async answerBookQuiz(id: string, user_answer: string) {
    try {
      const bookQuiz = await this.bookQuizDao.answerBookQuiz(id, user_answer);

      if (!bookQuiz) {
        throw new StandardError({
          success: false,
          message: "No book quiz found",
          status: 404,
        });
      }

      if (!bookQuiz.correct) {
        throw new StandardError({
          success: false,
          message:
            "Oops! That wasn't the right answer. Keep trying, you'll get it!",
          status: 400,
        });
      }

      return {
        success: true,
        message: "You have answered correctly! Good job!",
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

  async updateBookQuizById(
    id: string,
    book_id: string,
    question: string,
    option1: string,
    option2: string,
    option3: string,
    correct_answer: string
  ) {
    try {
      const bookQuiz = await this.bookQuizDao.updateBookQuizById(
        id,
        book_id,
        question,
        option1,
        option2,
        option3,
        correct_answer
      );

      return {
        success: true,
        message: bookQuiz,
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

  async deleteBookQuizById(id: string) {
    try {
      const bookQuiz = await this.bookQuizDao.deleteBookQuizById(id);

      if (!bookQuiz) {
        throw new StandardError({
          success: false,
          message: "No book quiz found",
          status: 404,
        });
      }

      return {
        success: true,
        message: bookQuiz,
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
}

export default BookQuizService;
