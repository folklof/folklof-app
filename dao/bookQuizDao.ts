import StandardError from "../utils/constants/standardError";
import { PrismaClient } from "@prisma/client";
import { IBookQuizAttributes, IBookQuizDao } from "../utils/types";
import { generateJakartaDate } from "../utils/helpers/jakartaTime";

class BookQuiz implements IBookQuizDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllBookQuizzes(): Promise<IBookQuizAttributes[] | undefined> {
    try {
      const bookQuizs = await this.db.bookQuiz.findMany({
        include: { book: true },
      });
      return bookQuizs;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting all book quizs",
        status: 500,
      });
    }
  }

  async getBookQuizById(
    id: string
  ): Promise<IBookQuizAttributes[] | undefined> {
    try {
      const bookQuiz = await this.db.bookQuiz.findUnique({
        where: {
          ID: id,
        },
        include: { book: true },
      });
      return bookQuiz ? [bookQuiz] : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting book quiz by ID",
        status: 500,
      });
    }
  }

  async getBookQuizByBookId(
    book_id: string
  ): Promise<IBookQuizAttributes[] | undefined> {
    try {
      const bookQuiz = await this.db.bookQuiz.findMany({
        where: {
          book_id: book_id,
        },
        include: { book: true },
      });

      return bookQuiz;
    } catch (error: any) {
      console.log(error, "Error retrieving book quiz by book");
      throw new StandardError({
        success: false,
        message: "Error retrieving book quiz by book",
        status: 500,
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
  ): Promise<IBookQuizAttributes | any> {
    try {
      const bookQuiz = await this.db.bookQuiz.create({
        data: {
          book_id,
          question,
          option1,
          option2,
          option3,
          correct_answer,
          created_date: generateJakartaDate(),
        },
      });

      return bookQuiz;
    } catch (error: any) {
      console.log(error, "Error creating book quiz");
      throw new StandardError({
        success: false,
        message: "Error creating book quiz",
        status: 500,
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
  ): Promise<IBookQuizAttributes | undefined> {
    
    console.log(
      id,
      book_id,
      question,
      option1,
      option2,
      option3,
      correct_answer,
      "isi update book quiz"
    );

    try {
      const bookQuiz = await this.db.bookQuiz.update({
        where: {
          ID: id,
        },
        data: {
          book_id,
          question,
          option1,
          option2,
          option3,
          correct_answer,
        },
      });

      return bookQuiz;
    } catch (error: any) {
      console.log(error, "Error updating book quiz");
      throw new StandardError({
        success: false,
        message: "Error updating book quiz",
        status: 500,
      });
    }
  }

  async answerBookQuiz(
    id: string,
    user_answer: string
  ): Promise<{ correct: boolean } | undefined> {
    try {
      const quiz = await this.db.bookQuiz.findUnique({
        where: {
          ID: id,
        },
      });

      if (!quiz) {
        throw new StandardError({
          success: false,
          message: "Book Quiz not found",
          status: 404,
        });
      }

      const correctAnswer = quiz.correct_answer;

      const isCorrect = user_answer === correctAnswer;

      return { correct: isCorrect };
    } catch (error: any) {
      console.log(error, "Error answering book quiz");
      throw new StandardError({
        success: false,
        message: "Error answering book quiz",
        status: 500,
      });
    }
  }

  async deleteBookQuizById(
    id: string
  ): Promise<IBookQuizAttributes | undefined> {
    try {
      const bookQuiz = await this.db.bookQuiz.delete({
        where: {
          ID: id,
        },
      });

      return bookQuiz;
    } catch (error: any) {
      console.log(error, "Error deleting book quiz");
      throw new StandardError({
        success: false,
        message: "Error deleting book quiz",
        status: 500,
      });
    }
  }
}

export default BookQuiz;
